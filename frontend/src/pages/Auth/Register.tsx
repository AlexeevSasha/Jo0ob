import {FC, useCallback, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, Input, Button, Typography} from 'antd';
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Wrapper, Back, Container} from './style'
import styled from 'styled-components'
import {registerThunk} from '../../redux/thunk/auth'
import {IRegister} from "../../api/auth/authDto";
import {useAppDispatch, useAppSelector} from "../../redux/reduxType";
import {STATUS} from "../../redux/reduxType";


const {Title, Paragraph, Text} = Typography;

interface IForm extends IRegister {
    confirm: string
}

export const Register: FC = () => {
    const dispatch = useAppDispatch()
    const {status, user} = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const back = useCallback(() => navigate(-1), []);
    const redirect = useCallback(() => navigate('/dashboard'), []);


    const onFinish = (values: IForm) => {
        const {name, email, password, lastName} = values
        dispatch(registerThunk({
                data: {name, email, password, lastName},
                cb: redirect
            }))
    };

    return (
        <Wrapper>
            <Container>
                <Back>
                    <div onClick={back}><ArrowLeftOutlined/>back</div>
                </Back>
                <Title level={2}>Register</Title>
                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {required: true, message: 'Please input your name!'},
                            {min: 3, message: 'Minimum 3 characters!'},
                            {max: 20, message: 'Maximum 20 characters!'}
                        ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Last name"
                        name="lastName">
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {required: true, message: 'Please input your email!'},
                            {type: 'email', message: 'The input is not valid E-mail!'},
                        ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {required: true, message: 'Please input your password!'},
                            {min: 5, message: 'Minimum 5 characters!'}
                        ]}>
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[{required: true, message: 'Please confirm your password!',},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={status === STATUS.LOADING}>
                        Submit
                    </Button>
                </Form>
                <ParagraphStyle>Have an account? <Link to='/login'><Text
                    type='secondary'>Login</Text></Link></ParagraphStyle>
            </Container>
        </Wrapper>
    )
}

const ParagraphStyle = styled(Paragraph)`
  text-align: center;
`
