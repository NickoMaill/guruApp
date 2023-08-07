// #region IMPORTS -> /////////////////////////////////////
import React, { useEffect, useState } from 'react';
import BouncerLoader from '~/components/common/BouncerLoader';
import FabGroup from '~/components/home/FabGroup';
import Layout from '~/components/layouts/Layout';
import SwipeLayout from '~/components/swiper/SwipeLayout';
import { RecipesDto } from '~/data/model/recipesApiModel';
import useRecipesService from '~/hooks/services/useRecipesService';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Home() {
    // #region STATE --> ///////////////////////////////////////
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [recipes, setRecipes] = useState<RecipesDto[]>(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const RecipesService = useRecipesService();
    const Navigation = useNavigation();
    Navigation.root.addListener('focus', () => getRecipes());
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getRecipes = async () => {
        setIsLoading(true);
        await RecipesService.getRecipes()
            .then((res) => setRecipes(res.records))
            .finally(() => setIsLoading(false));
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        getRecipes();
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <Layout headerShown>{isLoading ? <BouncerLoader /> : <SwipeLayout onEndOfList={(e) => e && getRecipes()} data={recipes} />}</Layout>;
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// interface IHome {}
// #enderegion IPROPS --> //////////////////////////////////
