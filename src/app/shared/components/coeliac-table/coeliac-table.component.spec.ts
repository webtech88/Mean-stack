import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeliacTableComponent } from './coeliac-table.component';

describe('CoeliacTableComponent', () => {
  let component: CoeliacTableComponent;
  let fixture: ComponentFixture<CoeliacTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeliacTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeliacTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
