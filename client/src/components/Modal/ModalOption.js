import React from 'react';
import styled from 'styled-components';
function ModalOption ( {isOpen, setIsOpen, uploadHandler, profileDeleteHandler} ) {
    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };

    return(
    <>
    {isOpen ? 
    <StyledModal className="modal" onClick={openModalHandler}>
        <StyledModalCon onClick={(e) => e.stopPropagation()}>
            <ul>
              <li onClick={profileDeleteHandler}>현재 사진 삭제</li>
              <li onClick={uploadHandler}>라이브러리에서 선택</li>
            </ul>
            <button>취소</button>
        </StyledModalCon>
    </StyledModal> : null}
    {/* <button onClick={openModalHandler}>모달 여닫기</button> */}
    </>
    )
}

export default ModalOption


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
