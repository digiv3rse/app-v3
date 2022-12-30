/**
 * Color Variables
 *
 * All the following variables are used to generate color tokens.
 * Changes made to these variables will be reflected throughout the library.
 */
export declare type Mode = 'light' | 'dark';
declare const shades: readonly [50, 300, 400, 500, 750];
declare const namedShadeMap: {
    readonly Surface: 50;
    readonly Bright: 300;
    readonly Primary: 400;
    readonly Dim: 500;
    readonly Active: 750;
};
declare const hues: {
    blue: (number | {
        50: number[];
    })[];
    indigo: number[];
    purple: number[];
    pink: number[];
    red: (number | {
        50: number[];
    })[];
    orange: number[];
    yellow: (number | {
        50: number[];
    })[];
    green: (number | {
        50: number[];
    })[];
    teal: number[];
    grey: (number | {
        50: number[];
        300: number[];
        500: number[];
        750: number[];
    })[];
};
declare const categories: {
    background: {
        hue: string;
        items: {
            primary: {
                light: string;
                dark: string;
            };
            secondary: string;
        };
    };
    text: {
        hue: string;
        items: {
            primary: string;
            secondary: string;
            tertiary: string;
            accent: {
                light: string;
                dark: string;
            };
        };
    };
    border: {
        hue: string;
        items: {
            primary: string;
        };
    };
};
declare const gradients: {
    accent: string;
    blue: string;
    green: string;
    red: string;
    purple: string;
    grey: string;
};
/**
 * END COLOR VARIABLES
 */
export declare type NamedShade = keyof typeof namedShadeMap;
export declare type Shade = typeof shades[number];
export declare type Hue = keyof typeof hues;
export declare type Category = keyof Categories | 'accent';
export declare type Gradient = keyof typeof gradients;
declare type Categories = typeof categories;
declare type CamelCaseNested<T> = (T extends object ? {
    [K in Exclude<keyof T, symbol>]: `${K}${Capitalize<CamelCaseNested<T[K]>>}`;
}[Exclude<keyof T, symbol>] : '') extends infer D ? Extract<D, string> : never;
declare type DotNestedCategoryKeys = CamelCaseNested<{
    [item in keyof Categories]: {
        [key in keyof Categories[item]['items']]: string;
    } & {
        '': string;
    };
}>;
declare type DotNestedCategories = {
    [K in DotNestedCategoryKeys]: string;
};
export declare const makeColors: (accent: Hue) => {
    light: {
        gradients: {
            accent: string;
            blue: string;
            green: string;
            red: string;
            purple: string;
            grey: string;
        };
        text: string;
        grey: string;
        background: string;
        border: string;
        accent: string;
        textPrimary: string;
        textAccent: string;
        textSecondary: string;
        textTertiary: string;
        backgroundPrimary: string;
        backgroundSecondary: string;
        borderPrimary: string;
        blue: string;
        indigo: string;
        purple: string;
        pink: string;
        red: string;
        orange: string;
        yellow: string;
        green: string;
        teal: string;
        greySurface: string;
        accentSurface: string;
        blueSurface: string;
        indigoSurface: string;
        purpleSurface: string;
        pinkSurface: string;
        redSurface: string;
        orangeSurface: string;
        yellowSurface: string;
        greenSurface: string;
        tealSurface: string;
        greyActive: string;
        accentActive: string;
        blueActive: string;
        indigoActive: string;
        purpleActive: string;
        pinkActive: string;
        redActive: string;
        orangeActive: string;
        yellowActive: string;
        greenActive: string;
        tealActive: string;
        greyDim: string;
        accentDim: string;
        blueDim: string;
        indigoDim: string;
        purpleDim: string;
        pinkDim: string;
        redDim: string;
        orangeDim: string;
        yellowDim: string;
        greenDim: string;
        tealDim: string;
        greyPrimary: string;
        accentPrimary: string;
        bluePrimary: string;
        indigoPrimary: string;
        purplePrimary: string;
        pinkPrimary: string;
        redPrimary: string;
        orangePrimary: string;
        yellowPrimary: string;
        greenPrimary: string;
        tealPrimary: string;
        greyBright: string;
        accentBright: string;
        blueBright: string;
        indigoBright: string;
        purpleBright: string;
        pinkBright: string;
        redBright: string;
        orangeBright: string;
        yellowBright: string;
        greenBright: string;
        tealBright: string;
        raw: Omit<Omit<{
            greySurface: string;
            accentSurface: string;
            blueSurface: string;
            indigoSurface: string;
            purpleSurface: string;
            pinkSurface: string;
            redSurface: string;
            orangeSurface: string;
            yellowSurface: string;
            greenSurface: string;
            tealSurface: string;
            greyActive: string;
            accentActive: string;
            blueActive: string;
            indigoActive: string;
            purpleActive: string;
            pinkActive: string;
            redActive: string;
            orangeActive: string;
            yellowActive: string;
            greenActive: string;
            tealActive: string;
            greyDim: string;
            accentDim: string;
            blueDim: string;
            indigoDim: string;
            purpleDim: string;
            pinkDim: string;
            redDim: string;
            orangeDim: string;
            yellowDim: string;
            greenDim: string;
            tealDim: string;
            greyPrimary: string;
            accentPrimary: string;
            bluePrimary: string;
            indigoPrimary: string;
            purplePrimary: string;
            pinkPrimary: string;
            redPrimary: string;
            orangePrimary: string;
            yellowPrimary: string;
            greenPrimary: string;
            tealPrimary: string;
            greyBright: string;
            accentBright: string;
            blueBright: string;
            indigoBright: string;
            purpleBright: string;
            pinkBright: string;
            redBright: string;
            orangeBright: string;
            yellowBright: string;
            greenBright: string;
            tealBright: string;
        } & {
            grey: string;
            accent: string;
            blue: string;
            indigo: string;
            purple: string;
            pink: string;
            red: string;
            orange: string;
            yellow: string;
            green: string;
            teal: string;
        }, "raw"> & {
            raw: Omit<{
                greySurface: string;
                accentSurface: string;
                blueSurface: string;
                indigoSurface: string;
                purpleSurface: string;
                pinkSurface: string;
                redSurface: string;
                orangeSurface: string;
                yellowSurface: string;
                greenSurface: string;
                tealSurface: string;
                greyActive: string;
                accentActive: string;
                blueActive: string;
                indigoActive: string;
                purpleActive: string;
                pinkActive: string;
                redActive: string;
                orangeActive: string;
                yellowActive: string;
                greenActive: string;
                tealActive: string;
                greyDim: string;
                accentDim: string;
                blueDim: string;
                indigoDim: string;
                purpleDim: string;
                pinkDim: string;
                redDim: string;
                orangeDim: string;
                yellowDim: string;
                greenDim: string;
                tealDim: string;
                greyPrimary: string;
                accentPrimary: string;
                bluePrimary: string;
                indigoPrimary: string;
                purplePrimary: string;
                pinkPrimary: string;
                redPrimary: string;
                orangePrimary: string;
                yellowPrimary: string;
                greenPrimary: string;
                tealPrimary: string;
                greyBright: string;
                accentBright: string;
                blueBright: string;
                indigoBright: string;
                purpleBright: string;
                pinkBright: string;
                redBright: string;
                orangeBright: string;
                yellowBright: string;
                greenBright: string;
                tealBright: string;
            } & {
                grey: string;
                accent: string;
                blue: string;
                indigo: string;
                purple: string;
                pink: string;
                red: string;
                orange: string;
                yellow: string;
                green: string;
                teal: string;
            }, "raw">;
        } & Omit<DotNestedCategories, "raw"> & {
            raw: Omit<DotNestedCategories, "raw">;
        }, "raw">;
    };
    dark: {
        gradients: {
            accent: string;
            blue: string;
            green: string;
            red: string;
            purple: string;
            grey: string;
        };
        text: string;
        grey: string;
        background: string;
        border: string;
        accent: string;
        textPrimary: string;
        textAccent: string;
        textSecondary: string;
        textTertiary: string;
        backgroundPrimary: string;
        backgroundSecondary: string;
        borderPrimary: string;
        blue: string;
        indigo: string;
        purple: string;
        pink: string;
        red: string;
        orange: string;
        yellow: string;
        green: string;
        teal: string;
        greySurface: string;
        accentSurface: string;
        blueSurface: string;
        indigoSurface: string;
        purpleSurface: string;
        pinkSurface: string;
        redSurface: string;
        orangeSurface: string;
        yellowSurface: string;
        greenSurface: string;
        tealSurface: string;
        greyActive: string;
        accentActive: string;
        blueActive: string;
        indigoActive: string;
        purpleActive: string;
        pinkActive: string;
        redActive: string;
        orangeActive: string;
        yellowActive: string;
        greenActive: string;
        tealActive: string;
        greyDim: string;
        accentDim: string;
        blueDim: string;
        indigoDim: string;
        purpleDim: string;
        pinkDim: string;
        redDim: string;
        orangeDim: string;
        yellowDim: string;
        greenDim: string;
        tealDim: string;
        greyPrimary: string;
        accentPrimary: string;
        bluePrimary: string;
        indigoPrimary: string;
        purplePrimary: string;
        pinkPrimary: string;
        redPrimary: string;
        orangePrimary: string;
        yellowPrimary: string;
        greenPrimary: string;
        tealPrimary: string;
        greyBright: string;
        accentBright: string;
        blueBright: string;
        indigoBright: string;
        purpleBright: string;
        pinkBright: string;
        redBright: string;
        orangeBright: string;
        yellowBright: string;
        greenBright: string;
        tealBright: string;
        raw: Omit<Omit<{
            greySurface: string;
            accentSurface: string;
            blueSurface: string;
            indigoSurface: string;
            purpleSurface: string;
            pinkSurface: string;
            redSurface: string;
            orangeSurface: string;
            yellowSurface: string;
            greenSurface: string;
            tealSurface: string;
            greyActive: string;
            accentActive: string;
            blueActive: string;
            indigoActive: string;
            purpleActive: string;
            pinkActive: string;
            redActive: string;
            orangeActive: string;
            yellowActive: string;
            greenActive: string;
            tealActive: string;
            greyDim: string;
            accentDim: string;
            blueDim: string;
            indigoDim: string;
            purpleDim: string;
            pinkDim: string;
            redDim: string;
            orangeDim: string;
            yellowDim: string;
            greenDim: string;
            tealDim: string;
            greyPrimary: string;
            accentPrimary: string;
            bluePrimary: string;
            indigoPrimary: string;
            purplePrimary: string;
            pinkPrimary: string;
            redPrimary: string;
            orangePrimary: string;
            yellowPrimary: string;
            greenPrimary: string;
            tealPrimary: string;
            greyBright: string;
            accentBright: string;
            blueBright: string;
            indigoBright: string;
            purpleBright: string;
            pinkBright: string;
            redBright: string;
            orangeBright: string;
            yellowBright: string;
            greenBright: string;
            tealBright: string;
        } & {
            grey: string;
            accent: string;
            blue: string;
            indigo: string;
            purple: string;
            pink: string;
            red: string;
            orange: string;
            yellow: string;
            green: string;
            teal: string;
        }, "raw"> & {
            raw: Omit<{
                greySurface: string;
                accentSurface: string;
                blueSurface: string;
                indigoSurface: string;
                purpleSurface: string;
                pinkSurface: string;
                redSurface: string;
                orangeSurface: string;
                yellowSurface: string;
                greenSurface: string;
                tealSurface: string;
                greyActive: string;
                accentActive: string;
                blueActive: string;
                indigoActive: string;
                purpleActive: string;
                pinkActive: string;
                redActive: string;
                orangeActive: string;
                yellowActive: string;
                greenActive: string;
                tealActive: string;
                greyDim: string;
                accentDim: string;
                blueDim: string;
                indigoDim: string;
                purpleDim: string;
                pinkDim: string;
                redDim: string;
                orangeDim: string;
                yellowDim: string;
                greenDim: string;
                tealDim: string;
                greyPrimary: string;
                accentPrimary: string;
                bluePrimary: string;
                indigoPrimary: string;
                purplePrimary: string;
                pinkPrimary: string;
                redPrimary: string;
                orangePrimary: string;
                yellowPrimary: string;
                greenPrimary: string;
                tealPrimary: string;
                greyBright: string;
                accentBright: string;
                blueBright: string;
                indigoBright: string;
                purpleBright: string;
                pinkBright: string;
                redBright: string;
                orangeBright: string;
                yellowBright: string;
                greenBright: string;
                tealBright: string;
            } & {
                grey: string;
                accent: string;
                blue: string;
                indigo: string;
                purple: string;
                pink: string;
                red: string;
                orange: string;
                yellow: string;
                green: string;
                teal: string;
            }, "raw">;
        } & Omit<DotNestedCategories, "raw"> & {
            raw: Omit<DotNestedCategories, "raw">;
        }, "raw">;
    };
};
export declare const colors: {
    light: {
        gradients: {
            accent: string;
            blue: string;
            green: string;
            red: string;
            purple: string;
            grey: string;
        };
        text: string;
        grey: string;
        background: string;
        border: string;
        accent: string;
        textPrimary: string;
        textAccent: string;
        textSecondary: string;
        textTertiary: string;
        backgroundPrimary: string;
        backgroundSecondary: string;
        borderPrimary: string;
        blue: string;
        indigo: string;
        purple: string;
        pink: string;
        red: string;
        orange: string;
        yellow: string;
        green: string;
        teal: string;
        greySurface: string;
        accentSurface: string;
        blueSurface: string;
        indigoSurface: string;
        purpleSurface: string;
        pinkSurface: string;
        redSurface: string;
        orangeSurface: string;
        yellowSurface: string;
        greenSurface: string;
        tealSurface: string;
        greyActive: string;
        accentActive: string;
        blueActive: string;
        indigoActive: string;
        purpleActive: string;
        pinkActive: string;
        redActive: string;
        orangeActive: string;
        yellowActive: string;
        greenActive: string;
        tealActive: string;
        greyDim: string;
        accentDim: string;
        blueDim: string;
        indigoDim: string;
        purpleDim: string;
        pinkDim: string;
        redDim: string;
        orangeDim: string;
        yellowDim: string;
        greenDim: string;
        tealDim: string;
        greyPrimary: string;
        accentPrimary: string;
        bluePrimary: string;
        indigoPrimary: string;
        purplePrimary: string;
        pinkPrimary: string;
        redPrimary: string;
        orangePrimary: string;
        yellowPrimary: string;
        greenPrimary: string;
        tealPrimary: string;
        greyBright: string;
        accentBright: string;
        blueBright: string;
        indigoBright: string;
        purpleBright: string;
        pinkBright: string;
        redBright: string;
        orangeBright: string;
        yellowBright: string;
        greenBright: string;
        tealBright: string;
        raw: Omit<Omit<{
            greySurface: string;
            accentSurface: string;
            blueSurface: string;
            indigoSurface: string;
            purpleSurface: string;
            pinkSurface: string;
            redSurface: string;
            orangeSurface: string;
            yellowSurface: string;
            greenSurface: string;
            tealSurface: string;
            greyActive: string;
            accentActive: string;
            blueActive: string;
            indigoActive: string;
            purpleActive: string;
            pinkActive: string;
            redActive: string;
            orangeActive: string;
            yellowActive: string;
            greenActive: string;
            tealActive: string;
            greyDim: string;
            accentDim: string;
            blueDim: string;
            indigoDim: string;
            purpleDim: string;
            pinkDim: string;
            redDim: string;
            orangeDim: string;
            yellowDim: string;
            greenDim: string;
            tealDim: string;
            greyPrimary: string;
            accentPrimary: string;
            bluePrimary: string;
            indigoPrimary: string;
            purplePrimary: string;
            pinkPrimary: string;
            redPrimary: string;
            orangePrimary: string;
            yellowPrimary: string;
            greenPrimary: string;
            tealPrimary: string;
            greyBright: string;
            accentBright: string;
            blueBright: string;
            indigoBright: string;
            purpleBright: string;
            pinkBright: string;
            redBright: string;
            orangeBright: string;
            yellowBright: string;
            greenBright: string;
            tealBright: string;
        } & {
            grey: string;
            accent: string;
            blue: string;
            indigo: string;
            purple: string;
            pink: string;
            red: string;
            orange: string;
            yellow: string;
            green: string;
            teal: string;
        }, "raw"> & {
            raw: Omit<{
                greySurface: string;
                accentSurface: string;
                blueSurface: string;
                indigoSurface: string;
                purpleSurface: string;
                pinkSurface: string;
                redSurface: string;
                orangeSurface: string;
                yellowSurface: string;
                greenSurface: string;
                tealSurface: string;
                greyActive: string;
                accentActive: string;
                blueActive: string;
                indigoActive: string;
                purpleActive: string;
                pinkActive: string;
                redActive: string;
                orangeActive: string;
                yellowActive: string;
                greenActive: string;
                tealActive: string;
                greyDim: string;
                accentDim: string;
                blueDim: string;
                indigoDim: string;
                purpleDim: string;
                pinkDim: string;
                redDim: string;
                orangeDim: string;
                yellowDim: string;
                greenDim: string;
                tealDim: string;
                greyPrimary: string;
                accentPrimary: string;
                bluePrimary: string;
                indigoPrimary: string;
                purplePrimary: string;
                pinkPrimary: string;
                redPrimary: string;
                orangePrimary: string;
                yellowPrimary: string;
                greenPrimary: string;
                tealPrimary: string;
                greyBright: string;
                accentBright: string;
                blueBright: string;
                indigoBright: string;
                purpleBright: string;
                pinkBright: string;
                redBright: string;
                orangeBright: string;
                yellowBright: string;
                greenBright: string;
                tealBright: string;
            } & {
                grey: string;
                accent: string;
                blue: string;
                indigo: string;
                purple: string;
                pink: string;
                red: string;
                orange: string;
                yellow: string;
                green: string;
                teal: string;
            }, "raw">;
        } & Omit<DotNestedCategories, "raw"> & {
            raw: Omit<DotNestedCategories, "raw">;
        }, "raw">;
    };
    dark: {
        gradients: {
            accent: string;
            blue: string;
            green: string;
            red: string;
            purple: string;
            grey: string;
        };
        text: string;
        grey: string;
        background: string;
        border: string;
        accent: string;
        textPrimary: string;
        textAccent: string;
        textSecondary: string;
        textTertiary: string;
        backgroundPrimary: string;
        backgroundSecondary: string;
        borderPrimary: string;
        blue: string;
        indigo: string;
        purple: string;
        pink: string;
        red: string;
        orange: string;
        yellow: string;
        green: string;
        teal: string;
        greySurface: string;
        accentSurface: string;
        blueSurface: string;
        indigoSurface: string;
        purpleSurface: string;
        pinkSurface: string;
        redSurface: string;
        orangeSurface: string;
        yellowSurface: string;
        greenSurface: string;
        tealSurface: string;
        greyActive: string;
        accentActive: string;
        blueActive: string;
        indigoActive: string;
        purpleActive: string;
        pinkActive: string;
        redActive: string;
        orangeActive: string;
        yellowActive: string;
        greenActive: string;
        tealActive: string;
        greyDim: string;
        accentDim: string;
        blueDim: string;
        indigoDim: string;
        purpleDim: string;
        pinkDim: string;
        redDim: string;
        orangeDim: string;
        yellowDim: string;
        greenDim: string;
        tealDim: string;
        greyPrimary: string;
        accentPrimary: string;
        bluePrimary: string;
        indigoPrimary: string;
        purplePrimary: string;
        pinkPrimary: string;
        redPrimary: string;
        orangePrimary: string;
        yellowPrimary: string;
        greenPrimary: string;
        tealPrimary: string;
        greyBright: string;
        accentBright: string;
        blueBright: string;
        indigoBright: string;
        purpleBright: string;
        pinkBright: string;
        redBright: string;
        orangeBright: string;
        yellowBright: string;
        greenBright: string;
        tealBright: string;
        raw: Omit<Omit<{
            greySurface: string;
            accentSurface: string;
            blueSurface: string;
            indigoSurface: string;
            purpleSurface: string;
            pinkSurface: string;
            redSurface: string;
            orangeSurface: string;
            yellowSurface: string;
            greenSurface: string;
            tealSurface: string;
            greyActive: string;
            accentActive: string;
            blueActive: string;
            indigoActive: string;
            purpleActive: string;
            pinkActive: string;
            redActive: string;
            orangeActive: string;
            yellowActive: string;
            greenActive: string;
            tealActive: string;
            greyDim: string;
            accentDim: string;
            blueDim: string;
            indigoDim: string;
            purpleDim: string;
            pinkDim: string;
            redDim: string;
            orangeDim: string;
            yellowDim: string;
            greenDim: string;
            tealDim: string;
            greyPrimary: string;
            accentPrimary: string;
            bluePrimary: string;
            indigoPrimary: string;
            purplePrimary: string;
            pinkPrimary: string;
            redPrimary: string;
            orangePrimary: string;
            yellowPrimary: string;
            greenPrimary: string;
            tealPrimary: string;
            greyBright: string;
            accentBright: string;
            blueBright: string;
            indigoBright: string;
            purpleBright: string;
            pinkBright: string;
            redBright: string;
            orangeBright: string;
            yellowBright: string;
            greenBright: string;
            tealBright: string;
        } & {
            grey: string;
            accent: string;
            blue: string;
            indigo: string;
            purple: string;
            pink: string;
            red: string;
            orange: string;
            yellow: string;
            green: string;
            teal: string;
        }, "raw"> & {
            raw: Omit<{
                greySurface: string;
                accentSurface: string;
                blueSurface: string;
                indigoSurface: string;
                purpleSurface: string;
                pinkSurface: string;
                redSurface: string;
                orangeSurface: string;
                yellowSurface: string;
                greenSurface: string;
                tealSurface: string;
                greyActive: string;
                accentActive: string;
                blueActive: string;
                indigoActive: string;
                purpleActive: string;
                pinkActive: string;
                redActive: string;
                orangeActive: string;
                yellowActive: string;
                greenActive: string;
                tealActive: string;
                greyDim: string;
                accentDim: string;
                blueDim: string;
                indigoDim: string;
                purpleDim: string;
                pinkDim: string;
                redDim: string;
                orangeDim: string;
                yellowDim: string;
                greenDim: string;
                tealDim: string;
                greyPrimary: string;
                accentPrimary: string;
                bluePrimary: string;
                indigoPrimary: string;
                purplePrimary: string;
                pinkPrimary: string;
                redPrimary: string;
                orangePrimary: string;
                yellowPrimary: string;
                greenPrimary: string;
                tealPrimary: string;
                greyBright: string;
                accentBright: string;
                blueBright: string;
                indigoBright: string;
                purpleBright: string;
                pinkBright: string;
                redBright: string;
                orangeBright: string;
                yellowBright: string;
                greenBright: string;
                tealBright: string;
            } & {
                grey: string;
                accent: string;
                blue: string;
                indigo: string;
                purple: string;
                pink: string;
                red: string;
                orange: string;
                yellow: string;
                green: string;
                teal: string;
            }, "raw">;
        } & Omit<DotNestedCategories, "raw"> & {
            raw: Omit<DotNestedCategories, "raw">;
        }, "raw">;
    };
};
export {};