import {FC} from "react";
import {useAppDispatch} from "../../redux/reduxType";
import {IAddJob, JobType, Status} from "../../api/job/jobDto";
import {addJobThunk} from "../../redux/thunk/job";
import {useNavigate} from "react-router-dom";
import {FormJob} from '../../components'


export const AddJob: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const submitHandler = (values: IAddJob<Status, JobType>) => {
        dispatch(addJobThunk({
            data: {
                ...values,
                status: values.status,
                type: values.type
            },
            cb: () => navigate('/all-jobs')
        }))
    };
    return <FormJob title='Add Job' onFinish={submitHandler}/>
}


