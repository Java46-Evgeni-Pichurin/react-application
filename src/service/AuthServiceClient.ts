import { accounts } from "../config/accounts";
import { ClientData } from "../models/ClientData";
import LoginData from "../models/LoginData";
import AuthService from "./AuthService";

export default class AuthServiceClient implements AuthService {
    login(loginData: LoginData): boolean | ClientData {
        const account = accounts.find(a => loginData.email === a.email && loginData.password === a.password);
        return !!account ? {email: loginData.email, displayName: loginData.email, isAdmin: account.role === "ADMIN"} : false; 
    }
    logout(): boolean {
        return true
    }
}