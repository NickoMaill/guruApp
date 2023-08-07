// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import useServiceApi from '../useServiceApi';
import { execService } from '~/manager/errorManager';
import { RecipesDto } from '~/data/model/recipesApiModel';
import { OutputQueryRequest } from '~/core/types/serverTypes';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useRecipesService(): IUseRecipesService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useServiceApi();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getRecipes = async (): Promise<OutputQueryRequest<RecipesDto>> => {
        const recipes = await execService<OutputQueryRequest<RecipesDto>>(Service.get('recipes/all'));
        return recipes;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { getRecipes };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseRecipesService {
    getRecipes: () => Promise<OutputQueryRequest<RecipesDto>>;
}
// #enderegion IPROPS --> //////////////////////////////////
