import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WesiteLayoutComponent } from './wesite-layout.component';

describe('WesiteLayoutComponent', () => {
  let component: WesiteLayoutComponent;
  let fixture: ComponentFixture<WesiteLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WesiteLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WesiteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
