export interface LoginResponseInterface {
    accessToken: string;
    userName: string;
    refreshToken: string;
}

export interface ResponseRoot {
    data: LoginResponseInterface;
}

export interface CommonInterface {
    actionFN: () => void
}

export interface BaseUrl {
    apiUrl:string
}
