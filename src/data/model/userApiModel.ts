export type UserLoginPayload = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export type UserLoginResponse = {
    email: string;
    token: string;
    isAccountFinalized: boolean;
};

export type AuthCheckType = {
    id: number;
    email: string;
    isAccountFinalized: boolean;
}

export interface IUserDto {
    email: string;
    useName: string;
    phoneNumber: string;
    foodPreferences: FoodPreferencesEnum;
    isGlutenIntolerant: boolean;
    isFructoseIntolerant: boolean;
    isGalactoseIntolerant: boolean;
    isGlucoseIntolerant: boolean;
    isLactoseIntolerant: boolean;
    isMaltoseIntolerant: boolean;
    isSucroseIntolerant: boolean;
    gotCholesterol: boolean;
    isAccountFinalized: boolean;
}

export enum FoodPreferencesEnum {
    REGULAR = 0,
    VEGETARIAN = 1,
    VEGAN = 2,
}
