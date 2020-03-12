import styled from "styled-components";
import { datacampBlue, white } from "../styles/colors";
import { clickable, onHover } from "../styles/utils";

const StyledLink = styled.a({
  color: `inherit`,
  textDecoration: `none`,
  ...clickable(),
  ...onHover({
    color: white,
    textDecoration: `underline`,
  }),
});

export default StyledLink;
