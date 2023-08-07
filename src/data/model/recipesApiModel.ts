export type RecipesDto = {
    id?: number;
    name?: string;
    isVegan?: boolean;
    isVegetarian?: boolean;
    nutriScore?: string;
    difficulty?: RecipesDifficultyEnum;
    preparationTime?: number;
    isGluttenFree?: boolean;
    isLactoseFree?: boolean;
    pictureUrl?: string;
    category?: RecipesCategoryEnum;
    subCategory?: RecipesSubCategoryEnum;
    createdAt?: Date;
    updatedAt?: Date;
    howManyPersons?: number;
    description?: string;
};

export enum RecipesDifficultyEnum {
    EASY = 0,
    NORMAL = 1,
    HARD = 2,
}

export enum RecipesCategoryEnum {
    BREAKFASTS = 0,
    STARTERS = 1,
    MAIN_COURSES = 2,
    DESSERT = 3,
    SAUCE = 4,
    APPETIZERS = 5,
    BREAKFAST = 6,
}

export enum NutriScoreEnum {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
}

export enum RecipesSubCategoryEnum {
    FRENCH = 0,
    MEXICAN = 1,
    ITALIAN = 2,
    JAPANESE = 3,
    UNKNOWN = 4,
    CHINESE = 5,
}
