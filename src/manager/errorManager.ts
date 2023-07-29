import { AppError, ErrorTypeEnum } from '~/core/appError';
import { ResultStatusEnum } from '~/core/types/serverTypes';

export const execService = async <T>(req: Promise<T>) => {
    return await req.then(
        (apiResponse) => Promise.resolve<T>(apiResponse),
        (error) => reject<T>(error as unknown)
    );
};

const reject = <TResult>(error: any = null): Promise<TResult> => {
    if (error && error.type) {
        return Promise.reject(error);
    }

    if (!error.status) {
        return Promise.reject(new AppError(ErrorTypeEnum.Undefined, error.message));
    }

    let type = ErrorTypeEnum.Undefined;

    switch (error.status) {
        case ResultStatusEnum.Forbidden:
            type = ErrorTypeEnum.NotAllowed;
            break;
        case ResultStatusEnum.UnAuthorized:
            type = ErrorTypeEnum.SessionRequired;
            break;
        case ResultStatusEnum.NotAcceptable:
            type = ErrorTypeEnum.Maintenance;
            break;
        case ResultStatusEnum.BadRequest || ResultStatusEnum.Fatal || ResultStatusEnum.NotFound:
            type = ErrorTypeEnum.Technical;
            break;
        default:
            type = ErrorTypeEnum.Undefined;
            break;
    }

    const apiError = error.result;
    return Promise.reject(new AppError(type, apiError.message, apiError.errorCode, apiError.data));
};
