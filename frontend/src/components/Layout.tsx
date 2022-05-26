import {FC, useCallback, useState} from 'react'
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import {Navbar, Sidebar} from "./";


export const Layout: FC = () => {
    const [visible, setVisible] = useState(false)
    const toggle = useCallback(() => setVisible(!visible), [visible])
    const closeNav = useCallback(() => setVisible(true), [])
    return (
        <div>
            <Navbar visible={visible} toggle={toggle}/>
            <Sidebar visible={visible} closeNav={closeNav}/>
            <ContainerOutlet pd={visible}>
                <Outlet/>
            </ContainerOutlet>
        </div>
    );
}


const ContainerOutlet = styled.main<{ pd: boolean }>`
  padding: ${({pd}) => pd ? '80px 50px 0 50px' : '80px 50px 0 250px'};
  transition: all .3s linear;
  @media ${({theme}) => theme.media._768} {
    padding: 60px 16px 0;
  }
`

