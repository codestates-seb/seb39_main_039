import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/img/close.svg';
import dogIcon from '../../assets/img/dog-detective.png';
import dogItemIcon from '../../assets/img/dog-detective-item.png';
import { useNavigate } from 'react-router-dom';

function ModalLink ( {isOpen, setIsOpen, confirmHandler} ) {
    const navigate = useNavigate();
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
                    <div className="icon-area">
                        <i className="swing"></i>
                    </div>
                    <b><strong>산책 시킬 강아지가 없습니다.</strong><br />강아지 등록을 먼저 진행해주세요!</b>
                </div>
            </div>
            <StyledModalFooter className="modal-footer">
                <button type="button" className="btn-modal con" onClick={()=>navigate('/DogAdd')}>강아지 등록하러 가기</button>
            </StyledModalFooter>
        </StyledModalCon>
    </StyledModal> : null}
    {/* <button onClick={openModalHandler}>모달 여닫기</button> */}
    </>
    )
}

export default ModalLink


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
        min-height:150px;
        b{display:block;margin-top:7px;font-size:18px;line-height:1.4em}
        strong{
          font-weight: 800;
        }
    }

    .icon-area{
        position: relative;
        display:inline-block;
        width:90px;
        height:103px;
        margin-top:-50px;
        background-image: url('${dogIcon}');
        background-size:100% auto;

        i{
            position: absolute;
            bottom:18px;
            left:-10px;
            display: inline-block;
            width:40px;
            height:68px;
            background-image: url('${dogItemIcon}');
            background-size:100% auto;
            background-repeat: no-repeat;
        }
    }
    .swing {
        animation: swing ease-in-out 1s infinite alternate;
        transform-origin: center -20px;
    }
    @keyframes swing {
        0% { transform: rotate(3deg); }
        100% { transform: rotate(-3deg); }
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
