import { SUBMIT } from "@/styles/color";
import styled from "styled-components";

export const Backdrop = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  padding: 40px;
  gap: 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

export const Label = styled.label`
  font-size: 18px;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  background-color: ${SUBMIT};
  border-radius: 10px;
`;
