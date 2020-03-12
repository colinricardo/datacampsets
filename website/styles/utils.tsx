/* eslint-disable no-bitwise */
import { StyleObject } from "../interfaces";

export const hexToRgb = (hex: string): string => {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
};

export const onActive = (styles: object) => ({
  "&:active": styles,
});

export const onHover = (styles: object) =>
  ({
    "&:hover": styles,
    "&:active": styles,
    "-webkit-tap-highlight-color": `rgba(0,0,0,0) !important` as any,
  } as any);

export const onFocus = (styles: object) => ({
  "&:focus": styles,
});

export const clickable = () => ({
  cursor: `pointer`,
});

export const clickableNoSelect = () => ({
  cursor: `pointer`,
  userSelect: `none !important` as any,
});

export const noSelect = () => ({
  userSelect: `none !important` as any,
});

export const ellipsis = () => ({
  overflowX: `hidden`,
  textOverflow: `ellipsis`,
  whiteSpace: `nowrap`,
});

export const padLR = (n: string) => ({
  paddingLeft: n,
  paddingRight: n,
});

export const marginLR = (n: string) => ({
  marginLeft: n,
  marginRight: n,
});

export const padding = (t: string, r: string, b: string, l: string) => ({
  padding: `${t} ${r} ${b} ${l}`,
});

export const margin = (t: string, r: string, b: string, l: string) => ({
  margin: `${t}px ${r}px ${b}px ${l}px`,
});

export const dropShadow = (color1: string, color2: string) => ({
  boxShadow: `0 3px 6px ${color1}, 0 3px 6px ${color2}`,
});

export const boxShadow = (
  color = "#000000",
  h = `2px`,
  v = `0px`,
  br = `6px`,
  sr = `6px`,
  o = `0.5`,
) => ({
  "box-shadow": `${h} ${v} ${br} ${sr} rgba(${color},${o})`,
});

/**
 * For example:
 *   when('disabled', {
 *     opacity: 0.5,
 *   }),
 */
export const when = (name: string, val: StyleObject) => (obj: StyleObject) => ({
  ...(obj[name] && val),
});

export const whenNot = (name: string, val: StyleObject) => (
  obj: StyleObject,
) => ({
  ...(!obj[name] && val),
});

export const noDrag = () => ({
  "webkit-user-drag": `none`,
  "-khtml-user-drag": `none`,
  "-moz-user-drag": `none`,
  "-o-user-drag": `none`,
  "user-drag": `none`,
});

// export const ifProp = (prop: boolean, obj: Function | object) => {
//   if (prop === true) {
//     if (isFunction(obj)) {
//       return obj();
//     }

//     return obj;
//   }
//   return {};
// };

// export const ifNotProp = (prop: boolean, obj: Function | object) => {
//   if (prop !== true) {
//     if (isFunction(obj)) {
//       return obj();
//     }

//     return obj;
//   }
//   return {};
// };
