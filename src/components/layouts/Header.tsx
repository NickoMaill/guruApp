// #region IMPORTS -> /////////////////////////////////////
import React, { ReactElement, useEffect, useState } from 'react';
import { Header as HeaderRN, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '~/core/router/routerType';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////

// #endregion SINGLETON --> /////////////////////////////////

export default function Header({}: IHeader) {
    // #region STATE --> ///////////////////////////////////////
    const [leftComponent, setLeftComponent] = useState<ReactElement>(null);
    const [rightComponent, setRightComponent] = useState<ReactElement>(null);
    const route = useRoute();
    const navigation = useNavigation();
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const renderNavigationButton = (screen: keyof ReactNavigation.RootParamList, icon: string) => {
        return (
            <TouchableOpacity onPress={() => navigation.goTo(screen)}>
                <Icon name={icon} type="font-awesome-5" color="#b2b2b2" />
            </TouchableOpacity>
        );
    };

    const initHeaderContent = (screen: keyof ReactNavigation.RootParamList) => {
        switch (screen) {
            case 'Home':
                setLeftComponent(renderNavigationButton('User', 'user'));
                setRightComponent(renderNavigationButton('Setup', 'cog'));
                break;
            case 'User':
                setLeftComponent(null);
                setRightComponent(renderNavigationButton('Home', 'home'));
                break;
            case 'Setup':
                setLeftComponent(renderNavigationButton('Home', 'home'));
                setRightComponent(renderNavigationButton('Info', 'info-circle'));
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        initHeaderContent(route.name as keyof ReactNavigation.RootParamList);
    }, [route.name]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <HeaderRN
            containerStyle={{ margin: 0, padding: 0 }}
            style={{ margin: 0, padding: 0 }}
            backgroundColor="white"
            barStyle="dark-content"
            leftComponent={leftComponent}
            centerComponent={{ text: 'Guru' }}
            rightComponent={rightComponent}
        />
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IHeader {}
// #enderegion IPROPS --> //////////////////////////////////
