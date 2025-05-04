import styled from "styled-components";
import { SUBMIT } from "@/styles/color";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

export const Label = styled.label`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
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

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  background-color: ${SUBMIT};
  border-radius: 10px;
`;
