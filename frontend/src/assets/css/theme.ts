import { DefaultTheme } from 'styled-components'
export const theme: DefaultTheme = {
    colors: {
        greyBlack: '#48464C',
        orange: '#FF9900',
        bg: '#fffdfa'
    },
    media: {
        _480: "(max-width: 480px)",
        _768: "(max-width: 768px)",
        _980: "(max-width: 980px)",
    }
};

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            greyBlack: string;
            orange: string;
            bg: string
        },  media: {
            _480: "(max-width: 480px)",
            _768: "(max-width: 768px)",
            _980: "(max-width: 980px)"
        }
    }
}
