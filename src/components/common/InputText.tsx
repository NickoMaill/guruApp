// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import { InputModeOptions, NativeSyntheticEvent, StyleProp, TextInputChangeEventData, TextInputIOSProps, TextProps, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/themed';
import { useEffect, useState } from 'react';
import Icon from './Icon';

// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputText({
    inputType,
    label,
    placeholder,
    onChangeText,
    onChange,
    onBlur,
    onFocus,
    inputValue,
    style,
    nameIcon,
    colorIcon,
    isError,
    errorMessage,
    autoCapitalize = 'none',
    iconFamily = 'font-awesome',
}: IInputText) {
    // #region STATE --> ///////////////////////////////////////
    const [isSecure, setIsSecure] = useState<boolean>(false);
    const [currentIcon, setCurrentIcon] = useState<'eye' | 'eye-with-line'>('eye-with-line');
    const [inputMode, setInputMode] = useState<InputModeOptions>('text');
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const showPassword = (show: boolean) => {
        if (show) {
            setIsSecure(false);
            setCurrentIcon('eye');
        } else {
            setIsSecure(true);
            setCurrentIcon('eye-with-line');
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (inputType === 'password' || inputType === 'newPassword') {
            setIsSecure(true);
        }
        switch (inputType) {
            case 'URL':
                setInputMode('url');
                break;
            case 'emailAddress':
                setInputMode('email');
                break;
            case 'telephoneNumber':
                setInputMode('tel');
                break;
            case 'username':
            case 'familyName':
            case 'givenName':
            case 'jobTitle':
            case 'middleName':
            case 'name':
            case 'namePrefix':
            case 'nameSuffix':
            case 'nickname':
            case 'none':
            case 'organizationName':
            case 'creditCardNumber':
            case 'newPassword':
            case 'password':
                setInputMode('text');
                break;
            case 'addressCity':
            case 'addressCityAndState':
            case 'addressState':
            case 'countryName':
            case 'postalCode':
            case 'streetAddressLine1':
            case 'streetAddressLine2':
            case 'sublocality':
            case 'fullStreetAddress':
            case 'location':
                setInputMode('search');
                break;
            case 'oneTimeCode':
                setInputMode('numeric');
                break;
            default:
                setInputMode('text');
                break;
        }
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Input
            style={[style, { width: '90%', marginLeft: 6 }]}
            textContentType={inputType}
            containerStyle={{ marginVertical: 10 }}
            inputMode={inputMode}
            label={label}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            value={inputValue}
            onChangeText={onChangeText}
            onChange={onChange}
            autoCapitalize={autoCapitalize}
            errorMessage={errorMessage}
            renderErrorMessage={isError}
            leftIcon={nameIcon ? <Icon type={iconFamily} name={nameIcon} color={isError ? 'red' : colorIcon} /> : null}
            secureTextEntry={isSecure}
            rightIcon={
                inputType === 'password' || inputType === 'newPassword' ? (
                    <TouchableOpacity onPressIn={() => showPassword(true)} onPressOut={() => showPassword(false)}>
                        <Icon type="entypo" name={currentIcon} />
                    </TouchableOpacity>
                ) : null
            }
        />
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputText {
    inputType: TextInputIOSProps['textContentType'];
    label: string;
    placeholder: string;
    inputValue: string;
    onChangeText: (t: string) => void;
    onChange?: () => NativeSyntheticEvent<TextInputChangeEventData>;
    onBlur?: () => void;
    onFocus?: () => void;
    style?: StyleProp<TextProps>;
    nameIcon?: string;
    colorIcon?: string;
    iconFamily?: 'material' | 'material-community' | 'simple-line-icon' | 'zocial' | 'font-awesome' | 'octicon' | 'ionicon' | 'foundation' | 'evilicon' | 'entypo' | 'antdesign' | 'font-awesome-5';
    errorMessage?: string;
    isError?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}
// #enderegion IPROPS --> //////////////////////////////////
