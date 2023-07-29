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
}

export default new RouterConfig();
