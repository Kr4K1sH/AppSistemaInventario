import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export class ItemCart {
  idItem: number;
  cantidad: number;
  locations: any[];

  constructor() {

  }
  public addToCart(ubicacion: any) {
    //Armar instancia de ItemCart con los valores respectivos del producto
    ubicacion.forEach(i => {
      this.idItem = ubicacion.id;
    this.cantidad = ubicacion.cantidad;

    this.locations.push({
      idItem: this.idItem,
      cantidad: this.cantidad

    });

    })

  }

  public getItems(): any {
    return this.locations;
  }



}



