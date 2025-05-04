import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #e7e7ec;
`;

export const Select = styled.select`
  display: flex;
  width: 70px;
  padding: 3px 10px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #e7e7ec;
  border-radius: 5px;
`;

export const Input = styled.input`
  display: flex;
  width: 280px;
  padding: 3px 10px;
  border: 1px solid #e7e7ec;
  border-radius: 5px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
  font-size: 14px;
`;
