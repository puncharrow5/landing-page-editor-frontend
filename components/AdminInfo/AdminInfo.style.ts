import { BORDER, SLATE } from "@/styles/color";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px 0;
`;

export const BoxTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  background-color: ${SLATE};
  border-radius: 10px;
`;

export const BoxBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  padding: 40px;
  background-color: ${SLATE};
  border-radius: 10px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  margin-top: 10px;
  border: 1px solid ${BORDER};
  border-radius: 5px;
  cursor: pointer;
`;

export const Name = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

export const Domain = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: #6b7280;
`;

export const Description = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #495057;
  font-weight: bold;
`;

export const Date = styled.p`
  font-size: 12px;
  color: #6b7280;
`;
