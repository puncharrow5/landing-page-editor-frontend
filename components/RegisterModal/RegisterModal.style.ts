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

export const Title = styled.h2<{ fontSize?: number }>`
  text-align: center;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  margin: 10px 0;
`;

export const Label = styled.label`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
`;

export const FirstStep = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const SecondStep = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border-width: 2px;
  border-radius: 10px;
`;

export const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  color: #fff;
  background-color: ${SUBMIT};
  border-radius: 10px;
`;

export const Input = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  border-width: 2px;
  border-radius: 10px;
`;
