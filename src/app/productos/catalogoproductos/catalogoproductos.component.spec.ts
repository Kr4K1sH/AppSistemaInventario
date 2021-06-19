import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoproductosComponent } from './catalogoproductos.component';

describe('CatalogoproductosComponent', () => {
  let component: CatalogoproductosComponent;
  let fixture: ComponentFixture<CatalogoproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoproductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
