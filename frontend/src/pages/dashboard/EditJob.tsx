import {FC, useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/reduxType";
import {useNavigate, useParams} from "react-router-dom";
import {FormJob} from '../../components'
import {ArrowLeftOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {byIdJobThunk, editJobThunk} from "../../redux/thunk/job";
import {IAddJob, Status, JobType} from "../../api/job/jobDto";



export const EditJob: FC = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {job} = useAppSelector(state => state.jobs)
    const navigate = useNavigate()
    const back  = useCallback(() => navigate(-1), [])
    const submitHandler = (data : IAddJob<Status, JobType>) => {
        if (!id) return;
        dispatch(editJobThunk({ id, data, cb: back}))
    };
     useEffect(() => {
         if (!id) return;
         dispatch(byIdJobThunk(id))
     }, [id])
    return (
        <div>
            <Back> <div onClick={back}><ArrowLeftOutlined />back</div></Back>
            {job && <FormJob title='Edit Job' onFinish={submitHandler} defaultValue={job}/>}
        </div>
    )
}

export const Back = styled.div`
  width: 90%;
  margin: 20px auto 0;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 18px;
   & > div {
     cursor: pointer;
     & > span {
       margin-right: 10px;
     }
   }
  
  @media ${({theme}) => theme.media._768} {
    width: 100%;
    margin: 16px 0 0;
  }
`


