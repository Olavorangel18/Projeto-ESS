import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMainComponentComponent } from './app-main-component.component';

describe('AppMainComponentComponent', () => {
  let component: AppMainComponentComponent;
  let fixture: ComponentFixture<AppMainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMainComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
