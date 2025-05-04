import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 400px);
  min-height: 100vh;
  background-color: #2d333b;
  user-select: none;
`;

export const Container = styled.div<{
  $paddingTop?: string | null;
  $zoom?: number;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 375px;
  height: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? $paddingTop : "80px")};
  transform: scale(${({ $zoom }) => $zoom});
  transform-origin: top center;
`;

export const ZoomButton = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 30px;
  right: 430px;
`;
