import {AreaChartOutlined, AppstoreAddOutlined, FundViewOutlined, UserOutlined} from "@ant-design/icons";
import {ReactElement} from "react";


interface ILinks {
    id: number;
    text: string;
    path: string;
    icon: ReactElement
}


export const links: ILinks[] = [
    {id: 1, text: 'Stats', path: '/stats', icon: <AreaChartOutlined/>},
    {id: 2, text: 'All jobs', path: '/all-jobs', icon: <FundViewOutlined/>},
    {id: 3, text: 'Add job', path: '/add-job', icon: <AppstoreAddOutlined/>},
    {id: 4, text: 'Profile', path: '/profile', icon: <UserOutlined/>},
]
