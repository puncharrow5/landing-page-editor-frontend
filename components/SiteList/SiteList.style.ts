import { BORDER, SLATE } from "@/styles/color";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  background-color: ${SLATE};
  border-radius: 10px;
`;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid ${BORDER};
  border-radius: 5px;
  cursor: pointer;
`;

export const Name = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

export const Domain = styled.p`
  font-size: 14px;
  color: #6b7280;
`;
