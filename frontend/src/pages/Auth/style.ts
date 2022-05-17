import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px 20px 0;
`

export const Container = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  padding: 30px 30px 10px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(112, 78, 11, 0.2);

  
  & > h2 {
    text-align: center;
    color: inherit;
  }
  
  & > form > button {
    margin: 10px 0 20px;
    width: 100%;
  }
  
  &:before {
    position: absolute;
    content: '';
    height: 5px;
    width: 100%;
    background: ${({theme}) => theme.colors.orange};
    top: 0;
    left: 0;
    border-radius: 5px 5px 0 0;
  }
`

export const Back = styled.div`
  display:flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
   & > div {
     cursor: pointer;
     & > span {
       margin-right: 10px;
     }
   }
`
