import styled from "styled-components";

export const Container = styled.div<{ $paddingTop?: string | null }>`
  display: flex;
  flex-direction: column;
  width: calc(100% - 400px);
  padding-top: ${({ $paddingTop }) => ($paddingTop ? $paddingTop : "80px")};
  background-color: #fff;
`;
