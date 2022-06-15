import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NbAuthService, NbAuthJWTToken, NbAuthOAuth2JWTToken, NbTokenService } from '@nebular/auth';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSearchService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../layout.service';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
              private search: NbSearchService,
              private router: Router,
              private token: NbTokenService) {
  }

  ngOnInit() {

    this.currentTheme = this.themeService.currentTheme;
    this.authService.getToken()
      .subscribe((token: NbAuthJWTToken) => {
        if(token.isValid()){
          this.user = token.getPayload()
        }
      })
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.search.onSearchSubmit()
      .subscribe((data: any) => {
        const url = this.router.url.split('/')[2].split('?')[0]
        this.router.navigate([`home/${url}`], { queryParams: { search: data.term }})
      })
    this.menuService.onItemClick()
      .pipe(
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if(title == 'Log out'){
          this.token.clear()
          this.router.navigateByUrl('/auth')
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.router.navigateByUrl('/home')
  }
  
  
}
