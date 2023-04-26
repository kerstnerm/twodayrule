import { FilterHabitsByDatePipe } from './filter-habits-by-date.pipe';

describe('FilterHabitsByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterHabitsByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
