import {FC, } from "react"
import styled from "styled-components";
import {links} from "../hooks/links";
import {NavLink} from "react-router-dom";
import {useWindowDimensions} from "../hooks/useWindowDimensions";


interface IProps {
    closeNav: () => void;
}


export const NavLinks: FC<IProps> = ({closeNav}) => {
    const {width } = useWindowDimensions();
    return (
        <NavMenu>
            {links.map(link => (
                <NavLinkStyle
                    key={link.id}
                    to={link.path}
                    active='active'
                    onClick={width >= 769 ? () => null: closeNav}
                >{link.icon} {link.text}</NavLinkStyle>
            ))}
        </NavMenu>
    )
}
const NavLinkStyle = styled(NavLink)<{ active: string }>`
  &.${props => props.active} {
      font-weight: bold;
    color: ${({theme}) => theme.colors.orange};
`

const NavMenu = styled.nav`
    display: flex;
    flex-direction: column;
  & > a {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    transition: all .2s linear;
    & > span {
      margin-right: 10px;
    }

    &:hover {
       background: #fffbf6;
      transform: scale(1.1);
    }
  }
  
  
`
