import { HealthProfile, HealthTask } from './storage';
import { addDays, todayISO } from './date';

function createTask(
  title: string,
  type: HealthTask['type'],
  frequencyDays: number
): HealthTask {
  const today = new Date();

  return {
    id: Date.now().toString() + Math.random(),
    title,
    type,
    frequencyDays,
    lastDone: undefined,
    nextDue: addDays(today, frequencyDays),
  };
}

export function createDefaultHealthProfile(): HealthProfile {
  return {
    vaccines: [
      createTask('Rabies Vaccine', 'vaccine', 365),
      createTask('Core Vaccine (FVRCP)', 'vaccine', 365),
    ],

    deworming: [
      createTask('Deworming', 'deworming', 90),
    ],

    grooming: [
      createTask('Nail Trim', 'grooming', 21),
      createTask('Bath', 'grooming', 60),
      createTask('Brushing', 'grooming', 7),
    ],
  };
}
