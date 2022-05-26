import {FC} from "react";
import {IMonthlyApplication} from "../../api/job/jobDto";
import {BarChart as BarCharts, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'


export const BarChart: FC<{ data: IMonthlyApplication[] }> = ({data}) => {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarCharts data={data} margin={{top: 50}}>
                <CartesianGrid strokeDasharray='3 3 '/>
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <Bar dataKey='count' fill='#FF9900' barSize={75}/>
            </BarCharts>
        </ResponsiveContainer>
    )
}