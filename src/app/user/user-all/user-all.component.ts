import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements OnInit {
datos : any;
filterTerm: string;

destroy$:Subject<boolean>= new Subject<boolean>();

  constructor( private gService:GenericService,
  private notificacion:NotificacionService,
  private route: ActivatedRoute,
    ) {


  }

  ngOnInit(): void {

    this.listarUsuarios();
  }

listarUsuarios(){
this.gService
.list('inventory/user/')
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
