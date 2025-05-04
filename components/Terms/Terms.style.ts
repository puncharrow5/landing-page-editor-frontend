import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 400px);
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const MobileBackdrop = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 375px;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const Modal = styled.div`
  position: relative;
  display: flex;
  width: 80%;
  height: 70%;
  padding: 40px 60px;
  background-color: #fff;
  overflow-y: auto;
`;

export const MobileModal = styled.div`
  position: relative;
  display: flex;
  width: 80%;
  height: 80%;
  padding: 20px 20px;
  background-color: #fff;
  overflow-y: auto;
`;

export const Terms = styled.div`
  h2 {
    margin-bottom: 5px;
    font-weight: bold;
  }
  p {
    font-size: 14px;
  }
`;
