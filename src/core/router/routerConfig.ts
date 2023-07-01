import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './routerType';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['/'],
    config: {
        screens: {
            Splash: 'Splash',
            Hello: 'Hello',
            Home: 'Home',
            Login: 'Login',
            User: 'User',
            Setup: 'Setup',
            Error: 'Error',
            NotFound: '*',
            Info: 'Info'
        },
    },
};

export default linking;
