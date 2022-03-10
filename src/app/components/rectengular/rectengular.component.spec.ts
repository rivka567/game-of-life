import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectengularComponent } from './rectengular.component';

describe('RectengularComponent', () => {
  let component: RectengularComponent;
  let fixture: ComponentFixture<RectengularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectengularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectengularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
