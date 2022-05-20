import {FC} from "react"
import styled from "styled-components";
import logo from '../assets/images/logo-text.svg'
import {NavLinks} from './'

interface IProps {
    visible: boolean;
    closeNav: () => void;
}

export const Sidebar: FC<IProps> = ({visible, closeNav}) => {
    return (
        <>
            <Wrapper toggleMenu={visible}>
                <img src={logo} alt=""/>
                <NavLinks closeNav={closeNav}/>
            </Wrapper>
            <Absolut toggleMenu={visible} onClick={closeNav}/>
        </>
    )
}

const Wrapper = styled.div<{ toggleMenu: boolean }>`
  position: fixed;
  transition: all .3s linear;
  transform: ${({toggleMenu}) => toggleMenu ? 'translateX(-110%)' : 'translateX(0)'};
  width: 200px;
  background-color: white;
  height: 100vh;
  box-shadow: 3px 0 0 #CECECE;
  z-index: 9;
  padding: 0 25px;

  & > img {
    width: 130px;
    margin-top: 17px;
  }

  & > nav {
    padding-top: 50px;
  }

  @media ${({theme}) => theme.media._768} {
    width: 50%;
    margin-top: 60px;
    padding: 20px 10px 0;
    height: calc(100vh - 60px);

    & > nav {
      padding-top: 25px;
    }
  }
  @media (max-width: 300px) {
    & > img {
      width: 100px;
      margin-top: 17px;
    }

    & > nav > a {
      font-size: 16px;
    }
  }
`
const Absolut = styled.div<{ toggleMenu: boolean }>`
  position: fixed;
  display: none;
  background: #000;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
  opacity: .4;

  @media ${({theme}) => theme.media._768} {
    display: ${({toggleMenu}) => toggleMenu ? 'none' : 'block'};
  }
`

