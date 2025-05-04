import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e7e7ec;
  cursor: pointer;
`;

export const Item = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

export const SectionName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-weight: bold;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #e7e7ec;
  font-size: 14px;
  gap: 10px;
  cursor: default;
`;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 10px;
`;

export const FontSetting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

export const Input = styled.input<{ width?: string }>`
  display: flex;
  width: ${({ width }) => width ?? "100%"};
  padding: 3px;
  border-radius: 5px;
  text-align: center;
`;

export const FileInput = styled.input<{ width?: string }>`
  display: flex;
  width: ${({ width }) => width ?? "100%"};
  padding: 3px 10px;
  border-radius: 5px;
  text-align: start;
  cursor: pointer;
  outline: none;
`;
