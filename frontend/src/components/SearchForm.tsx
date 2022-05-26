import {FC, useState} from "react";
import {Button, Select, Input, Typography, Form} from 'antd';
import styled from 'styled-components'
import {sortFilter, statusFilter, typeFilter} from "../utils/selectOption";
import {FilterOutlined} from "@ant-design/icons";
import {IFilter} from "../api/job/jobDto";
import {useAppDispatch} from "../redux/reduxType";
import {getAllJobThunk} from "../redux/thunk/job";

const {Search} = Input;
const {Title} = Typography

export const SearchForm: FC = () => {
    const [form] = Form.useForm();
    const clearForm = () => {
        form.resetFields()
        dispatch(getAllJobThunk({}))
    };
    const dispatch = useAppDispatch();
    const [visibleFilter, setVisibleForm] = useState(false)
    const toggleFilter = () => setVisibleForm(!visibleFilter)

    const onSearch = (search: string) => {
        dispatch(getAllJobThunk({search}))
    };
    const onFinishForm = (filter: IFilter) => {
        dispatch(getAllJobThunk({filter}))
    };
    return (
        <>
            <FlexWrapper>
                <Search style={{borderRadius: 5}} placeholder="Search..." allowClear
                        onSearch={onSearch}/>
                <Button onClick={toggleFilter} shape="circle" icon={<FilterOutlined/>}/>
            </FlexWrapper>
            {visibleFilter && <Wrapper>
                <Title level={4}>Filter</Title>
                <Form
                    form={form}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinishForm}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item label="Status" name='status' initialValue={statusFilter[0].value}>
                        <Select>
                            {statusFilter.map(({value, label}, idx) => <Select.Option key={idx}
                                                                                      value={value}>{label}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Type" name='type' initialValue={typeFilter[0].value}>
                        <Select>
                            {typeFilter.map(({value, label}, idx) => <Select.Option key={idx}
                                                                                    value={value}>{label}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Sort" name='sort' initialValue={sortFilter[0].value}>
                        <Select>
                            {sortFilter.map(({value, label}, idx) => <Select.Option key={idx}
                                                                                    value={value}>{label}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <FlexBtn>
                        <Button type="primary" htmlType="submit">Apply</Button>
                        <Button onClick={clearForm} danger htmlType="button">Clear</Button>
                    </FlexBtn>
                </Form>
            </Wrapper>
            }
        </>
    )
}


const FlexWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 50px;

  & > button {
    width: 44px;
    height: 40px;
  }

  @media ${({theme}) => theme.media._980} {
    gap: 20px;
  }
  @media ${({theme}) => theme.media._480} {
    & > button {
      width: 47px;
    }
  }
`

const FlexBtn = styled.div`
  display: flex;
  gap: 100px;

  & > button {
    width: 100%;
  }

  @media ${({theme}) => theme.media._980} {
    gap: 20px;
  }
`

const Wrapper = styled.div`
  margin-top: 15px;
  background: white;
  border-radius: 5px;
  padding: 5px 20px 10px;
  border: 1px solid #d9d9d9;

  & > h4 {
    position: relative;
    color: inherit;
    font-size: 30px;
    padding-bottom: 10px;

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
`