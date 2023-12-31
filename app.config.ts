import 'dotenv/config';

export default {
    expo: {
        name: 'Guru-recipes-app',
        slug: 'Guru-recipes-app',
        scheme: 'guru',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './src/assets/icons/icon.png',
        userInterfaceStyle: 'light',
        splash: {
            image: './src/assets/icons/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './src/assets/icons/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
        },
        web: {
            favicon: './src/assets/icons/favicon.png',
        },
        extra: {
            API_URL: process.env.NODE_ENV,
            BASE_URL: process.env.SERVER_BASE_URL,
        },
        hooks: {
            postPublish: [
                {
                    file: 'shell',
                    config: {
                        command: 'npm run pretty',
                    },
                },
            ],
        },
    },
};
