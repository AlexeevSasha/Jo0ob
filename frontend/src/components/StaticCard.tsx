import styled from "styled-components";
import {Carousel} from 'antd';
import {CarryOutOutlined, HistoryOutlined, BugOutlined} from "@ant-design/icons";
import { useAppSelector} from "../redux/reduxType";
import {Stats} from "../api/job/jobDto";
import {useWindowDimensions} from "../hooks/useWindowDimensions";
import {memo} from "react";


const generateStatic = (stats: Stats) => {
    return [
        {
            title: 'Pending Applications',
            count: stats.pending,
            icon: <HistoryOutlined/>,
            color: '#039b46',
            id: 1
        },
        {
            title: 'Interviews Scheduled',
            count: stats.interview,
            icon: <CarryOutOutlined/>,
            color: '#6969cd',
            id: 2
        },
        {
            title: 'Jobs Declined',
            count: stats.declined,
            icon: <BugOutlined/>,
            color: '#c70fa8',
            id: 3
        }
    ]
}


export const StaticCard = memo(() => {
    const {statistics} = useAppSelector(state => state.jobs)
    const {width} = useWindowDimensions()
    if (!statistics) return null;
    return (
        < >
            {width >= 980 ? <CardGrid>
                {
                    generateStatic(statistics.stats).map(({title, color, count, icon, id}) => (
                        <Card colors={color} key={id}>
                            <Flex colors={color}>
                                <div>{count}</div>
                                {icon}
                            </Flex>
                            <p>{title}</p>
                        </Card>
                    ))
                }
            </CardGrid> : <Carousel>
                {
                    generateStatic(statistics.stats).map(({title, color, count, icon, id}) => (
                        <Card colors={color} key={id}>
                            <Flex colors={color}>
                                <div>{count}</div>
                                {icon}
                            </Flex>
                            <p>{title}</p>
                        </Card>
                    ))
                }
            </Carousel>
            }
        </>
    )
})


const CardGrid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;

  @media ${({theme}) => theme.media._980} {
    display: none;
  }

`

const Card = styled.div<{ colors: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
  width: 100%;
  height: 200px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 8px -4px rgba(34, 60, 80, 0.2);
  border-bottom: 6px solid ${({colors}) => colors};
  padding: 20px 40px 10px;

  & > p {
    margin: 0;
    font-size: 20px;
  }

  @media ${({theme}) => theme.media._980} {
    max-width: 100%;
    padding: 10px 30px;
    height: 170px;
  }
  @media (max-width: 365px) {
    & > p {
      font-size: 16px;
    }
  }


`

const Flex = styled.div<{ colors: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  & > div {
    font-size: 60px;
    color: ${({colors}) => colors};
  }

  & > span {
    font-size: 40px;
    position: relative;


    &:after {
      position: absolute;
      content: '';
      top: -20px;
      left: -20px;
      width: 200%;
      height: 80px;
      background: ${({colors}) => colors};
      opacity: .2;
    }
  }

  @media ${({theme}) => theme.media._980} {
    max-width: 100%;
  }
`