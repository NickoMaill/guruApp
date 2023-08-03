import { RecursiveKeyOf } from '~/core/types/common';
import { TranslationResourcesType } from '~/resources/i18n/types';
import { useTranslation } from 'react-i18next';

export default function useResources(): IUseResources {
    const { t } = useTranslation();
    const translate = (key: RecursiveKeyOf<TranslationResourcesType>, args?: any): string => {
        return t(key, args).toString();
    };

    return { translate };
}

interface IUseResources {
    translate: (key: RecursiveKeyOf<TranslationResourcesType>, args?: any) => string;
}
