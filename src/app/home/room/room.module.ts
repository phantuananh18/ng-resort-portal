import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbActionsModule,
  NbUserModule,
  NbSelectModule,
  NbRadioModule,
  NbDatepickerModule,
  NbAlertModule,
  NbListModule,
  NbLayoutModule,
  NbSidebarModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { DialogModule } from "../../dialog/dialog.module";

import { AddRoomComponent } from "./add-room/add-room.component";
import { EditRoomComponent } from "./edit-room/edit-room.component";
import { ImageRoomComponent } from "./image-room/image-room.component";
import { RoomDetailComponent } from "./room-detail/room-detail.component";
import { RoomManagementComponent } from "./room-management/room-management.component";
import { RoomTypeComponent } from "./room-type/room-type.component";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { NgxDropzoneModule } from "ngx-dropzone";
import { RoomRoutingModule } from "./room-routing.module";
import { RoomComponent } from "./room.component";
import { CKEditorModule } from "ckeditor4-angular";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AddRoomComponent,
    EditRoomComponent,
    ImageRoomComponent,
    RoomDetailComponent,
    RoomManagementComponent,
    RoomTypeComponent,
    RoomComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    NbCardModule,
    NbIconModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbSelectModule,
    NbRadioModule,
    NbDatepickerModule,
    DialogModule,
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NgxGalleryModule, // Bug here
    NgxDropzoneModule,
    NbLayoutModule,
    CKEditorModule,
  ],
})
export class RoomModule { }
