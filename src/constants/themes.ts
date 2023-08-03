import { createTheme } from '@rneui/themed';

export const theme = createTheme({
    components: {
        FAB: {
            // raised: true,
        },
        Button: {
            raised: true,
        },
    },
    lightColors: {
        primary: '#FF6347',
        secondary: '#393E42',
        background: '#FFFFFF',
        black: '#242424',
        grey0: '#393e42',
        grey1: '#43484d',
        grey2: '#5e6977',
        grey3: '#86939e',
        grey4: '#bdc6cf',
        grey5: '#e1e8ee',
        greyOutline: '#bbbbbb',
        success: '#69C779',
        error: '#ff190c',
        warning: '#faad14',
        disabled: 'hsl(208, 8%, 90%)',
    },
    mode: 'light',
});
