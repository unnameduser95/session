import 'dotenv/config';

export default {
  name: 'Clockwise',
  description: 'Pomodoro timer and task management - An app designed to help you focus.',
  slug: 'clockwise',
  scheme: 'clockwise',
  userInterfaceStyle: 'automatic',
  version: '1.4.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [
    '**/*',
  ],
  runtimeVersion: '1.4.0(9)',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'co.birb.session',
    buildNumber: '9',
    usesIcloudStorage: true,
  },
  plugins: [
    'sentry-expo',
    [
      'expo-document-picker',
      {
        appleTeamId: '4A9XHUS87Q',
        iCloudContainerEnvironment: 'Production',
      },
    ],
  ],
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'brendan-c',
          project: 'clockwise',
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'co.birb.session',
    softwareKeyboardLayoutMode: 'pan',
    versionCode: 9,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    privacyPolicyLink: process.env.PRIVACY_POLICY_LINK,
    githubLink: process.env.GITHUB_LINK,
    githubProfileLink: process.env.GITHUB_PROFILE_LINK,
    prodBuild: process.env.PROD_BUILD,
    appStoreLink: process.env.APP_STORE_LINK,
    googlePlayLink: process.env.GOOGLE_PLAY_LINK,
  },
};
