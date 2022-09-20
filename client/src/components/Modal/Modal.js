import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/img/close.svg';
function Modal ( {isOpen, setIsOpen, text, confirmHandler} ) {
    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };

    return(
    <>
    {isOpen ? 
    <StyledModal className="modal" onClick={openModalHandler}>
        <StyledModalCon onClick={(e) => e.stopPropagation()}>
            <button type="button" className="btn-modal-cls" onClick={openModalHandler}><Close/></button>
            <div className="modal-body">
                <div>
                    <b>{text}</b>
                </div>
            </div>
            <StyledModalFooter className="modal-footer">
                <button type="button" className="btn-modal" onClick={openModalHandler}>취소</button>
                <button type="button" className="btn-modal con" onClick={confirmHandler}>확인</button>
            </StyledModalFooter>
        </StyledModalCon>
    </StyledModal> : null}
    {/* <button onClick={openModalHandler}>모달 여닫기</button> */}
    </>
    )
}

export default Modal


const StyledModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position:fixed;
    width:100%;
    height:100vh;
    top:0;right:0;bottom:0;left:0;
    background:rgba(0,0,0, .75);
    z-index: 99;
`

const StyledModalCon= styled.div`
    position:relative;
    display: flex;
    flex-direction:column;
    width: 80%;
    margin:0 auto;
    text-align: center;
    background:var(--white-000);
    box-shadow: 5px 5px 20px 0 rgba(0,0,0, .3);
    border-radius:25px;
    * {
    flex: 1 0;
    }
    .btn-modal-cls{
        position:absolute;
        top:10px;
        right:10px;
        display: inline-block;
        background:none;
        border:0
    }
    .modal-body{
        display: flex;
        align-items: center;
        min-height:150px;
        b{display:block;margin-top:13px;font-size:18px;font-weight:600}
    }
`
const StyledModalFooter= styled.div`
    overflow: hidden;
    display:flex;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    button {border:0;font-size:20px;font-weight:500}
    .btn-modal{
        background:var(--white-000);
        border-top:1px solid var(--gray-200);
        color:var(--gray-400);
        padding:20px 0;
        font-size:16px;

        svg{
            margin-right:2px;
        }
    }
    .btn-modal.con{
        color:var(--primary);
    }
`
