import {FC} from "react";
import {Link} from "react-router-dom";
import {Button, Typography} from 'antd';
import styled from 'styled-components'

import logo from '../assets/images/logo-text.svg'
import mainImg from '../assets/images/main.svg'


const {Title, Paragraph, Text} = Typography;

export const Main: FC = () => {
    return (
        <Wrapper>
            <Container>
                <nav>
                    <ImgStyle src={logo} alt="Jo0ob"/>
                </nav>
                <Flex>
                    <TitleDiv>
                        <Title level={1}>Job <Text type='secondary'>Tracking</Text> app</Title>
                        <Paragraph>
                            Our job tracking app designed to work for teams with
                            unpredictable resources and schedules. Plus, the QuickBooks Time app uses minimal data and
                            battery life, so it’s reliable wherever the workday takes you. Track jobs and hours, and
                            schedule jobs, from anywhere.
                        </Paragraph>
                       <Button type="primary"> <Link to='login'>Login/Register</Link></Button>
                    </TitleDiv>
                    <ImgBigStyle><img src={mainImg} alt=""/></ImgBigStyle>
                </Flex>
            </Container>
        </Wrapper>
    )
}

const Container = styled.div`
  padding: 20px 20px 0;
  max-width: 1440px;
  height: 100vh;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  height: calc(100vh - 90px);

  @media ${({theme}) => theme.media._980} {
    justify-content: center;
  }
`

const TitleDiv = styled.div`
  flex-basis: auto;
  max-width: 500px;
  width: 100%;
  flex-shrink: 0;

  & > h1 {
    font-size: 50px;
    font-weight: 700;
    color: inherit;
  }

  & > div {
    margin-bottom: 40px;
  }

  @media ${({theme}) => theme.media._980} {
    & > button {
      width: 100%;
    }
  }
`

const ImgStyle = styled.img`
  cursor: pointer;
  max-width: 200px;
  width: 100%;
  height: 70px;
`


const ImgBigStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 700px;
    width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  @media ${({theme}) => theme.media._980} {
    display: none;
  }
`


