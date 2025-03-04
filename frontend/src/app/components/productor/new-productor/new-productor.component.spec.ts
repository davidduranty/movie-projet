import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductorComponent } from './new-productor.component';

describe('NewProductorComponent', () => {
  let component: NewProductorComponent;
  let fixture: ComponentFixture<NewProductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
