import { environment } from "src/environments/environment";

export class Endpoints {
    public static AUTH = environment.apiUrl + 'user/';
    public static AUTHDEF = environment.apiUrl + 'user/login';
    public static DASHBOARD = environment.apiUrl + '/dashboard';
    public static LOGIN = environment.apiUrl + 'login';
    public static NOTES = environment.apiUrl + 'note/';
}