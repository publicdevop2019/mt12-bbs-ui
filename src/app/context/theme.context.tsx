import React from 'react';
export const theme = {
    theme: '',
    updateTheme: (next: string) => { },
};

export const ThemeContext = React.createContext(theme);