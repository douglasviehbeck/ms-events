import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;

  > button {
    padding: 10px;
    font-size: 14px;
  }
`;
