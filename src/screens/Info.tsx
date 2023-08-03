// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon, Text } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LongButton from '~/components/common/BlankLongButton';
import { envConfig } from '~/constants/env';
import useExternalNavigation from '~/hooks/useExternalNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Info() {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const navigation = useNavigation();
    const externalNav = useExternalNavigation();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity style={{ position: 'absolute', left: 0, top: 0 }} onPress={() => navigation.goBack()}>
                    <Icon name="close" color="tomato" size={40} style={{ margin: 10 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, textAlign: 'center', paddingTop: 20 }}>Info</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ textAlign: 'center' }}>
                    Bienvenue sur Guru recipes, si vous êtes ici c&apos;est que vous êtes curieux ! J&apos;ai imaginé cette application pour toutes les personnes qui ne savent pas quoi manger ou qui
                    ont tout simplement envie de découvrir des recettes par la force du hasard (enfin pas exactement)
                </Text>
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <LongButton label="conditions générale" onPress={() => externalNav.open(envConfig.BASE_URL + '/info/cgu')} index={0} />
                <LongButton label="mention légales" onPress={() => externalNav.open(envConfig.BASE_URL + '/info/legal_mentions')} index={1} />
                <LongButton label="un problème ? contactez moi" onPress={() => externalNav.open('mailto:nicomaillols@gmail.com')} index={2} />
            </View>
        </SafeAreaView>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #enderegion IPROPS --> //////////////////////////////////
