import { useState } from "react";
import Modal from '../Modal/Modal'

const SelectWalkerButton = ({pickComment}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    return(
        <>
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            confirmHandler={pickComment}
            text={"이 지원자와 함께 산책을 보내시겠습니까?"}
         />

        <button className="user-select" onClick={() => setIsOpen(true)}>이 지원자와 함께 산책 보내기</button>
        </>
    )
}

export default SelectWalkerButton