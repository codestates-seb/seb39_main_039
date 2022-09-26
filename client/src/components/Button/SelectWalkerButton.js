import { useState } from "react";
import Modal from '../Modal/Modal'

const SelectWalkerButton = ({pickComment, isMtOpen, setIsMtOpen, text, btnText, cancel}) => {
    
    return(
        <>
        <Modal
            isOpen={isMtOpen}
            setIsOpen={setIsMtOpen}
            confirmHandler={pickComment}
            text={text}
         />

        <button className={`user-select ${cancel}`} onClick={() => setIsMtOpen(true)}>{btnText}</button>
        </>
    )
}

export default SelectWalkerButton