// #region IMPORTS -> /////////////////////////////////////
import { Button, CheckBox, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, Keyboard } from 'react-native';
import { UserLoginPayload } from '~/data/model/userApiModel';
import configManager from '~/manager/configManager';
import InputText from '../common/InputText';
import useResources from '~/hooks/useResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
type InputsError = {
    errorEmail: boolean;
    errorEmailMessage: string;
    errorPassword: boolean;
    errorPasswordMessage: string;
};
const initialStateError: InputsError = {
    errorEmail: false,
    errorPassword: false,
    errorEmailMessage: '',
    errorPasswordMessage: '',
};
// #endregion SINGLETON --> /////////////////////////////////

export default function SignInForm({ submit, isLoading, errorMessage }: ISignInForm) {
    // #region STATE --> ///////////////////////////////////////
    const [isRemember, setIsRemember] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<InputsError>(initialStateError);
    const [isKeyboardShown, setIsKeyboardShown] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Resources = useResources();
    Keyboard.addListener('keyboardWillShow', () => {
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
                return { ...prevState, errorEmail: true, errorEmailMessage: Resources.translate('login.error.invalidEmail') };
            });
            return false;
        }

        if (email.length > 0 && !email.match(emailRegex)) {
            setError((prevState) => {
                return { ...prevState, errorEmail: true, errorEmailMessage: Resources.translate('login.error.wrongEmailFormat') };
            });
            return false;
        }

        if (password.length === 0 || !password) {
            setError((prevState) => {
                return { ...prevState, errorPassword: true, errorPasswordMessage: Resources.translate('login.error.requiredPassword') };
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
        if (errorMessage) {
            setError((prevState) => {
                return { ...prevState, errorEmail: true, errorPassword: true };
            });
        }
    }, [errorMessage]);
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
                label={Resources.translate('dictionary.email')}
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
                label={Resources.translate('dictionary.password')}
                inputType="password"
                inputValue={password}
                placeholder="********"
            />
            <CheckBox center title={Resources.translate('login.rememberMe')} checked={isRemember} onPress={() => setIsRemember(!isRemember)} checkedColor="tomato" />
            <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>{errorMessage}</Text>
            <Button
                loadingProps={{ size: 30 }}
                loading={isLoading}
                onPress={() => buildPayload()}
                radius={100}
                buttonStyle={{ padding: 20, backgroundColor: 'tomato' }}
                titleStyle={{ fontSize: 20 }}
                containerStyle={{ margin: 10, marginHorizontal: 50 }}
            >
                {Resources.translate('login.connect')}
            </Button>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISignInForm {
    submit: (data: UserLoginPayload) => void;
    isLoading: boolean;
    errorMessage?: string;
}
// #enderegion IPROPS --> //////////////////////////////////
