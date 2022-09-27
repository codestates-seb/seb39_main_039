import styled from "styled-components"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContactInfo } from "../../redux/actions/commentActions";
import ModalContact from "../Modal/ModalContact";

const GetContactButton = ({wantedId, commentId, walker, photo}) => {
    const dispatch = useDispatch();
    const [ isOpen, setIsOpen ] = useState(false);
    const { contactInfo } = useSelector((state)=>state.comment.contactInfo);
    
    const getContactModal = () => {
        dispatch(getContactInfo(wantedId, commentId));
        setIsOpen(true)
    };

    const confirmHandler = () => {
        setIsOpen(false)
    }

    return(
        <>
            <ModalContact
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                confirmHandler={confirmHandler}
                walker={walker}
                photo={photo}
                text={`${contactInfo}`}
            />
            <Button onClick={getContactModal}>휴대폰번호 보기</Button>
        </>
    )
}

export default GetContactButton


const Button = styled.button`
    background:var(--gray-100);
    border:1px solid var(--gray-200);
    color:var(--gray-700);
    border-radius:5px;
    margin-top:2px;
    padding:3px 6px;
    font-size:12px;
`