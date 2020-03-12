import styled from "styled-components";
import { black, error } from "./colors";
import { screenWidthBetween } from "./responsive";

export const fontSizes = {
  header1: `2.5rem`,
  header2: `2.125rem`,
  header3: `1.5rem`,
  largeText: `1.25rem`,
  largerNormalText: `1rem`,
  normalText: `0.875rem`,
  smallText: `0.75rem`,
};

export const fontStyles = {
  bold: {
    fontWeight: `bold`,
  },
};

export const HeaderText = styled.div({
  fontSize: fontSizes.header1,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.header2,
  },
});

export const CardHeaderText = styled.div({
  fontSize: fontSizes.header3,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.header3,
  },
});

export const Text = styled.div({
  fontSize: fontSizes.normalText,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.normalText,
  },
});

export const LargerThanNormalText = styled.div({
  fontSize: fontSizes.largerNormalText,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.largerNormalText,
  },
});

export const ErrorText = styled.div({
  fontSize: fontSizes.normalText,
  color: error,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.normalText,
  },
});

export const LargeText = styled.div({
  fontSize: fontSizes.largeText,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.largeText,
  },
});

export const LargerText = styled.div({
  fontSize: fontSizes.header3,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.header3,
  },
});

export const HugeText = styled.div({
  fontSize: fontSizes.header2,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.header2,
  },
});
