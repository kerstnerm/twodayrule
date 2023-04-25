import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonHabitComponent } from './skeleton-habit.component';

describe('SkeletonHabitComponent', () => {
  let component: SkeletonHabitComponent;
  let fixture: ComponentFixture<SkeletonHabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonHabitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
