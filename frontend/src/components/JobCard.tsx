import {FC, useState} from "react";
import moment from "moment";
import {Avatar, Typography} from 'antd';
import styled from 'styled-components'
import {IJobService} from "../api/job/jobDto";
import {CalendarOutlined, EnvironmentOutlined} from "@ant-design/icons";
import {BtnEditDelete} from "./BtnEditDelete";
import {colors} from "../utils/colors-status";
import {useAppSelector} from "../redux/reduxType";

const {Title, Text} = Typography;

export const JobCard: FC<IJobService> = ({
                                             type,
                                             createdAt,
                                             position,
                                             createBy,
                                             id,
                                             status,
                                             company,
                                             location
                                         }) => {

    const {user} = useAppSelector(state => state.auth)
    return (
        <Wrapper>
            <JobHeader>
                <Avatar style={{backgroundColor: 'grey'}} shape="square" size={64}
                        icon={company.charAt(0).toUpperCase()}/>
                <div>
                    <Title level={4} style={{margin: 0, color: 'inherit'}}>{position}</Title>
                    <Text>{company}</Text>
                </div>
            </JobHeader>
            <JobBody>
                <ul>
                    <li>{type.charAt(0).toUpperCase() + type.slice(1)}</li>
                    <li><CalendarOutlined/> <Date>{moment(createdAt).format('D MMMM, YYYY')}</Date></li>
                    <li><Status colors={colors(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Status></li>
                    {location && <li><EnvironmentOutlined style={{marginRight: 10}}/>{location}</li>}
                </ul>
            </JobBody>
            {user?.id === createBy ? <BtnEditDelete id={id}/> : null}
        </Wrapper>
    )
}

const JobBody = styled.div`
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5dddd;

  & > ul {
    font-weight: 500;
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: grid;
    grid-template-columns: 110px 150px;
    gap: 10px 15px;
  }
`
const Date = styled.span`
  margin-left: 5px;
  font-weight: 600;
`

const Status = styled.div<{ colors: string }>`
  position: relative;
  color: ${({colors}) => colors};

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: -20px;
    height: 25px;
    width: calc(100% + 20px);
    background: ${({colors}) => colors};
    opacity: .1;
  }
`

const JobHeader = styled.div`
  position: relative;
  display: flex;
  gap: 30px;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5dddd;
`


const Wrapper = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
`