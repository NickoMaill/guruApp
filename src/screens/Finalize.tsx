// #region IMPORTS -> /////////////////////////////////////
import { Input, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { FoodPreferencesEnum } from '~/data/model/userApiModel';
import SelectInput from '~/components/common/SelectInput';
import CheckBoxesGroup from '~/components/common/CheckBoxesGroup';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const dataSelect: { label: string; value: FoodPreferencesEnum; }[] = [
    { label: "Je mange de tout", value: FoodPreferencesEnum.REGULAR },
    { label: "Je suis végétarien.ne", value: FoodPreferencesEnum.VEGETARIAN },
    { label: "Je suis vegan", value: FoodPreferencesEnum.VEGAN },
];

const checkBoxData: { label: string; value: boolean; }[] = [
    { label: 'oui', value: true },
    { label: 'non', value: false }
];
// #endregion SINGLETON --> /////////////////////////////////

export default function Finalize({}: IFinalize) {
    // #region STATE --> ///////////////////////////////////////
    const [selectValue, setSelectedValue] = useState<FoodPreferencesEnum>(null);
    const [checkBoxValue, setCheckboxValue] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <SafeAreaView style={{ padding: 10, backgroundColor: 'white' }}>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 8 }}>Bienvenue sur Guru</Text>
                <Text style={{ textAlign: 'center' }}>on a besoin d'apprendre a vous connaître, pour vous proposer les recettes approprié a vos préférences</Text>
            </View>
            <View>
                <SelectInput label='Quel est ton régime alimentaire ?' data={dataSelect} value={selectValue} onChange={(e) => setSelectedValue(e.value)} icon={""} />
                <Text>Avez vous des intolérances ?</Text>
                <CheckBoxesGroup<boolean> label="lactose ?" data={checkBoxData} currentValue={checkBoxValue} onChange={(v) => setCheckboxValue(v)} />
                <CheckBoxesGroup<boolean> label="maltose ?" data={checkBoxData} currentValue={checkBoxValue} onChange={(v) => setCheckboxValue(v)} />
                <CheckBoxesGroup<boolean> label="galactose ?" data={checkBoxData} currentValue={checkBoxValue} onChange={(v) => setCheckboxValue(v)} />
                <CheckBoxesGroup<boolean> label="sucrose ?" data={checkBoxData} currentValue={checkBoxValue} onChange={(v) => setCheckboxValue(v)} />
                <CheckBoxesGroup<boolean> label="fructose ?" data={checkBoxData} currentValue={checkBoxValue} onChange={(v) => setCheckboxValue(v)} />
                <CheckBoxesGroup<boolean> label="Avez vous du cholesterol ?" data={checkBoxData} currentValue={checkBoxValue} onChange={(v) => setCheckboxValue(v)} />
            </View>
        </SafeAreaView>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IFinalize {}
// #enderegion IPROPS --> //////////////////////////////////
