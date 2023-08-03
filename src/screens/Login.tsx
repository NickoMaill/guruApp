// #region IMPORTS -> /////////////////////////////////////
import { Button, Chip, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomModal from '~/components/common/BottomModal';
import SignInForm from '~/components/forms/SignInForm';
import SignUpForm from '~/components/forms/SignUpForm';
import { AppError } from '~/core/appError';
import { ILoginProps } from '~/core/router/routerType';
import { INewUserDto, UserLoginPayload } from '~/data/model/userApiModel';
import useUserService from '~/hooks/services/useUserService';
import useNavigation from '~/hooks/useNavigation';
import * as Linking from 'expo-linking';
import FullLoader from '~/components/animations/FullLoader';
import useResources from '~/hooks/useResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Login({ navigation }: ILoginProps) {
    // #region STATE --> ///////////////////////////////////////
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGlobaleLoading, setIsGlobalLoading] = useState<boolean>(false);
    const [accountCreated, setAccountCreated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(null);
    const [targetEmail, setTargetEmail] = useState<string>(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const UserService = useUserService();
    const Nav = useNavigation();
    const Resources = useResources();

    Linking.addEventListener('url', (e) => {
        const dataUrl = Linking.parse(e.url);
        if (dataUrl.queryParams.mode) {
            setMode(dataUrl.queryParams.mode as 'signIn' | 'signUp');
            setAccountCreated(false);
            setIsVisible(true);
        }
    });

    navigation.addListener('focus', () => {
        setIsLoading(false);
        setAccountCreated(false);
        setIsGlobalLoading(false);
    });
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const openCloseBottomSheet = (chosenMode?: typeof mode) => {
        setIsVisible(!isVisible);
        setMode(chosenMode);
        if (isVisible) {
            setErrorMessage(null);
        }
    };

    const signIn = async (payload: UserLoginPayload) => {
        setIsLoading(true);
        setErrorMessage(null);
        const login = await UserService.login(payload).catch((err: AppError) => {
            setErrorMessage(err.message);
            setIsLoading(false);
            return false;
        });
        if (login) {
            Nav.goTo('Home');
            setIsGlobalLoading(true);
            setIsLoading(false);
            setIsVisible(false);
        }
    };

    const signUp = async (payLoad: INewUserDto) => {
        setIsLoading(true);
        setErrorMessage(null);
        setTargetEmail(payLoad.email);

        await UserService.subscribe(payLoad)
            .then(() => {
                setAccountCreated(true);
            })
            .catch((err: AppError) => setErrorMessage(err.message))
            .finally(() => {
                setIsLoading(false);
                setIsVisible(false);
            });
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    if (isGlobaleLoading) {
        return <FullLoader />;
    } else {
        if (accountCreated) {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Votre compte à été crée, confirmez votre adresse email pour commencer à utiliser guru</Text>
                    <TouchableOpacity>
                        <Chip
                            buttonStyle={{ borderWidth: 1 }}
                            onPress={() => Nav.goToExternal(`message:${targetEmail}`)}
                            containerStyle={{ marginVertical: 15 }}
                            type="outline"
                            title="Acceder a vos emails"
                        />
                    </TouchableOpacity>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
                    <Button
                        onPress={() => openCloseBottomSheet('signIn')}
                        radius={100}
                        titleStyle={{ fontSize: 25 }}
                        buttonStyle={{ padding: 15, backgroundColor: 'tomato' }}
                        containerStyle={{ margin: 20 }}
                    >
                        {Resources.translate('login.signIn')}
                    </Button>
                    <Button
                        onPress={() => openCloseBottomSheet('signUp')}
                        radius={100}
                        titleStyle={{ fontSize: 25 }}
                        buttonStyle={{ padding: 15, backgroundColor: 'tomato' }}
                        containerStyle={{ margin: 20 }}
                    >
                        {Resources.translate('login.signUp')}
                    </Button>
                    <BottomModal onGestureClose={(e) => setIsVisible(!e)} overflow="hidden" onPressClose={() => openCloseBottomSheet()} isVisible={isVisible}>
                        {mode === 'signIn' ? (
                            <SignInForm errorMessage={errorMessage} isLoading={isLoading} submit={signIn} />
                        ) : (
                            <SignUpForm submit={signUp} isLoading={isLoading} errorMessage={errorMessage} />
                        )}
                    </BottomModal>
                </SafeAreaView>
            );
        }
    }
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// interface ILogin {}
// #enderegion IPROPS --> //////////////////////////////////
