// #region IMPORTS -> /////////////////////////////////////
import { useNavigation } from '@react-navigation/native';
import { BottomSheet, Button, Icon, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonIcon from '~/components/common/ButtonIcon';
import SignInForm from '~/components/forms/SignInForm';
import SignUpForm from '~/components/forms/SignUpForm';
import { UserLoginPayload } from '~/data/model/userApiModel';
import useStorage from '~/hooks/useStorage';
import configManager from '~/manager/configManager';
import userServices from '~/services/userServices';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Login({  }) {
    // #region STATE --> ///////////////////////////////////////
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const navigation = useNavigation();
    const storage = useStorage();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const openCloseBottomSheet = (chosenMode?: typeof mode) => {
        setIsVisible(!isVisible);
        setMode(chosenMode);
    };

    const signIn = async (payload: UserLoginPayload) => {
        setIsLoading(true);
        await userServices.login(payload)
        .then((res) => {
            if (res.token) {
                storage.setSession(res);
                if (res.isAccountFinalized) {
                    navigation.navigate("Home");
                } else {
                    navigation.navigate('Finalize');
                }
            }
        })
        .finally(() => setIsLoading(false));
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
            <Button onPress={() => openCloseBottomSheet('signIn')} radius={100} titleStyle={{ fontSize: 25 }} buttonStyle={{ padding: 15, backgroundColor: 'tomato' }} containerStyle={{ margin: 20 }}>
                Se Connecter
            </Button>
            <Button onPress={() => openCloseBottomSheet('signUp')} radius={100} titleStyle={{ fontSize: 25 }} buttonStyle={{ padding: 15, backgroundColor: 'tomato' }} containerStyle={{ margin: 20 }}>
                Créer un compte
            </Button>
            <BottomSheet containerStyle={{ overflow: 'hidden' }} isVisible={isVisible}>
                <View style={{ backgroundColor: '#ffffff', height: configManager.dimension.height / 1.033, justifyContent: "center", overflow: 'hidden' }}>
                    <ButtonIcon style={{ top: 0, left: 0, position: 'absolute', margin: 0 }} onPress={() => openCloseBottomSheet()} iconColor="tomato" iconSize={40} iconName="close" />
                    {mode === "signIn" ? <SignInForm isLoading={isLoading} submit={signIn}/> : <SignUpForm/>}
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ILogin {}
// #enderegion IPROPS --> //////////////////////////////////
