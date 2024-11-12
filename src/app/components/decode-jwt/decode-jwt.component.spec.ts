import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeJwtComponent } from './decode-jwt.component';

describe('DecodeJwtComponent', () => {
  let component: DecodeJwtComponent;
  let fixture: ComponentFixture<DecodeJwtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecodeJwtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecodeJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
