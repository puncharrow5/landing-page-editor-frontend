import styled from "styled-components";

export const Item = styled.div<{ $marginTop?: number }>`
  margin-top: ${({ $marginTop }) => $marginTop ?? 0}px;
  font-weight: bold;
  font-size: 18px;
`;

export const ItemBox = styled.div<{
  $alignItems?: "flex-start" | "center" | "flex-end";
  $marginTop?: number;
  $hasBorder?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: ${({ $alignItems }) => $alignItems ?? "center"};
  margin-top: ${({ $marginTop }) => $marginTop ?? 0}px;
  padding-bottom: ${({ $hasBorder }) => ($hasBorder ? 15 : null)}px;
  border-bottom: ${({ $hasBorder }) => ($hasBorder ? "1px solid #d4d4d4" : null)};
  gap: 20px;
`;

export const ComponentType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const SubmitButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

export const FontSetting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

export const Input = styled.input<{ width?: string; $textAlign?: "start" | "center" | "end" }>`
  display: flex;
  width: ${({ width }) => width ?? "100%"};
  padding: 3px 10px;
  border-radius: 5px;
  text-align: ${({ $textAlign }) => $textAlign ?? "start"};
`;

export const Select = styled.select<{ width?: string }>`
  display: flex;
  width: ${({ width }) => width ?? "100%"};
  padding: 3px 10px;
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

export const Textarea = styled.textarea<{ width?: string }>`
  display: flex;
  width: ${({ width }) => width ?? "100%"};
  min-height: 80px;
  padding: 3px 10px;
  border-radius: 5px;
  resize: none;
`;

export const BackgroundArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
`;
