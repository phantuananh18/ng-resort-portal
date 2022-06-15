import { NbAuthService } from '@nebular/auth';
import { DialogResultComponent } from './../../../dialog/dialog-result/dialog-result.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from './../../../data/room.service';
import { Room } from './../../../model/room.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-room-detail',
  templateUrl: './room-detail.component.html',
})
export class RoomDetailComponent implements OnInit {
  room: Room

  isAdmin: boolean
  
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: NbDialogService,
    private toast: NbToastrService,
    private authService: NbAuthService
  ) { }

  ngOnInit(): void {
    this.loadRoom()
    
  }

  loadRoom() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.roomService.SelectRoom(id)
      .subscribe(res => {
        this.room = res
      })
    })
    this.authService.getToken().subscribe(
      token => {
        this.isAdmin = token.getPayload().role == 'MANAGER'
      }
    )
  }

  onUpdate() {
    this.router.navigateByUrl('/home/room/edit/' + this.room.id)
  }

  editImg() {
    this.router.navigateByUrl('/home/room/img/' + this.room.id)
  }

  onRemove() {
    this.roomService.deleteRoom(this.room.id)
    .subscribe(
      res => {
        this.toast.show('Remove', 'Remove room success', { status: 'primary'})
        this.router.navigateByUrl('/home/room')
      },
      err => {
        this.dialog.open(DialogResultComponent, {
          context: {
            title: 'Error when remove',
            content: err.error
          }
        })
      }
    )
  }

}
