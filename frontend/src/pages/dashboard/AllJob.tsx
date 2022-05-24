import {FC, useEffect} from "react";
import {Button, Typography} from 'antd';
import styled from 'styled-components'
import {SearchForm} from "../../components/SearchForm";
import {JobCard} from "../../components/JobCard";
import {useAppDispatch, useAppSelector} from "../../redux/reduxType";
import {getAllJobThunk} from "../../redux/thunk/job";


export const AllJob: FC = () => {
    const dispatch = useAppDispatch()
    const {jobs} = useAppSelector(state => state.jobs)
    useEffect(() => {
        dispatch(getAllJobThunk())
    }, [])
    return (
        <div>
            <SearchForm/>
            <Flex>
                {jobs.map(job => <JobCard
                    key={job.id}
                    id={job.id}
                    company={job.company}
                    position={job.position}
                    status={job.status}
                    createBy={job.createBy}
                    createdAt={job.createdAt}
                    type={job.type}
                    location={job.location}
                />)}
            </Flex>
        </div>
    )
}

const Flex = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 50px;
  
  @media ${({theme}) => theme.media._980} {
    grid-template-columns: 1fr;
  }
`