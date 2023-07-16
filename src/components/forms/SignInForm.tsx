// #region IMPORTS -> /////////////////////////////////////
import { Icon } from '@rneui/base';
import { Button, CheckBox, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import { UserLoginPayload } from '~/data/model/userApiModel';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
type InputsError = {
    errorEmail: boolean;
    errorEmailMessage: string;
    errorPassword: boolean;
    errorPasswordMessage: string;
};
// #endregion SINGLETON --> /////////////////////////////////

export default function SignInForm({ submit, isLoading }: ISignInForm) {
    // #region STATE --> ///////////////////////////////////////
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const [currentIcon, setCurrentIcon] = useState<'eye' | 'eye-with-line'>('eye-with-line');
    const [isRemember, setIsRemember] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<InputsError>({ errorEmail: false, errorPassword: false, errorEmailMessage: '', errorPasswordMessage: '' });
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const showPassword = (show: boolean) => {
        if (show) {
            setIsPasswordHidden(false);
            setCurrentIcon('eye');
        } else {
            setIsPasswordHidden(true);
            setCurrentIcon('eye-with-line');
        }
    };

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
        if (!verifyInput()) {
            return;
        }
        const payload = {
            email: email,
            password: password,
            rememberMe: isRemember
        }
        submit(payload);
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <View>
            <Input onChangeText={(e) => setEmail(e)} errorMessage={error.errorEmailMessage} renderErrorMessage={error.errorEmail} leftIcon={<Icon name="alternate-email" color="#b2b2b2" />} label="email" inputMode="email" placeholder="exemple@email.com" />
            <Input
                errorMessage={error.errorPasswordMessage}
                renderErrorMessage={error.errorPassword}
                onChangeText={(e) => setPassword(e)}
                leftIcon={<Icon name="lock" color="#b2b2b2" />}
                rightIcon={
                    <TouchableOpacity onPressIn={() => showPassword(true)} onPressOut={() => showPassword(false)}>
                        <Icon name={currentIcon} type="entypo" />
                    </TouchableOpacity>
                }
                secureTextEntry={isPasswordHidden}
                label="password"
                placeholder="*********"
            />
            <CheckBox center title="se souvenir de moi" checked={isRemember} onPress={() => setIsRemember(!isRemember)} checkedColor="tomato" />
            <Button loadingProps={{ size: 30 }} loading={isLoading} onPress={() => buildPayload()} radius={100} buttonStyle={{ padding: 20, backgroundColor: 'tomato' }} titleStyle={{ fontSize: 20 }} containerStyle={{ margin: 10, marginHorizontal: 50 }}>
                Connexion
            </Button>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISignInForm {
    submit: (data: UserLoginPayload) => void
    isLoading: boolean
}
// #enderegion IPROPS --> //////////////////////////////////
