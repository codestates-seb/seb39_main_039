import styled from "styled-components"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContactInfo } from "../../redux/actions/commentActions";
import { tr } from "date-fns/locale";

const GetContactButton = ({wantedId, commentId}) => {
    const dispatch = useDispatch();
    const { contactInfo } = useSelector((state)=>state.comment.contactInfo);
    const [ contact, setContact ] = useState('휴대폰 번호 보기');
    const [ contactOn, setContactOn ] = useState(false);

    const getContactModal = () => {
        dispatch(getContactInfo(wantedId, commentId));
        setContact(contactInfo)
        setContactOn(true)
    };

    console.log(contact);
    return(
        <>
            {/* <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                confirmHandler={confirmHandler}
                text={`${contactInfo}`}
            /> */}
            <Button className={contactOn ? 'on' : ''}onClick={getContactModal}>{contact}</Button>
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

    &.on{
        background:var(--primary);
        color:var(--white-000);
        font-weight: 600;
        border:0;
    }
`