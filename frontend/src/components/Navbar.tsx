import {FC, useCallback, useRef, useState} from "react"
import styled from "styled-components";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CaretDownOutlined,
    CaretUpOutlined
} from "@ant-design/icons";
import {Button} from "antd";
import useOutsideClick from "../hooks/useOutsideClose";
import {useAppDispatch, useAppSelector} from "../redux/reduxType";
import {logout} from "../redux/slices/auth";

interface IProps {
    visible: boolean;
    toggle: () => void;
}

export const Navbar: FC<IProps> = ({visible, toggle}) => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)
    const myRef = useRef(null)
    const [isLogout, setLogout] = useState(false);

    const toggleLogout = useCallback(() => setLogout(!isLogout), [isLogout])
    const closeLogout = useCallback(() => setLogout(false), [])

    useOutsideClick(myRef, closeLogout)

    const userLogout = useCallback(()  => dispatch(logout()), [])

    return (
        <Wrapper toggleMenu={visible}>
            <MenuBtn onClick={toggle}>{visible ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} </MenuBtn>
            <div style={{position: 'relative'}} ref={myRef} >
                <Button type="primary" onClick={toggleLogout}><UserOutlined/> {user?.name || 'Name'} {isLogout ? <CaretUpOutlined/> : <CaretDownOutlined/>}</Button>
                {isLogout && <BtnAbsolute type="primary" danger ghost onClick={userLogout}> Logout </BtnAbsolute>}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div<{ toggleMenu: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all .3s linear;
  left: ${({toggleMenu}) => toggleMenu ? 0 : '200px'};
  width: ${({toggleMenu}) => toggleMenu ? '100%' : 'calc(100% - 200px)'};
  background-color: white;
  height: 80px;
  box-shadow: 0 3px 0 #CECECE;
  z-index: 10;
  padding: 0 50px;
  
  @media ${({theme}) => theme.media._768} {
    left: 0;
    width: 100%;
    padding: 0 16px;
    height: 60px;
  }
`

const BtnAbsolute = styled(Button)`
  position: absolute;
  bottom: -55px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white !important;

  &:hover {
    background: white;
  }
`

const MenuBtn = styled.div`
  cursor: pointer;
  height: 35px;
  width: 35px;
  transition: all .1s linear;


  & > span > svg {
    width: 35px;
    height: 35px;
  }

  &:hover {
    transform: scale(0.9);
  }

  @media ${({theme}) => theme.media._768} {
    height: 25px;
    width: 25px;

    & > span > svg {
      height: 25px;
      width: 25px;
    }
  }
`