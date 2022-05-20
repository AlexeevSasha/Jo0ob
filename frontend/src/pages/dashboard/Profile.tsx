import {FC} from "react";
import {Button, Form, Input} from 'antd';
import styled from 'styled-components'
import {useAppDispatch, useAppSelector} from "../../redux/reduxType";
import {IUpdateUser} from "../../api/auth/authDto";
import {updateUserThunk} from "../../redux/thunk/auth";



export const Profile: FC = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth)
    const onFinish = (values: IUpdateUser) => {
        const {email, name, lastName, location} = values;
        if (email === user?.email && name === user?.name && lastName === user?.lastName && location === user?.location  ) return;
        dispatch(updateUserThunk(values))
    };
    return (
        <Wrapper>
            <h2>Profile</h2>
            <Form
                name="basic"
                initialValues={{...user, remember: true}}
                onFinish={onFinish}
                autoComplete="on"
                layout="vertical"
            >
                <Flex>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{min: 3, message: 'Minimum 3 characters!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[{min: 3, message: 'Minimum 3 characters!'}]}
                >
                    <Input/>
                </Form.Item>
                </Flex>

                <Flex>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {type: 'email', message: 'The input is not valid E-mail!'},
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Location"
                    name="location"
                    rules={[{min: 5, message: 'Minimum 5 characters!'}]}
                >

                    <Input/>
                </Form.Item>
                </Flex>

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Wrapper>
    )
}

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

const Flex = styled.div`
  display: flex;
  gap: 50px;
  
  & > div {
    width: 100%;
  }
  
  @media ${({theme}) => theme.media._768} {
    flex-direction: column;
    gap: 0;
  }
`

