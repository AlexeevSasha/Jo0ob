import {FC, memo, useState} from "react";
import {Typography, Button, Spin} from "antd";
import {BarChart} from "./BarChart";
import {AreaChart} from "./AreaChart";
import {useAppSelector} from "../../redux/reduxType";
import styled from "styled-components";

const {Title} = Typography

export const Chart: FC = memo(() => {
    const {statistics} = useAppSelector(state => state.jobs)
    const [toggleChart, setToggleChart] = useState(true)
    if (!statistics) return null;
    return (
        <Container>
            <Title level={4}>Monthly Applications</Title>
            <Button type="primary" ghost
                    onClick={() => setToggleChart(!toggleChart)}>{toggleChart ? 'AreaChart' : 'BarChart'}</Button>

            {toggleChart ? <BarChart data={statistics.monthly}/> : <AreaChart data={statistics.monthly}/>}
        </Container>
    )
})

const Container = styled.section`
  position: relative;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h4 {
    font-size: 30px;
    color: inherit;
  }
`

