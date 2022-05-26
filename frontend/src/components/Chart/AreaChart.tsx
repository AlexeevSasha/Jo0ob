import {FC} from "react";
import {AreaChart as AreaCharts, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar} from 'recharts'
import {IMonthlyApplication} from "../../api/job/jobDto";

export const AreaChart: FC<{ data: IMonthlyApplication[] }> = ({data}) => {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <AreaCharts data={data} margin={{top: 50}}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <Area type='monotone' dataKey='count' stroke='#FF9900' fill='#FF9900'/>
            </AreaCharts>
        </ResponsiveContainer>
    )
}