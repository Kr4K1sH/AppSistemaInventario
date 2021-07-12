import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-disabled',
  templateUrl: './user-disabled.component.html',
  styleUrls: ['./user-disabled.component.css']
})
export class UserDisabledComponent implements OnInit {
datos : any;
destroy$:Subject<boolean>= new Subject<boolean>();

  constructor( private gService:GenericService,
  private notificacion:NotificacionService,
    ) {  }

  ngOnInit(): void {
    this.listarUsuariosDesabilitados();
  }

listarUsuariosDesabilitados(){
this.gService
.list('inventory/user/allDisable')
.pipe(takeUntil(this.destroy$))
.subscribe((data:any)=>{
  console.log(data);
  this.datos = data;
});
}
obtenerUsuario(id: any) {
    this.gService
      .get('inventory/user', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

ngOnDestroy(){
this.destroy$.next(true);
//Desinscribirse
this.destroy$.unsubscribe();
}

}
