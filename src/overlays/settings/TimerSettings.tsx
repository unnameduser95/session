import React, { useContext, useEffect, useState } from 'react';
import { SectionList } from 'react-native';
import AppContext from '../../../AppContext';
import SettingsHeader from '../../components/SettingsHeader';
import SettingsOption from '../../components/SettingsOption';
import useSettingsData from '../../helpers/useSettingsData';
import { BREAK_TIME_MINUTES, ENABLE_TIMER_ALERTS, FOCUS_TIME_MINUTES } from '../../StorageKeys';
import { SettingsOptionProps, Section } from '../../types';

// Store all static option data in here
// Make it easier to find and filter settings
const options: SettingsOptionProps[] = [
  {
    type: 'number',
    title: 'Focus time (minutes)',
    storageKey: FOCUS_TIME_MINUTES,
  },
  {
    type: 'number',
    title: 'Break time (minutes)',
    storageKey: BREAK_TIME_MINUTES,
  },
  {
    type: 'toggle',
    title: 'Timer alerts',
    storageKey: ENABLE_TIMER_ALERTS,
  },
  // {
  //   type: 'toggle',
  //   title: 'Auto start timers?',
  //   storageKey: AUTO_START_TIMERS,
  // },
];

const sections: Section[] = [
  {
    title: 'Timer',
    icon: 'timer-outline',
    data: options.slice(0, 3),
  },
];

/**
 * Timer settings content in the settings overlay.
 */
function TimerSettingsPane() {
  const { settingsData, handleChange, handleSelect } = useSettingsData(options);

  // Set keyboard selected by storage key
  const [keyboardSelected, setKeyboardSelected] = useState<string | undefined>(undefined);

  const {
    keyboardShortcutManager,
    keyboardGroup,
  } = useContext(AppContext);

  /**
   * Call the handleSelect method, and clear the keyboardSelected string
   */
  function handleSelectAndResetKeyboard(key?: string) {
    if (keyboardSelected !== key) {
      setKeyboardSelected(undefined);
    }

    handleSelect(key);
  }

  useEffect(() => {
    if (keyboardGroup === 'settingsPage' && !keyboardSelected) {
      setKeyboardSelected(options[0].storageKey);
    } else if (keyboardGroup === 'settings') {
      setKeyboardSelected(undefined);
    }
  }, [keyboardShortcutManager, keyboardGroup]);

  useEffect(() => {
    const unsubMethods: ((() => any) | undefined)[] = [];
    if (keyboardGroup === 'settingsPage' && keyboardSelected) {
      const indexOfCurrent = options.findIndex((value) => value.storageKey === keyboardSelected);
      unsubMethods.push(keyboardShortcutManager?.registerEvent({
        keys: ['ArrowDown'],
        action: () => setKeyboardSelected(
          options.length - 1 <= indexOfCurrent
            ? keyboardSelected
            : options[indexOfCurrent + 1].storageKey,
        ),
      }));

      unsubMethods.push(keyboardShortcutManager?.registerEvent({
        keys: ['ArrowUp'],
        action: () => setKeyboardSelected(
          indexOfCurrent <= 0
            ? keyboardSelected
            : options[indexOfCurrent - 1].storageKey,
        ),
      }));
    } else if (keyboardGroup === 'settingsPage' && !keyboardSelected) {
      unsubMethods.push(keyboardShortcutManager?.registerEvent({
        keys: ['ArrowDown'],
        action: () => setKeyboardSelected(options[0].storageKey),
      }));
    }

    return () => {
      unsubMethods.forEach((method) => {
        if (method) {
          method();
        }
      });
    };
  }, [keyboardShortcutManager, keyboardGroup, keyboardSelected]);

  const renderHeader = ({ section }: { section: Section }) => (
    <SettingsHeader
      title={section.title}
      icon={section.icon}
    />
  );

  const renderItem = ({ item }: { item: SettingsOptionProps }) => (
    <SettingsOption
      value={settingsData.find((value) => value.storageKey === item.storageKey)?.value}
      selected={settingsData.find((value) => value.storageKey === item.storageKey)?.selected}
      type={item.type}
      title={item.title}
      onChange={(data) => handleChange(item.storageKey, data)}
      onPress={() => {
        if (item.type === 'number') {
          handleSelectAndResetKeyboard(item.storageKey);
        } else {
          handleSelectAndResetKeyboard();
        }
      }}
      onSelect={() => handleSelectAndResetKeyboard(item.storageKey)}
      keyboardSelected={keyboardSelected === item.storageKey}
    />
  );

  return (
    <SectionList
      keyExtractor={(item) => item.storageKey}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderHeader}
    />
  );
}

export default TimerSettingsPane;
