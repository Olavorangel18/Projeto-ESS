import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemVagaSelecionadosComponent } from './listagem-vaga-selecionados.component';

describe('ListagemVagaSelecionadosComponent', () => {
  let component: ListagemVagaSelecionadosComponent;
  let fixture: ComponentFixture<ListagemVagaSelecionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemVagaSelecionadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemVagaSelecionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
