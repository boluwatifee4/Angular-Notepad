export class AuthSignUpModel {
    email!: string;
    first_name!: string;
    password!: string;
    last_name!: string;
}

export class AuthLoginModel {
    email!: string;
    password!: string;
}

// export interface AuthResponseI {
//     data: {
//         email: string;
//         token: string;
//     };
// }