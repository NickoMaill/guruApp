// #region IMPORTS -> /////////////////////////////////////
import { Button, Icon, Input } from '@rneui/themed';
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function SignUpForm ({}: ISignUpForm) {
    // #region STATE --> ///////////////////////////////////////
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const [currentIcon, setCurrentIcon] = useState<'eye' | 'eye-with-line'>('eye-with-line');
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
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <View style={{ marginHorizontal: 7 }}>
            <Input leftIcon={<Icon name="idcard" color="#b2b2b2" type='antdesign' />} label="Nom" inputMode="email" placeholder="Doe" />
            <Input leftIcon={<Icon name="idcard" color="#b2b2b2" type='antdesign' />} label="Prénom" inputMode="email" placeholder="John" />
            <Input leftIcon={<Icon name="phone" color="#b2b2b2" type='antdesign' />} label="Numéro de téléphone" inputMode="tel" placeholder="0612345678" />
            <Input leftIcon={<Icon name="alternate-email" color="#b2b2b2" />} label="Adresse email" inputMode="email" placeholder="exemple@email.com" />
            <Input
                leftIcon={<Icon name="lock" color="#b2b2b2" />}
                rightIcon={
                    <TouchableOpacity onPressIn={() => showPassword(true)} onPressOut={() => showPassword(false)}>
                        <Icon name={currentIcon} type="entypo" />
                    </TouchableOpacity>
                }
                secureTextEntry={isPasswordHidden}
                label="Mot de passe"
                placeholder="*********"
            />
            <Input
                leftIcon={<Icon name="lock" color="#b2b2b2" />}
                rightIcon={
                    <TouchableOpacity onPressIn={() => showPassword(true)} onPressOut={() => showPassword(false)}>
                        <Icon name={currentIcon} type="entypo" />
                    </TouchableOpacity>
                }
                secureTextEntry={isPasswordHidden}
                label="Confirmer mot passe"
                placeholder="*********"
            />
            <Button radius={100} buttonStyle={{ padding: 20, backgroundColor: 'tomato' }} titleStyle={{ fontSize: 20 }} containerStyle={{ margin: 10, marginHorizontal: 50 }}>
                Créer un compte
            </Button>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISignUpForm {}
// #enderegion IPROPS --> //////////////////////////////////