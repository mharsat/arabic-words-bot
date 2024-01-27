import { ReminderFrequency } from 'src/users/dal/users.dto';

export const ReminderFrequencyOptions = {
  [ReminderFrequency.DAILY]: {
    text: 'פעם ביום',
    emoji: '🐪',
  },
  [ReminderFrequency.THREE_TIMES_A_DAY]: {
    text: '3 פעמים ביום',
    emoji: '👳🏻‍♂️',
  },
  [ReminderFrequency.HOURLY]: {
    text: 'כל שעה',
    emoji: '🧞‍♂️',
  },
  [ReminderFrequency.NEVER]: {
    text: 'צריך הפסקה',
    emoji: '🧘🏻‍♂️',
  },
};
