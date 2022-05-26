import {FC, useCallback, useState} from "react";
import {Button, Modal} from 'antd';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/reduxType";
import {deleteJobThunk} from "../redux/thunk/job";

interface IProps {
    id: string
}

export const BtnEditDelete: FC<IProps> = ({id}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const editRedirect = useCallback(() => navigate(`/all-jobs/${id}/edit`), [])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = useCallback(() => setIsModalVisible(true), []);
    const handleCancel = useCallback(() => setIsModalVisible(false), []);

    const handleOk = () => {
        setIsModalVisible(false)
        dispatch(deleteJobThunk(id))
    };

    return (
        <>
            <Flex>
                <Button type='primary' onClick={editRedirect}>edit</Button>
                <Button onClick={showModal} danger>delete</Button>
            </Flex>
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText='YES'>
                <h2>Are you sure you want to delete?</h2>
            </Modal>
        </>
    )
}

const Flex = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 20px;
`
