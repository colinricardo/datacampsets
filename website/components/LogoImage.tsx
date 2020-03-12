import styled from "styled-components";

const LogoImage = styled.img(({ height, width }) => ({
  height: height || `64px`,
  width: width || "64px",
}));

export default LogoImage;
