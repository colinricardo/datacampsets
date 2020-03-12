import { WithRouterProps } from "next/dist/client/with-router";
import Link from "next/link";
import { withRouter } from "next/router";
import styled from "styled-components";
import { withApp } from "../context/AppContext";
import { datacampBlue, gray, white } from "../styles/colors";
import { flex } from "../styles/flex";
import { screenWidthBetween, Space, Spacer } from "../styles/responsive";
import { fontSizes } from "../styles/typography";
import { noSelect, padLR } from "../styles/utils";
import { initGA, logPageView } from "../utils/analytics";
import StyledLink from "./StyledLink";

import getConfig from "next/config";
import { useEffect } from "react";
import LogoImage from "./LogoImage";

const { publicRuntimeConfig = {} } = getConfig() || {};

// NOTE: we have to access directly or else Next can't read it properly.
const envType = publicRuntimeConfig.envType;

const SEMVER = "0.0.1";
const VERSION_STRING = `${envType}-${SEMVER}`;

const Background = styled.div<{ backgroundColor: string }>(
  ({ backgroundColor }) => ({
    background: backgroundColor,
  }),
);

const Container = styled.div({
  fontFamily: `Lato`,
  height: `100%`,
  width: `100%`,
});

const HeaderContainer = styled.div<{ headerBackgroundColor: string }>(
  ({ headerBackgroundColor }) => ({
    ...flex.flex,
    ...flex.spaceBetween,
    ...flex.centerRowY,
    height: `64px`,
    ...padLR(`24px`),
    ...noSelect(),
    fontFamily: `Lato`,
    borderBottom: `1px solid ${gray}`,
    background: headerBackgroundColor,
    color: "white",
    [screenWidthBetween("zero", "small")]: {
      ...padLR(`8px`),
    },
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    zIndex: 100,
  }),
);

const Brand = styled.div({
  fontSize: fontSizes.header2,
});

const HeaderLeft = styled.div({
  ...flex.flex,
  ...flex.centerRowY,
});

const HeaderRight = styled.div({
  textAlign: `right`,
});

const FooterContainer = styled.div<{ footerBackgroundColor: string }>(
  ({ footerBackgroundColor }) => ({
    ...flex.flex,
    ...flex.centerXY,
    width: "100%",
    height: `24px`,
    ...noSelect(),
    background: footerBackgroundColor,
    color: "white",
    position: "absolute",
    left: 0,
    bottom: 0,
  }),
);

const FooterBrand = styled.div({
  fontSize: fontSizes.normalText,
  fontFamily: `Lato`,
});

const LandingHeaderLinksContainer = styled.div({
  ...flex.flex,

  [screenWidthBetween(`zero`, `small`)]: {
    display: "none",
  },
});

const getTopRight = (pathname: string) => {
  switch (pathname) {
    case `/`:
      return (
        <LandingHeaderLinksContainer>
          {null}
        </LandingHeaderLinksContainer>
      );

    default:
      break;
  }

  return null;
};

interface HeaderProps {
  pathname: string;
  headerBackgroundColor: string;
  noHomeLink: boolean;
}

const Header = ({
  pathname,
  headerBackgroundColor,
  noHomeLink,
}: HeaderProps) => {
  let node;

  if (noHomeLink) {
    node = (
      <>
        <LogoImage src="/static/logo.png" height="48px" width="48px" />
        <Spacer w="b" />
        <Brand>
          <span style={{ marginRight: 8 }}>
            datacampsets
              </span>
        </Brand>
      </>
    );
  } else {
    node = (
      <>
        <Link prefetch passHref href="/home">
          <StyledLink>
            <LogoImage src="/static/logo.png" height="48px" width="48px" />
          </StyledLink>
        </Link>
        <Spacer w="b" />
        <Link prefetch passHref href="/">
          <StyledLink>
            <Brand>
              <span style={{ marginRight: 8 }}>
                datacampsets
              </span>
            </Brand>
          </StyledLink>
        </Link>
      </>
    );
  }

  return (
    <HeaderContainer headerBackgroundColor={headerBackgroundColor}>
      <HeaderLeft>{node}</HeaderLeft>
      <HeaderRight>{getTopRight(pathname)}</HeaderRight>
    </HeaderContainer>
  );
};

const Footer = ({ footerBackgroundColor }) => (
  <FooterContainer footerBackgroundColor={footerBackgroundColor}>
    <FooterBrand>
      Made by <StyledLink target="_blank" style={{ color: "white" }} href="https://github.com/colinricardo">Colin</StyledLink> from <StyledLink target="_blank" style={{ color: "white" }} href="https://codecubed.io">CodeCubed</StyledLink>
    </FooterBrand>
  </FooterContainer>
);

interface LayoutProps extends WithRouterProps {
  children: Element;
  pathname: string;
  backgroundColor?: string;
  headerBackgroundColor?: string;
  footerBackgroundColor?: string;
  noHomeLink?: boolean;
}

const Layout = ({
  children,
  pathname,
  headerBackgroundColor = datacampBlue,
  backgroundColor = white,
  footerBackgroundColor = datacampBlue,
  noHomeLink = false,
}: LayoutProps) => {
  useEffect(() => {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA();
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <>
      <Background backgroundColor={backgroundColor}>
        <Header
          pathname={pathname}
          headerBackgroundColor={headerBackgroundColor}
          noHomeLink={noHomeLink}
        />
        <Spacer h="f" />
        <Container>{children}</Container>
        <Spacer h="e" />
        <Footer
          footerBackgroundColor={footerBackgroundColor}
        />
      </Background>
    </>
  );
};

export default withRouter(withApp(Layout));
