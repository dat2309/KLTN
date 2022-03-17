import API from "../../API";

const registerApi = {
    register(userName, email, password) {
        const url = "/api/user";
        return API.post(url, { userName: userName, email: email, password: password })

    }
}
export default registerApi;