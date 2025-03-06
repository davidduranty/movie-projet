import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovieComponent } from './new-movie.component';

describe('NewMovieComponent', () => {
  let component: NewMovieComponent;
  let fixture: ComponentFixture<NewMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
