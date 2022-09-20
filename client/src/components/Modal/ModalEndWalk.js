import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/img/close.svg';
import { ReactComponent as Check } from '../../assets/img/checkicon-modal.svg';

function ModalEndWalk ( {isOpen, setIsOpen, confirmHandler} ) {
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
                    <b>산책을 종료하시겠습니까?</b>
                    <span>확인하세요!</span>
                    <p>
                    강아지는 돌려 받으셨나요?<br />
                    함께 건넨 강아지 용품들을 빠짐없이 받으셨나요?<br />
                    산책자에게 보수를 지불하셨나요?
                    </p>
                </div>
            </div>
            <StyledModalFooter className="modal-footer">
                <button type="button" className="btn-modal cta" onClick={confirmHandler}><Check /> 예, 종료합니다.</button>
            </StyledModalFooter>
        </StyledModalCon>
    </StyledModal> : null}
    {/* <button onClick={openModalHandler}>모달 여닫기</button> */}
    </>
    )
}

export default ModalEndWalk


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
        padding:50px 0 35px;
        b{display:block;padding-bottom:16px;font-size:20px;font-weight:600}
        span{
            display: inline-block;
            background:var(--gray-600);
            font-weight: 600;
            color:var(--gray-100);
            border-radius: 50px;
            font-size:13px;
            padding:7px 10px 5px;
            margin-bottom:4px;
        }
        p{
            font-size:14px;
            color:var(--gray-600);
            line-height: 1.4em;
        }
        
    }
`
const StyledModalFooter= styled.div`
    overflow: hidden;
    display:flex;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    button {border:0;font-size:20px;font-weight:500}
    .btn-modal.cta{
        background:var(--primary);
        color:var(--white-000);
        padding:22px 0;
        font-size:18px;
        font-weight: 600;

        svg{
            margin-right:2px;
        }
    }
    .btn-modal.cta:hover{background:var(--primary-active);color:var(--white-000)}
`
