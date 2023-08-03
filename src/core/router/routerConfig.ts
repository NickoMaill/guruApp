import { LinkingOptions } from '@react-navigation/native';

type RouteDescriptionType = {
    name: keyof ReactNavigation.RootParamList;
    isProtected: boolean;
};

class RouterConfig {
    public get routeDescription(): RouteDescriptionType[] {
        return [
            { name: 'Splash', isProtected: false },
            { name: 'Error', isProtected: false },
            { name: 'Finalize', isProtected: true },
            { name: 'Home', isProtected: true },
            { name: 'Info', isProtected: true },
            { name: 'Login', isProtected: false },
            { name: 'NotFound', isProtected: false },
            { name: 'Setup', isProtected: true },
            { name: 'User', isProtected: true },
        ];
    }

    public get routeLinks(): LinkingOptions<ReactNavigation.RootParamList> {
        return {
            prefixes: ['exp://192.168.1.55:19000/--/'],
            config: {
                screens: {
                    Home: 'home',
                    User: 'user',
                    Finalize: 'finalize',
                    Login: 'login',
                },
            },
        };
    }
}

export default new RouterConfig();
