import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  top: 0;
  right: 0;
  background-color: #fff;
  z-index: 99;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #e7e7ec;
`;

export const ComponentBox = styled.div`
  overflow-y: auto;

  /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const Menu = styled.div`
  position: absolute;
  right: 20px;

  padding: 10px;
  background-color: #fff;
  border: 1px solid #e7e7ec;
  border-radius: 8px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  gap: 5px;
  padding: 0 3px;
  cursor: pointer;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 7px 0;
  background-color: #e7e7ec;
`;
