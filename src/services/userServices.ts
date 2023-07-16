import { AuthCheckType, IUserDto, UserLoginPayload, UserLoginResponse } from "~/data/model/userApiModel";
import ServiceBase from "../core/ServiceBase";
import apiManager from "../manager/apiManager";

class UserServices extends ServiceBase {
    // public --> start region /////////////////////////////////////////////
    public async login(payload: UserLoginPayload): Promise<UserLoginResponse> {
        const response = await this.asServicePromise<UserLoginResponse>(apiManager.post<UserLoginPayload>("user/login", payload));
        return response;
    }

    public async check(): Promise<AuthCheckType> {
        const info = await this.asServicePromise<AuthCheckType>(apiManager.get("/user/check"));
        if (!info) {
            return null
        }
        return info;
    };
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new UserServices();