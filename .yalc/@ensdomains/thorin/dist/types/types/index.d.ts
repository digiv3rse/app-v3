import * as React from 'react';
import { Hue as TokenHue, Mode as TokenMode, Tokens } from '../tokens';
export type AllOrNone<T> = T | {
    [K in keyof T]?: never;
};
export type { Color, ColorStyle, WithColor, WithColorStyle, } from './withColorOrColorStyle';
export type { FontVariant, WithTypography } from './withTypography';
export type ReactNodeNoStrings = React.ReactElement | React.ReactNode[] | boolean | null | undefined;
export type EmptyObject = {
    [k: string]: unknown;
};
export type Accent = TokenHue | 'foreground';
export type Mode = TokenMode;
export type DefaultTheme = Tokens;
export type Size = 'small' | 'medium' | 'extraSmall' | undefined;
export type OptionalTitle = AllOrNone<{
    title: string;
    titleId: string;
}>;
export type IconProps = React.SVGProps<SVGSVGElement> & OptionalTitle;
export type Alert = 'error' | 'warning' | 'info';
export type WithAlert = {
    alert?: Alert;
};
export type Icon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
export type WithIcon = {
    /** An svg to be used by the component */
    icon?: React.ReactNode;
};
export type Neverable<TNever, TOmit> = {
    [P in keyof Omit<TNever, keyof TOmit>]?: never;
};