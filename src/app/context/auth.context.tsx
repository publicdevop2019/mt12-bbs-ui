import React from 'react';
export const userAuth = {
    jwt: '',
    updateJwt: (next: string) => { },
    clearJwt: () => { },
};

export const AuthContext = React.createContext(userAuth);