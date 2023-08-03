import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Splash;
    Home;
    Setup;
    User;
    Login: { mode: 'signIn' | 'signUp' };
    Error;
    NotFound;
    Info;
    Finalize;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;
export interface ILoginProps extends NativeStackScreenProps<RootStackParamList, 'Login'> {
    mode: 'signIn' | 'signUp';
}
