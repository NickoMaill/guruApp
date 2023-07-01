// #region IMPORTS -> /////////////////////////////////////

import { NativeSyntheticEvent, StyleProp, TextInputChangeEventData, TextInputIOSProps, TextProps } from "react-native";
import { Input } from "@rneui/themed";

// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputText ({ inputType, label, placeholder, onChangeText, onChange, inputValue, style }: IInputText) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Input
            style={[style, { width: "90%", marginBottom: 10 }]} 
            textContentType={inputType} 
            label={label} 
            placeholder={placeholder} 
            value={inputValue} 
            onChangeText={onChangeText} 
            onChange={onChange}
        />
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputText {
    inputType: TextInputIOSProps["textContentType"];
    label: string;
    placeholder: string;
    inputValue: string;
    onChangeText: (t: string) => void;
    onChange?: () => NativeSyntheticEvent<TextInputChangeEventData>
    style?: StyleProp<TextProps>
    
}
// #enderegion IPROPS --> //////////////////////////////////