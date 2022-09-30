import React from 'react';
import styled from 'styled-components';
function ModalOption ( {isOpen, setIsOpen, uploadHandler, profileDeleteHandler, openModalHandler} ) {
    

    return(
    <>
    {isOpen ? 
    <StyledModal className="modal" onClick={openModalHandler}>
        <StyledModalCon onClick={(e) => e.stopPropagation()}>
            <div className="con">
              <ul>
                <li onClick={profileDeleteHandler}>현재 사진 삭제</li>
                <li onClick={uploadHandler}>라이브러리에서 선택</li>
              </ul>
            </div>
            <button onClick={openModalHandler}>취소</button>
        </StyledModalCon>
        
    </StyledModal> : null}
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
    width:80%;
    
    .con{
      overflow: hidden;
      width: 100%;
      margin:0 auto;
      text-align: center;
      background:var(--white-000);
      box-shadow: 5px 5px 20px 0 rgba(0,0,0, .3);
      border-radius:15px;
    }
    
    * {
    flex: 1 0;
    }
    li{
      padding:23px 0;
      cursor: pointer;
    }
    li+li{
      border-top:1px solid var(--gray-200)
    }

    li:hover{
      background-color: var(--gray-050);
      color:var(--primary);
      font-weight: 600;
    }

    button{
      margin-top:13px;
      font-size:16px;
      background:var(--white-000);
      padding:17px 0;
      border-radius: 15px;
      border:0;
      opacity: .8;
    }
    button:hover{
      opacity: 1;
    }
`
