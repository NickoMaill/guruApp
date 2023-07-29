// #region IMPORTS -> /////////////////////////////////////
import { Button, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodPreferencesEnum, UpdateUserDto } from '~/data/model/userApiModel';
import SelectInput from '~/components/common/SelectInput';
import RadioGroup, { RadioPropsData } from '~/components/common/RadioGroup';
import { RecipesSubCategoryEnum } from '~/data/model/recipesApiModel';
import CheckBoxGroup from '~/components/common/CheckBoxGroup';
import storageManager from '~/manager/storageManager';
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
};
// #endregion SINGLETON --> /////////////////////////////////

export default function Finalize({}: IFinalize) {
    // #region STATE --> ///////////////////////////////////////
    const [selectValue, setSelectedValue] = useState<FoodPreferencesEnum>(null);
    const [checkBoxValue, setCheckboxValue] = useState<boolean>(false);
    const [finalizePayload, setFinalizePayload] = useState<UpdateUserDto>(baseFinalize);
    const [gotIntolerance, setGotIntolerance] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const updatePayload = <T,>(key: keyof UpdateUserDto, value: T) => {
        setFinalizePayload((prevState) => {
            if (Array.isArray(prevState[key])) {
                let tempArray = prevState[key] as T[];
                if (tempArray.includes(value)) {
                    tempArray = tempArray.filter((x) => x !== value);
                } else {
                    tempArray.push(value);
                }
                return {
                    ...prevState,
                    [key]: tempArray,
                };
            } else {
                return {
                    ...prevState,
                    [key]: value,
                };
            }
        });
    };

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

    const submit = async () => {
        setIsLoading(true);
        // await userServices.finalize(finalizePayload).finally(() => setIsLoading(false));
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <SafeAreaView style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
            <ScrollView>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 8 }}>Bienvenue sur Guru</Text>
                    <Text style={{ textAlign: 'center' }}>on a besoin d'apprendre a vous connaître, pour vous proposer les recettes approprié a vos préférences et restrictions alimentaires</Text>
                </View>
                <View>
                    <SelectInput<FoodPreferencesEnum>
                        containerStyle={{ marginRight: 100 }}
                        label="Quel est ton régime alimentaire ?"
                        data={dataSelect}
                        value={finalizePayload.foodPreferences}
                        onChange={(e) => updatePayload<FoodPreferencesEnum>('foodPreferences', e.value)}
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
                                onChange={(v) => updatePayload<boolean>('isLactoseIntolerant', v)}
                            />
                            <RadioGroup<boolean>
                                label="maltose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isMaltoseIntolerant}
                                onChange={(v) => updatePayload<boolean>('isMaltoseIntolerant', v)}
                            />
                            <RadioGroup<boolean>
                                label="galactose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isGalactoseIntolerant}
                                onChange={(v) => updatePayload<boolean>('isGalactoseIntolerant', v)}
                            />
                            <RadioGroup<boolean>
                                label="sucrose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isSucroseIntolerant}
                                onChange={(v) => updatePayload<boolean>('isSucroseIntolerant', v)}
                            />
                            <RadioGroup<boolean>
                                label="fructose ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isFructoseIntolerant}
                                onChange={(v) => updatePayload<boolean>('isFructoseIntolerant', v)}
                            />
                            <RadioGroup<boolean>
                                label="gluten ?"
                                data={checkBoxData}
                                disabled={!gotIntolerance}
                                currentValue={finalizePayload.isGlutenIntolerant}
                                onChange={(v) => updatePayload<boolean>('isGlutenIntolerant', v)}
                            />
                        </View>
                    )}
                    <RadioGroup<boolean>
                        label="Avez vous du cholesterol ?"
                        data={checkBoxData}
                        currentValue={finalizePayload.gotCholesterol}
                        onChange={(v) => updatePayload<boolean>('gotCholesterol', v)}
                    />
                    <CheckBoxGroup<RecipesSubCategoryEnum>
                        label="Vous aimez la cuisine :"
                        data={foodFavorites}
                        currentValue={finalizePayload.favoritesFoods}
                        onChange={(v) => updatePayload<RecipesSubCategoryEnum>('favoritesFoods', v)}
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
interface IFinalize {}
// #enderegion IPROPS --> //////////////////////////////////
