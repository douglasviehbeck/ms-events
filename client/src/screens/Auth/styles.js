import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-shadow: 1px solid black;
  flex-flow: column;

  form {
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    flex-flow: column;
    width: 90%;
    max-width: 450px;
    margin: 10px;
  }

  strong {
    font-size: 36px;
  }

  button {
    padding: 10px;
    border-radius: 10px;
    font-size: 17px;
  }

  small {
    margin: 15px 0;
    font-size: 16px;
    align-self: ${props => (props.right ? "flex-end" : "center")};
    cursor: pointer;
  }

  input {
    padding-left: 10px;
    height: 50px;
    width: 350px;
    border-radius: 15px;
    margin: 15px 0;
    font-size: 20px;
    border: 2px solid #999;
  }

  @media (max-width: 600px) {
    height: auto;
    overflow: auto;
    flex-flow: column;
  }
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
