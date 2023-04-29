import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateHabitComponent } from './create-update-habit.component';

describe('CreateHabitComponent', () => {
  let component: CreateUpdateHabitComponent;
  let fixture: ComponentFixture<CreateUpdateHabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateHabitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
