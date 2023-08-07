// #region IMPORTS -> /////////////////////////////////////
import { Button, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodPreferencesEnum, UpdateUserDto } from '~/data/model/userApiModel';
import SelectInput from '~/components/common/SelectInput';
import RadioGroup, { RadioPropsData } from '~/components/common/RadioGroup';
import { RecipesSubCategoryEnum } from '~/data/model/recipesApiModel';
import CheckBoxGroup from '~/components/common/CheckBoxGroup';
import storageManager from '~/manager/storageManager';
import useUserService from '~/hooks/services/useUserService';
import useNavigation from '~/hooks/useNavigation';
import { AppError } from '~/core/appError';
import useNotification from '~/hooks/useNotification';
import { Regular } from '~/components/common/Text';
import configManager from '~/manager/configManager';
import { AutocompleteIngredientType } from '~/data/model/ingredientsApiModel';
import useIngredientsService from '~/hooks/services/useIngredientsService';
import SearchBar from '~/components/common/SearchBar';
import { updateStateObject } from '~/helpers/stateHelper';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const dataSelect: { label: string; value: FoodPreferencesEnum }[] = [
    { label: 'Je mange de tout', value: FoodPreferencesEnum.REGULAR },
    { label: 'Je suis végétarien.ne', value: FoodPreferencesEnum.VEGETARIAN },
    { label: 'Je suis vegan', value: FoodPreferencesEnum.VEGAN },
];

const checkBoxData: RadioPropsData<boolean>[] = [
    { label: 'oui', value: true },
    { label: 'non', value: false },
];

const foodFavorites: RadioPropsData<RecipesSubCategoryEnum>[] = [
    { label: 'Chinoise', value: RecipesSubCategoryEnum.CHINESE },
    { label: 'Française', value: RecipesSubCategoryEnum.FRENCH },
    { label: 'Italienne', value: RecipesSubCategoryEnum.ITALIAN },
    { label: 'Japonaise', value: RecipesSubCategoryEnum.JAPANESE },
    { label: 'Mexicaine', value: RecipesSubCategoryEnum.MEXICAN },
    { label: 'Je ne suis pas difficile', value: RecipesSubCategoryEnum.UNKNOWN },
];

const baseFinalize: UpdateUserDto = {
    foodPreferences: FoodPreferencesEnum.REGULAR,
    isGlutenIntolerant: false,
    isFructoseIntolerant: false,
    isGalactoseIntolerant: false,
    isGlucoseIntolerant: false,
    isLactoseIntolerant: false,
    isMaltoseIntolerant: false,
    isSucroseIntolerant: false,
    gotCholesterol: false,
    favoritesFoods: [],
    notLikedIngredients: [],
};
// #endregion SINGLETON --> /////////////////////////////////

export default function Finalize() {
    // #region STATE --> ///////////////////////////////////////
    const [finalizePayload, setFinalizePayload] = useState<UpdateUserDto>(baseFinalize);
    const [gotIntolerance, setGotIntolerance] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<AutocompleteIngredientType[]>(null);
    const [valueSearch, setValueSearch] = useState<string>('');
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const UserServices = useUserService();
    const Nav = useNavigation();
    const Notif = useNotification();
    const IngredientsService = useIngredientsService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const prepareIntolerance = (value: boolean) => {
        if (!value) {
            setFinalizePayload((prevState) => {
                return {
                    ...prevState,
                    isFructoseIntolerant: false,
                    isGalactoseIntolerant: false,
                    isGlucoseIntolerant: false,
                    isLactoseIntolerant: false,
                    isMaltoseIntolerant: false,
                    isSucroseIntolerant: false,
                    isGlutenIntolerant: false,
                };
            });
        }
        setGotIntolerance(value);
    };

    const getIngredients = async (searchString: string) => {
        setIsSearching(true);
        await IngredientsService.ingredientsAutocomplete(searchString)
            .then((res) => setIngredients(res.records))
            .finally(() => setIsSearching(false));
    };

    const submit = async () => {
        setIsLoading(true);
        await UserServices.finalizeAccount(finalizePayload)
            .then((res) => res && Nav.goTo('Home'))
            .catch((err: AppError) => Notif.displayError(err.message))
            .finally(() => setIsLoading(false));
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (valueSearch.length > 2) {
            getIngredients(valueSearch);
        } else {
            setIngredients(null);
        }
    }, [valueSearch]);

    useEffect(() => {
        console.log(finalizePayload);
    }, [finalizePayload]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <SafeAreaView style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 8 }}>Bienvenue sur Guru</Text>
                    <Text style={{ textAlign: 'center' }}>On a besoin d&apos;apprendre a vous connaître, pour vous proposer les recettes approprié a vos préférences et restrictions alimentaires</Text>
                </View>
                <View>
                    <View>
                        <SearchBar<AutocompleteIngredientType>
                            data={ingredients}
                            keyToDisplay="name"
                            label="Sélectionner les ingredients que vous ne mangez pas"
                            onChangeText={(s) => setValueSearch(s)}
                            onCancel={() => setIngredients(null)}
                            onSelectItem={(item) => updateStateObject<UpdateUserDto, AutocompleteIngredientType>('notLikedIngredients', item, setFinalizePayload)}
                            isLoading={isSearching}
                            value={valueSearch}
                            placeholder="Ingrédients"
                        />
                    </View>
                    <SelectInput<FoodPreferencesEnum>
                        containerStyle={{ marginRight: 100 }}
                        label="Quel est ton régime alimentaire ?"
                        data={dataSelect}
                        value={finalizePayload.foodPreferences}
                        onChange={(e) => updateStateObject<UpdateUserDto, FoodPreferencesEnum>('foodPreferences', e.value, setFinalizePayload)}
                        icon={''}
                    />
                    <View>
                        <RadioGroup<boolean>
                            label="Avez vous des intolérances ?"
                            containerStyle={{ marginTop: 0 }}
                            data={checkBoxData}
                            currentValue={gotIntolerance}
                            onChange={(v) => prepareIntolerance(v)}
                        />
                    </View>
                    {gotIntolerance && (
                        <View style={{ marginLeft: 10, paddingLeft: 10, borderLeftWidth: 1, borderColor: '#b2b2b2', marginBottom: 8 }}>
                            <RadioGroup<boolean>
                                label="lactose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isLactoseIntolerant}
                                onChange={(v) => updateStateObject<UpdateUserDto, boolean>('isLactoseIntolerant', v, setFinalizePayload)}
                            />
                            <RadioGroup<boolean>
                                label="maltose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isMaltoseIntolerant}
                                onChange={(v) => updateStateObject<UpdateUserDto, boolean>('isMaltoseIntolerant', v, setFinalizePayload)}
                            />
                            <RadioGroup<boolean>
                                label="galactose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isGalactoseIntolerant}
                                onChange={(v) => updateStateObject<UpdateUserDto, boolean>('isGalactoseIntolerant', v, setFinalizePayload)}
                            />
                            <RadioGroup<boolean>
                                label="sucrose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isSucroseIntolerant}
                                onChange={(v) => updateStateObject<UpdateUserDto, boolean>('isSucroseIntolerant', v, setFinalizePayload)}
                            />
                            <RadioGroup<boolean>
                                label="fructose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isFructoseIntolerant}
                                onChange={(v) => updateStateObject<UpdateUserDto, boolean>('isFructoseIntolerant', v, setFinalizePayload)}
                            />
                            <RadioGroup<boolean>
                                label="gluten ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isGlutenIntolerant}
                                onChange={(v) => updateStateObject<UpdateUserDto, boolean>('isGlutenIntolerant', v, setFinalizePayload)}
                            />
                        </View>
                    )}
                    <RadioGroup<boolean>
                        label="Avez vous du cholesterol ?"
                        data={checkBoxData}
                        currentValue={finalizePayload.gotCholesterol}
                        onChange={(v) => updateStateObject<UpdateUserDto, boolean>('gotCholesterol', v, setFinalizePayload)}
                    />
                    <CheckBoxGroup<RecipesSubCategoryEnum>
                        label="Vous aimez la cuisine :"
                        data={foodFavorites}
                        currentValue={finalizePayload.favoritesFoods}
                        onChange={(v) => updateStateObject<UpdateUserDto, RecipesSubCategoryEnum>('favoritesFoods', v, setFinalizePayload)}
                    />
                </View>
                <View>
                    <Button loading={isLoading} onPress={submit} radius={100} titleStyle={{ fontSize: 20 }} buttonStyle={{ padding: 10, backgroundColor: 'tomato' }} containerStyle={{ margin: 20 }}>
                        Finaliser mon inscription
                    </Button>
                    <Button onPress={() => storageManager.removeItem('session')}>Wipe</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// interface IFinalize {}
// #enderegion IPROPS --> //////////////////////////////////
