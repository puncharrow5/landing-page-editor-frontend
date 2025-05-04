import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e7e7ec;
  cursor: pointer;
`;

export const SectionName = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-weight: bold;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #e7e7ec;
  font-size: 14px;
  cursor: default;
`;

export const Item = styled.div<{ $marginTop?: number }>`
  margin-top: ${({ $marginTop }) => $marginTop ?? 0}px;
  font-weight: bold;
  font-size: 18px;
`;

export const ComponentType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const AddButton = styled.div`
  display: flex;
  margin-top: 15px;
`;
