import {FC, useEffect} from "react";
import {StaticCard, Chart} from "../../components";
import {staticAllJobThunk} from "../../redux/thunk/job";
import {useAppDispatch} from "../../redux/reduxType";


export const Statistics: FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log(1)
        dispatch(staticAllJobThunk())
    }, [])
    return (
        <div>
            <StaticCard/>
            <Chart/>
        </div>
    )
}


