import { Platform } from 'react-native';
import {
  AUTO_APPEARANCE,
  AUTO_START_TIMERS,
  BREAK_TIME_MINUTES,
  DARK_MODE,
  ENABLE_BACKGROUND,
  ENABLE_TIMER_ALERTS,
  ENABLE_TIMER_SOUND,
  FOCUS_TIME_MINUTES,
  SUPPRESS_INTRODUCTION, TASKS,
} from '../StorageKeys';
import { getData } from './storage';

/**
 * On web, prompts the user to save a file with the given
 * data to their computer.
 * @param data
 */
function downloadWeb(data: string): void {
  if (Platform.OS !== 'web') return;
  const filename = 'config.clockwise-cfg';

  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/**
 * Read storage data and prompt the user to save a file.
 * @param withTasks Indicate whether to export tasks.
 */
async function exportData(withTasks: boolean = false) {
  // Read storage data
  const keys = [
    FOCUS_TIME_MINUTES, BREAK_TIME_MINUTES, AUTO_START_TIMERS, ENABLE_TIMER_ALERTS,
    ENABLE_TIMER_SOUND, ENABLE_BACKGROUND, AUTO_APPEARANCE, DARK_MODE,
    SUPPRESS_INTRODUCTION,
  ];

  if (withTasks) {
    keys.push(TASKS);
  }

  // Store data
  const data = {};

  await Promise.all(keys.map(async (item) => {
    const storageData = await getData(item);
    if (storageData) {
      // @ts-ignore
      data[item] = storageData;
    }
  }));

  // Convert to JSON
  const json = JSON.stringify(data);
  downloadWeb(json);
}

/* eslint-disable-next-line */
export { exportData };