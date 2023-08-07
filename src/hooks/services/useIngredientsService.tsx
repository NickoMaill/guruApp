// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import { AutocompleteIngredientType } from '~/data/model/ingredientsApiModel';
import { execService } from '~/manager/errorManager';
import useService from '../useService';
import useServiceApi from '../useServiceApi';
import useAuth from '../useAuth';
import { OutputQueryRequest } from '~/core/types/serverTypes';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useIngredientsService(): IUseIngredientsService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useServiceApi();
    const Auth = useAuth();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const ingredientsAutocomplete = async (searchedIngredient: string): Promise<OutputQueryRequest<AutocompleteIngredientType>> => {
        await Auth.isAuthenticated();
        const request = await execService<OutputQueryRequest<AutocompleteIngredientType>>(Service.get('ingredients/autocomplete?name=' + searchedIngredient.trim() + '&limit=5'));
        return request;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { ingredientsAutocomplete };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseIngredientsService {
    ingredientsAutocomplete: (searchedIngredient: string) => Promise<OutputQueryRequest<AutocompleteIngredientType>>;
}
// #enderegion IPROPS --> //////////////////////////////////
