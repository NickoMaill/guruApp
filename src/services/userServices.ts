import ServiceBase from "../core/ServiceBase";
import apiManager from "../manager/apiManager";

class UserServices extends ServiceBase {
    // public --> start region /////////////////////////////////////////////
    public async login(email: string, password: string) {
        const body = {
            email, 
            password
        }
        const response = await this.asServicePromise(apiManager.post("user/login", body));
        console.log(response);
    }
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new UserServices();