// #region IMPORTS -> /////////////////////////////////////
import { BottomSheet, Button } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomModal from '~/components/common/BottomModal';
import ButtonIcon from '~/components/common/ButtonIcon';
import SignInForm from '~/components/forms/SignInForm';
import SignUpForm from '~/components/forms/SignUpForm';
import { AppError } from '~/core/appError';
import { INewUserDto, UserLoginPayload } from '~/data/model/userApiModel';
import useUserService from '~/hooks/services/useUserService';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Login({}) {
    // #region STATE --> ///////////////////////////////////////
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [access, setAccess] = useState<string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorCred, setErrorCred] = useState<boolean>(false);
    const [accountCreated, setAccountCreated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const UserService = useUserService();
    const Nav = useNavigation();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const openCloseBottomSheet = (chosenMode?: typeof mode) => {
        setIsVisible(!isVisible);
        setMode(chosenMode);
        if (isVisible) {
            setErrorCred(false);
            setErrorMessage(null);
        }
    };

    const signIn = async (payload: UserLoginPayload) => {
        setIsLoading(true);
        setErrorCred(false);
        setErrorMessage(null);
        await UserService.login(payload)
            .then((res) => (res ? Nav.goTo('Home') : setErrorCred(true)))
            .catch((err: AppError) => {
                if (err.code === 'wrong_credentials') {
                    setErrorCred(true);
                }
            })
            .finally(() => setIsLoading(false));
    };

    const signUp = async (payLoad: INewUserDto) => {
        setIsLoading(true);
        await UserService.subscribe(payLoad)
            .then((res) => setAccountCreated(true))
            .catch((err: AppError) => setErrorMessage(err.message))
            .finally(() => setIsLoading(false));
    };
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
            <BottomModal onGestureClose={(e) => setIsVisible(!e)} overflow="hidden" onPressClose={() => openCloseBottomSheet()} isVisible={isVisible}>
                {mode === 'signIn' ? <SignInForm errorCred={errorCred} isLoading={isLoading} submit={signIn} /> : <SignUpForm submit={signUp} isLoading={isLoading} errorMessage={errorMessage} />}
            </BottomModal>
        </SafeAreaView>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ILogin {}
// #enderegion IPROPS --> //////////////////////////////////
