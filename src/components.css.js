import styled from "styled-components";

export const Container = styled.div`
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 100%;
`;
export const Board = styled.div`
  display: flex;
  width: fit-content;
  height:100%;
`;
export const Column = styled.div`
  width: 240px;
  background: #333;
  border: 0.1px #aaa solid;
  color: white;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
export const MovingLine = styled.div`
  z-index: 399;
  align-self: center;
  width: 1px;
  height: -webkit-fill-available;
  background: orange;
  position: absolute;
  margin-left: ${({ minutes }) =>
    `${((minutes.getMinutes() / 60) * 100).toFixed(1)}%`};
`;
export const ColumnHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
