import { IConfigEnv } from '../core/types/config';
import { Dimensions } from 'react-native';
import { osName, osVersion } from 'expo-device';
const { width, height } = Dimensions.get('window');
class ConfigManager {
    public readonly __env: IConfigEnv;

    constructor() {
        this.__env = {
            NODE_ENV: process.env.NODE_ENV,
            BASE_URL: process.env.SERVER_BASE_URL,
        };
    }

    public get getConfig(): IConfigEnv {
        return this.__env;
    }

    public configEnvFile(): string | undefined {
        if (this.__env.NODE_ENV === 'development') {
            return '.env.development.local';
        }

        if (this.__env.NODE_ENV === 'production') {
            return '.env';
        }
    }

    public get deviceInfo() {
        return {
            width,
            height,
            os: osName.toLowerCase(),
            version: osVersion,
        };
    }

    public get dimension() {
        return {
            width,
            height,
        };
    }

    public isAndroid() {
        return this.deviceInfo.os === 'android';
    }

    public isIos() {
        return this.deviceInfo.os === 'ios';
    }
}

export default new ConfigManager();
