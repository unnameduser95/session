import React from 'react';
import { Text } from 'react-native';

import ClickableText from '../../components/ClickableText';
import { IntroductionBlockProps } from '../../types';
import useTheme from './useTheme';
import TextStyles from '../../styles/Text';
import { NO_ADS_IMAGE, SETTINGS_IMAGE, TASKS_IMAGE } from '../../Assets';
import handleOpenLink from '../handleOpenLink';
import getBaseURL from '../getBaseURL';

/**
 * Hook that returns introduction data.
 */
function useIntroductionData(): IntroductionBlockProps[] {
  const colorValues = useTheme();

  const blocks: IntroductionBlockProps[] = [
    {
      title: 'Set up your tasks',
      image: TASKS_IMAGE,
      children: (
        <Text
          style={[TextStyles.textRegular, {
            color: colorValues.primary,
          }]}
          maxFontSizeMultiplier={1.35}
        >
          Select tasks to work on during each session, so you never lose track of them.
          {'\n\n'}

          <ClickableText
            text="Learn more about the Pomodoro technique."
            onPress={() => handleOpenLink('https://en.wikipedia.org/wiki/Pomodoro_Technique')}
            style={[TextStyles.textRegular, {
              color: colorValues.gray3,
            }]}
          />
        </Text>
      ),
    },
    {
      title: 'Customize your timer',
      image: SETTINGS_IMAGE,
      children: (
        <Text
          maxFontSizeMultiplier={1.35}
          style={[TextStyles.textRegular, {
            color: colorValues.primary,
          }]}
        >
          Change timer settings, color theme, and more in the settings.

        </Text>
      ),
    },
    {
      title: 'No ads or tracking',
      image: NO_ADS_IMAGE,
      children: (
        <Text
          maxFontSizeMultiplier={1.35}
          style={[TextStyles.textRegular, {
            color: colorValues.primary,
          }]}
        >
          {'Your data stays on your device. See the '}
          <ClickableText
            text="Privacy Policy"
            onPress={() => handleOpenLink(`${getBaseURL()}/privacy`)}
            style={[TextStyles.textRegular, {
              color: colorValues.gray3,
            }]}
          />
          {' for more information.'}

        </Text>
      ),
    },
  ];

  return blocks;
}

export default useIntroductionData;
