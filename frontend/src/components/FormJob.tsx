import {FC, memo} from "react";
import {Button, Form, Input, Select} from 'antd';
import styled from 'styled-components'
import {jobType, statusOption} from "../utils/selectOption";
import {IAddJob, IJobService, JobType, Status} from "../api/job/jobDto";
import {useAppSelector, STATUS} from "../redux/reduxType";


interface IProps {
    title: string;
    onFinish: (values: IAddJob<Status, JobType>) => void;
    defaultValue?: IJobService;
}

export const FormJob: FC<IProps> = memo(({title, onFinish, defaultValue}) => {
    const {status} = useAppSelector(state => state.jobs)
    return (
        <Wrapper>
            <h2>{title}</h2>
            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="on"
                layout="vertical"
            >

                <Form.Item
                    label="Position"
                    name="position"
                    initialValue={defaultValue?.position}
                    rules={[{required: true, message: 'Please input position!'}, {
                        max: 30,
                        message: 'Maximum 3 characters!'
                    }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Company"
                    name="company"
                    initialValue={defaultValue?.company}
                    rules={[{required: true, message: 'Please input company!'}, {
                        max: 30,
                        message: 'Maximum 3 characters!'
                    }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Location"
                    name="location"
                    initialValue={defaultValue?.location}
                    rules={[{min: 5, message: 'Minimum 5 characters!'}]}
                >
                    <Input/>
                </Form.Item>


                <Form.Item label="Status" name='status'
                           initialValue={defaultValue?.status ? defaultValue.status : statusOption[0].value}>
                    <Select>
                        {statusOption.map(({value, label}, idx) => (
                            <Select.Option key={idx} value={value}>{label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Type" name='type'
                           initialValue={defaultValue?.type ? defaultValue.type : jobType[0].value}>
                    <Select>
                        {jobType.map(({value, label}, idx) => (
                            <Select.Option key={idx} value={value}>{label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={status === STATUS.LOADING}>
                    Submit
                </Button>
            </Form>
        </Wrapper>
    )
})

const Wrapper = styled.div`
  //max-width: 1200px;
  width: 90%;
  margin: 30px auto 0;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);

  & > form > button {
    width: 100%;
  }

  & > h2 {
    position: relative;
    color: inherit;
    font-size: 50px;
    margin-bottom: 40px;

    &:after {
      position: absolute;
      content: '';
      width: 100%;
      bottom: 0;
      left: 0;
      height: 1px;
      background: rgb(0 0 0 / 19%);
    }
  }

  @media ${({theme}) => theme.media._768} {
    width: 100%;
    & > h2 {
      font-size: 40px;
    }
  }

`


