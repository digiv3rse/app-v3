type FontDetail = {
    size: string;
    lineHeight: string;
    weight: string;
};
declare const fontDetails: {
    extraLargeBold: FontDetail;
    largeBold: FontDetail;
    bodyBold: FontDetail;
    smallBold: FontDetail;
    extraSmallBold: FontDetail;
    headingOne: FontDetail;
    headingTwo: FontDetail;
    headingThree: FontDetail;
    headingFour: FontDetail;
    extraLarge: FontDetail;
    large: FontDetail;
    body: FontDetail;
    small: FontDetail;
    extraSmall: FontDetail;
    label: FontDetail;
    labelHeading: FontDetail;
};
export type FontVariant = keyof typeof fontDetails;
export declare const getFontSize: (fontVariant: FontVariant) => string;
export declare const getLineHeight: (fontVariant: FontVariant) => string;
export declare const getFontWeight: (fontVariant: FontVariant) => string;
export type WithTypography = {
    fontVariant?: FontVariant;
};
export {};