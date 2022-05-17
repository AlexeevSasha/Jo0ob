import {FC, useCallback} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, Input, Button, Typography} from 'antd';
import {ArrowLeftOutlined} from "@ant-design/icons";
import { Wrapper, Back, Container} from './style';
import styled from 'styled-components';
import {loginThunk} from "../../redux/thunk/auth";
import {ILogin} from "../../api/auth/authDto";
import {useAppDispatch} from "../../redux/reduxType";




const {Title, Paragraph, Text} = Typography;


export const Login: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const back  = useCallback(() => navigate('/'), [])
    const redirect  = useCallback(() => navigate('/dashboard'), [])

    const onFinish = (values: ILogin) => {
        const {email, password} = values
         dispatch(loginThunk({data: {email, password}, cb: redirect}))
    };

    return (
        <Wrapper>
            <Container>
                <Back> <div onClick={back}><ArrowLeftOutlined />back home</div></Back>
                <Title level={2}>Login</Title>
                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
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

                    <Button type="primary" htmlType="submit" loading={false}>
                        Submit
                    </Button>
                </Form>
                <ParagraphStyle>No a member yet? <Link to='/register'><Text type='secondary'>Register</Text></Link></ParagraphStyle>
            </Container>
        </Wrapper>
    )
}

const ParagraphStyle = styled(Paragraph)`
  text-align: center;
`
