// #region IMPORTS -> /////////////////////////////////////
import { Image, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Icon from '~/components/common/Icon';
import Skeleton from '~/components/common/Skeleton';
import { Bold, Regular } from '~/components/common/Text';
import Layout from '~/components/layouts/Layout';
import { envConfig } from '~/constants/env';
import { IUserDto } from '~/data/model/userApiModel';
import useUserService from '~/hooks/services/useUserService';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function User() {
    // #region STATE --> ///////////////////////////////////////
    const [userData, setUserData] = useState<IUserDto>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const UserService = useUserService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getInfo = async () => {
        await UserService.getMe()
            .then((res) => setUserData(res))
            .finally(() => setIsLoading(false));
    };

    const loader = () => {
        return (
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Skeleton width={100} circle />
                    <Skeleton width={150} height={30} style={{ marginVertical: 15 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Skeleton rounded width={70} height={30} />
                        <Skeleton rounded width={70} height={30} style={{ marginHorizontal: 30 }} />
                        <Skeleton rounded width={70} height={30} />
                    </View>
                </View>
            </View>
        );
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        getInfo();
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Layout headerShown>
            {!isLoading && userData ? (
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <View>
                            <Image
                                style={{ width: 100, height: 100, borderRadius: 50, shadowColor: 'black', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.5, shadowRadius: 3 }}
                                source={{ uri: envConfig.BASE_URL + userData.avatar }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                            <TouchableOpacity style={{ padding: 5, backgroundColor: 'white', position: 'absolute', right: 0, bottom: 0, borderRadius: 50 }}>
                                <Icon type="font-awesome" name="pencil" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Bold style={{ marginBottom: 5, fontSize: 20 }}>{userData.username}</Bold>
                            <Regular style={{ fontSize: 16, marginBottom: 5 }}>
                                {userData.firstName} {userData.lastName}
                            </Regular>
                            <Regular style={{ marginBottom: 5 }}>{userData.phoneNumber}</Regular>
                        </View>
                    </View>
                </View>
            ) : (
                loader()
            )}
        </Layout>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// interface IUser {}
// #enderegion IPROPS --> //////////////////////////////////
