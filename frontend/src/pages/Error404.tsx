import {FC} from "react";
import {Link} from "react-router-dom";
import logo from '../assets/images/error.svg'
import {Typography} from 'antd';
import styled from 'styled-components'

const {Title, Paragraph} = Typography;

export const Error404: FC = () => {
    return (
        <Flex>
            <img src={logo} alt="error"/>
            <Title level={1}>Ohh! page not found</Title>
            <Paragraph>We can`t seem to find the page you`re looking for</Paragraph>
            <Link to='/stats'>back home</Link>
        </Flex>
    )
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  height: 100vh;
  padding: 20px;
  text-align: center;

  & > img {
    max-width: 500px;
    width: 100%;
    margin-bottom: 40px;
  }

  & > h1 {
    color: inherit;
    font-weight: 700;
    font-size: 50px;
  }

  @media ${({theme}) => theme.media._768} {
    & > h1 {
      font-size: 25px;
    }
  }
`
