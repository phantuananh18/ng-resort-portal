import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "ngx-search-input",
  styleUrls: ["./search-input.component.scss"],
  templateUrl: "./search-input.component.html",
})
export class SearchInputComponent {
  @ViewChild("input", { static: true }) input: ElementRef;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  isInputShown = false;

  showInput() {
    this.isInputShown = true;
    this.input.nativeElement.focus();
  }

  hideInput() {
    this.isInputShown = false;
  }

  onInput(val: string) {
    this.search.emit(val);
  }
}
