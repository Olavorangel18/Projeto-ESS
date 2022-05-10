import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemVagasEmpresasComponent } from './listagem-vagas-empresas.component';

describe('ListagemVagasEmpresasComponent', () => {
  let component: ListagemVagasEmpresasComponent;
  let fixture: ComponentFixture<ListagemVagasEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemVagasEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemVagasEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
