import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'perm',
  })
  export class PermissionPipe implements PipeTransform {
  
    transform(perID: string): string {
      switch(perID.toLowerCase()) {
        case 'staff': return "Nhân viên";
        case 'admin': return "Quản trị viên";
        case 'warehouse': return "Nhân viên kho";
        case 'manager': return "Quản lý";
        default: return "Unknown";
      }
    }
  
  }