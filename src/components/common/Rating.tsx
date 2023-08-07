// #region IMPORTS -> /////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from './Icon';
import { RecipesDifficultyEnum } from '~/data/model/recipesApiModel';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Rating({ difficulty }: IRating) {
    // #region STATE --> ///////////////////////////////////////
    const [color, setColor] = useState<string>(null);
    const [howMany, setHowMany] = useState<number>(0);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const renderRate = () => {
        for (let index = 0; index <= difficulty + 1; index++) {
            return <Icon color={color} type="octicon" name="dot-fill" />;
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        switch (difficulty) {
            case RecipesDifficultyEnum.EASY:
                setColor('green');
                break;
            case RecipesDifficultyEnum.NORMAL:
                setColor('orange');
                break;
            case RecipesDifficultyEnum.HARD:
                setColor('red');
                break;
            default:
                setColor(null);
                break;
        }
    }, [difficulty]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <View style={{ padding: 0, marginHorizontal: 0, borderColor: color, alignItems: 'center', flexDirection: 'row', borderWidth: 1.5, borderRadius: 50, width: 50, height: 25 }}>
            {difficulty === RecipesDifficultyEnum.EASY ? (
                <>
                    <Icon style={{ marginLeft: 2 }} color={color} type="octicon" name="dot-fill" />
                </>
            ) : difficulty === RecipesDifficultyEnum.NORMAL ? (
                <>
                    <Icon style={{ marginHorizontal: 2 }} color={color} type="octicon" name="dot-fill" />
                    <Icon color={color} type="octicon" name="dot-fill" />
                </>
            ) : difficulty === RecipesDifficultyEnum.HARD ? (
                <>
                    <Icon style={{ marginHorizontal: 2 }} color={color} type="octicon" name="dot-fill" />
                    <Icon style={{ marginRight: 2 }} color={color} type="octicon" name="dot-fill" />
                    <Icon color={color} type="octicon" name="dot-fill" />
                </>
            ) : null}
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IRating {
    difficulty: RecipesDifficultyEnum;
}
// #enderegion IPROPS --> //////////////////////////////////
