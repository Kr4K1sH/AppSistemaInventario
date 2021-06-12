import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosreposicionComponent } from './productosreposicion.component';

describe('ProductosreposicionComponent', () => {
  let component: ProductosreposicionComponent;
  let fixture: ComponentFixture<ProductosreposicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosreposicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosreposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
