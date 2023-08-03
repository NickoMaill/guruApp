// #region IMPORTS -> /////////////////////////////////////
import { Button, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import InputText from '../common/InputText';
import { INewUserDto } from '~/data/model/userApiModel';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
const frenchPhoneRegex = /^(0|(\+33[\s]?([0]?|[(0)]{3}?)))[1-9]([-. ]?[0-9]{2}){4}$/g;
type InputsError = {
    errorEmail: boolean;
    errorEmailMessage: string;
    errorPassword: boolean;
    errorPasswordMessage: string;
    errorPhone: boolean;
    errorPhoneMessage: string;
    errorGlobalMessage: string;
    errorFirstName: boolean;
    errorFirstNameMessage: string;
    errorLastName: boolean;
    errorLastNameMessage: string;
    errorUsername: boolean;
    errorUsernameMessage: string;
};
const initialStateError: InputsError = {
    errorEmail: false,
    errorPassword: false,
    errorEmailMessage: '',
    errorPasswordMessage: '',
    errorGlobalMessage: '',
    errorPhone: false,
    errorPhoneMessage: '',
    errorFirstName: false,
    errorFirstNameMessage: '',
    errorLastName: false,
    errorLastNameMessage: '',
    errorUsername: false,
    errorUsernameMessage: '',
};
// #endregion SINGLETON --> /////////////////////////////////

export default function SignUpForm({ submit, errorMessage, isLoading }: ISignUpForm) {
    // #region STATE --> ///////////////////////////////////////
    const [newUser, setNewUser] = useState<INewUserDto>({ username: '', email: '', password: '', firstName: '', lastName: '', phoneNumber: '' });
    const [error, setError] = useState<InputsError>(initialStateError);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const changePayload = (key: keyof INewUserDto, value: string) => {
        setNewUser((prevState) => {
            return { ...prevState, [key]: value };
        });
    };

    const phoneFormatter = (phoneNumber: string) => {
        const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
        return numericPhoneNumber.replace(
            /^(\+33|0)?(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/,
            (_, prefix, g1, g2, g3, g4, g5) => (prefix === '+33' ? `+33 ${g1} ${g2} ${g3} ${g4} ${g5}` : `+33 ${g1} ${g2} ${g3} ${g4} ${g5}`) || phoneNumber
        );
    };

    const checkInput = () => {
        if (newUser.email.length === 0) {
            setError((prevState) => {
                return { ...prevState, errorEmail: true, errorEmailMessage: 'ce champs est requis' };
            });
            return false;
        }

        if (newUser.email.length > 0 && !newUser.email.match(emailRegex)) {
            setError((prevState) => {
                return { ...prevState, errorEmail: true, errorEmailMessage: 'veuillez rentrer une adresse email valide' };
            });
            return false;
        }

        if (newUser.password.length === 0) {
            setError((prevState) => {
                return { ...prevState, errorPassword: true, errorPasswordMessage: 'ce champs est requis' };
            });
            return false;
        }

        if (!newUser.password.match(passwordRegex)) {
            setError((prevState) => {
                return { ...prevState, errorPassword: true, errorPasswordMessage: 'votre mot de passe doit contenir 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, et un caractère spécial' };
            });
            return false;
        }

        if (newUser.password !== confirmPassword) {
            setError((prevState) => {
                return { ...prevState, errorPassword: true, errorPasswordMessage: 'les mots de passe ne concorde pas' };
            });
            return false;
        }

        if (!newUser.phoneNumber.trim().split(' ').join('').match(frenchPhoneRegex)) {
            setError((prevState) => {
                return { ...prevState, errorPhone: true, errorPhoneMessage: 'numéros de téléphone incorrecte' };
            });
            return false;
        }

        if (newUser.firstName.length === 0) {
            setError((prevState) => {
                return { ...prevState, errorFirstName: true, errorFirstNameMessage: 'ce champs est requis' };
            });
            return false;
        }

        if (newUser.lastName.length === 0) {
            setError((prevState) => {
                return { ...prevState, errorLastName: true, errorLastNameMessage: 'ce champs est requis' };
            });
            return false;
        }

        return true;
    };

    const sendPayload = () => {
        setError(initialStateError);
        if (!checkInput()) {
            return;
        }
        submit(newUser);
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <View style={{ marginHorizontal: 7 }}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <InputText
                    errorMessage={error.errorUsernameMessage}
                    isError={error.errorUsername}
                    label="Pseudo"
                    inputType="username"
                    placeholder="Utilisateur123"
                    iconFamily="antdesign"
                    nameIcon="user"
                    colorIcon="#b2b2b2"
                    inputValue={newUser.username}
                    onChangeText={(e) => changePayload('username', e)}
                />
                <InputText
                    errorMessage={error.errorLastNameMessage}
                    isError={error.errorLastName}
                    label="Nom"
                    inputType="familyName"
                    placeholder="Doe"
                    iconFamily="antdesign"
                    nameIcon="idcard"
                    colorIcon="#b2b2b2"
                    inputValue={newUser.lastName}
                    autoCapitalize="words"
                    onChangeText={(e) => changePayload('lastName', e)}
                />
                <InputText
                    errorMessage={error.errorFirstNameMessage}
                    isError={error.errorFirstName}
                    label="Prénom"
                    inputType="name"
                    placeholder="John"
                    iconFamily="antdesign"
                    nameIcon="idcard"
                    colorIcon="#b2b2b2"
                    autoCapitalize="words"
                    inputValue={newUser.firstName}
                    onChangeText={(e) => changePayload('firstName', e)}
                />
                <InputText
                    errorMessage={error.errorPhoneMessage}
                    isError={error.errorPhone}
                    label="Téléphone"
                    inputType="telephoneNumber"
                    placeholder="+33 6 12 34 56 78"
                    nameIcon="phone"
                    colorIcon="#b2b2b2"
                    inputValue={newUser.phoneNumber}
                    onBlur={() => changePayload('phoneNumber', phoneFormatter(newUser.phoneNumber))}
                    onChangeText={(e) => changePayload('phoneNumber', e)}
                />
                <InputText
                    errorMessage={error.errorEmailMessage}
                    isError={error.errorEmail}
                    label="Email"
                    inputType="emailAddress"
                    placeholder="JohnDoe@email.com"
                    iconFamily="material"
                    nameIcon="alternate-email"
                    colorIcon="#b2b2b2"
                    inputValue={newUser.email}
                    onChangeText={(e) => changePayload('email', e)}
                />
                <InputText
                    errorMessage={error.errorPasswordMessage}
                    isError={error.errorPassword}
                    label="Mot de passe"
                    inputType="newPassword"
                    placeholder="*********"
                    nameIcon="lock"
                    colorIcon="#b2b2b2"
                    inputValue={newUser.password}
                    onChangeText={(e) => changePayload('password', e)}
                />
                <InputText
                    isError={error.errorPassword}
                    label="Confirmez votre mot de passe"
                    inputType="password"
                    placeholder="*********"
                    nameIcon="lock"
                    colorIcon="#b2b2b2"
                    inputValue={confirmPassword}
                    onChangeText={(e) => setConfirmPassword(e)}
                />
                <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>{errorMessage}</Text>
                <Button
                    loading={isLoading}
                    radius={100}
                    onPress={() => sendPayload()}
                    buttonStyle={{ padding: 20, backgroundColor: 'tomato' }}
                    titleStyle={{ fontSize: 20 }}
                    containerStyle={{ margin: 10, marginHorizontal: 50 }}
                >
                    Créer un compte
                </Button>
            </ScrollView>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISignUpForm {
    submit: (payload: INewUserDto) => void;
    errorMessage?: string;
    isLoading: boolean;
}
// #enderegion IPROPS --> //////////////////////////////////
