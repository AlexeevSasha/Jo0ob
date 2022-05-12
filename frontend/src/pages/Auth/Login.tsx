import {FC, useCallback} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, Input, Button, Typography} from 'antd';
import {ArrowLeftOutlined} from "@ant-design/icons";
import { Wrapper, Back, Container} from './style'
import styled from 'styled-components'



const {Title, Paragraph, Text} = Typography;

interface IForm  {
    email: string;
    password: string
}

export const Login: FC = () => {
    const navigate = useNavigate()
    const back  = useCallback(() => navigate(-1), [])

    const onFinish = (values: IForm) => {
        console.log('Success:', values);
    };

    return (
        <Wrapper>
            <Container>
                <Back> <div onClick={back}><ArrowLeftOutlined />back</div></Back>
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
