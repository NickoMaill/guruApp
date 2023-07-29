// #region IMPORTS -> /////////////////////////////////////
import { Icon } from '@rneui/base';
import { Button, CheckBox, Input, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Keyboard } from 'react-native';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import { UserLoginPayload } from '~/data/model/userApiModel';
import configManager from '~/manager/configManager';
import InputText from '../common/InputText';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
type InputsError = {
    errorEmail: boolean;
    errorEmailMessage: string;
    errorPassword: boolean;
    errorPasswordMessage: string;
    errorGlobalMessage: string;
};
const initialStateError: InputsError = {
    errorEmail: false,
    errorPassword: false,
    errorEmailMessage: '',
    errorPasswordMessage: '',
    errorGlobalMessage: '',
};
// #endregion SINGLETON --> /////////////////////////////////

export default function SignInForm({ submit, isLoading, errorCred }: ISignInForm) {
    // #region STATE --> ///////////////////////////////////////
    const [isRemember, setIsRemember] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<InputsError>(initialStateError);
    const [isKeyboardShown, setIsKeyboardShown] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    Keyboard.addListener('keyboardWillShow', (e) => {
        setIsKeyboardShown(true);
    });

    Keyboard.addListener('keyboardWillHide', () => {
        setIsKeyboardShown(false);
    });
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const verifyInput = (): boolean => {
        if (email.length === 0 || !email) {
            setError((prevState) => {
                return { ...prevState, errorEmail: true, errorEmailMessage: 'veuillez entrer une adresse email valide' };
            });
            return false;
        }

        if (email.length > 0 && !email.match(emailRegex)) {
            setError((prevState) => {
                return { ...prevState, errorEmail: true, errorEmailMessage: "mauvais format d'adresse email" };
            });
            return false;
        }

        if (password.length === 0 || !password) {
            setError((prevState) => {
                return { ...prevState, errorPassword: true, errorPasswordMessage: 'un mot de passe est requis pour continuer' };
            });
            return false;
        }

        return true;
    };

    const buildPayload = () => {
        setError(initialStateError);
        if (!verifyInput()) {
            return;
        }
        const payload = {
            email: email,
            password: password,
            rememberMe: isRemember,
        };
        submit(payload);
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (errorCred) {
            setError((prevState) => {
                return { ...prevState, errorEmail: true, errorPassword: true, errorGlobalMessage: 'Email et/ou mot de passe invalide' };
            });
        }
    }, [errorCred]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <View style={{ top: isKeyboardShown ? (configManager.isIos() ? -100 : 0) : 0 }}>
            <InputText
                onChangeText={(e) => setEmail(e)}
                errorMessage={error.errorEmailMessage}
                isError={error.errorEmail}
                iconFamily="material"
                nameIcon="alternate-email"
                colorIcon="#b2b2b2"
                label="Email"
                inputType="emailAddress"
                inputValue={email}
                placeholder="exemple@email.com"
            />
            <InputText
                onChangeText={(e) => setPassword(e)}
                errorMessage={error.errorPasswordMessage}
                isError={error.errorPassword}
                nameIcon="lock"
                colorIcon="#b2b2b2"
                label="Mot de passe"
                inputType="password"
                inputValue={password}
                placeholder="********"
            />
            <CheckBox center title="se souvenir de moi" checked={isRemember} onPress={() => setIsRemember(!isRemember)} checkedColor="tomato" />
            <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>{error.errorGlobalMessage}</Text>
            <Button
                loadingProps={{ size: 30 }}
                loading={isLoading}
                onPress={() => buildPayload()}
                radius={100}
                buttonStyle={{ padding: 20, backgroundColor: 'tomato' }}
                titleStyle={{ fontSize: 20 }}
                containerStyle={{ margin: 10, marginHorizontal: 50 }}
            >
                Connexion
            </Button>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISignInForm {
    submit: (data: UserLoginPayload) => void;
    isLoading: boolean;
    errorCred: boolean;
}
// #enderegion IPROPS --> //////////////////////////////////
