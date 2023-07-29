// #region IMPORTS -> /////////////////////////////////////
import { AppError, ErrorTypeEnum, ServerApiError } from '~/core/appError';
import { useAppSelector } from '~/store/storeHooks';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const apiHost = 'http://192.168.1.55:8080';
// #endregion SINGLETON --> /////////////////////////////////

export default function useServiceApi(): IUseServiceApi {
    // #region STATE --> ///////////////////////////////////////
    const access = useAppSelector((state) => state.access.value);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const get = async <T,>(route: string, headersRequest?: HeadersInit): Promise<T> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${access}`);
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        const options: RequestInit = {
            method: 'GET',
            //credentials: "include",
            headers,
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);
        if (request.status >= 300) {
            const errorResponse = (await request.json()) as ServerApiError;
            throw new AppError(ErrorTypeEnum.Functional, errorResponse.message, errorResponse.errorCode, errorResponse.data);
        }
        const response = await request.json();
        return response as T;
    };
    const post = async <T, B>(route: string, body: B, formData?: FormData, headersRequest?: object): Promise<T> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${access}`);
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        body && headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers,
            body: formData ? formData : JSON.stringify(body),
        };
        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);

        const response = await request.json();
        return response as T;
    };
    const put = async <T, B>(route: string, body: B, formData?: FormData, headersRequest?: object): Promise<T> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${access}`);
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        body && headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const options: RequestInit = {
            method: 'PUT',
            credentials: 'include',
            headers,
            body: formData ? formData : JSON.stringify(body),
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);

        const response = await request.json();
        return response as T;
    };
    const del = async <T, B>(route: string, body?: B, formData?: FormData, headersRequest?: object): Promise<T> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${access}`);

        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        body && headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const options: RequestInit = {
            method: 'DELETE',
            // credentials: "include",
            headers,
            body: body ? JSON.stringify(body) : null,
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);

        const response = await request.json();
        return response;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { get, post, put, del };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseServiceApi {
    get: <T>(url: string, headers?: HeadersInit) => Promise<T>;
    post: <T, B>(url: string, body: B, formData?: FormData, headers?: object) => Promise<T>;
    put: <T, B>(url: string, body: B, formData?: FormData, headers?: object) => Promise<T>;
    del: <T, B>(url: string, body?: B, formData?: FormData, headers?: object) => Promise<T>;
}
// #enderegion IPROPS --> //////////////////////////////////
