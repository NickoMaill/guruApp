import { RecipesSubCategoryEnum } from './recipesApiModel';

export type UserLoginPayload = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export type UserSession = {
    email: string;
    token: string;
    isAccountFinalized: boolean;
};

export type UserLoginResponse = {
    email: string;
    refreshToken: string;
    accessToken: string;
    isAccountFinalized: boolean;
};

export type AuthCheckType = {
    id: number;
    email: string;
    isAccountFinalized: boolean;
};

export interface INewUserDto {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    username: string;
}
export interface IUserDto {
    email: string;
    username: string;
    phoneNumber: string;
    avatar: string;
    firstName: string;
    lastName: string;
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

export type UpdateUserDto = {
    foodPreferences?: FoodPreferencesEnum;
    isGlutenIntolerant?: boolean;
    isFructoseIntolerant?: boolean;
    isGalactoseIntolerant?: boolean;
    isGlucoseIntolerant?: boolean;
    isLactoseIntolerant?: boolean;
    isMaltoseIntolerant?: boolean;
    isSucroseIntolerant?: boolean;
    gotCholesterol?: boolean;
    isEmailConfirmed?: boolean;
    isAccountFinalized?: boolean;
    favoritesFoods?: RecipesSubCategoryEnum[];
};

export enum FoodPreferencesEnum {
    REGULAR = 0,
    VEGETARIAN = 1,
    VEGAN = 2,
}
