import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import { ButtonPrimary } from '../../../components/Button/Buttons';
import InputLabel from "../../../components/Inputs/InputLabel";

const SignUp = () => {
    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
      });
    // const { email, passwordConfirm, passwordReConfirm } = inputValue;

    const handleInput = e => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue, 
            [name]: value,
        });
    };

    // 모든 검사 true일 때 함수 작동
    const getIsActive = true;

    return(
        <div className="container">
            <SignupPanel>
                <div>
                    <Header pageTitle={'이메일 회원가입'} />
                    <FormArea>
                        <InputLabel 
                            type={'text'} 
                            name={'email'}
                            label={'이메일 계정'}
                            handlerValueState={handleInput}
                            // handleKeyPress={handleKeyPress}
                            // err={'에러메시지'}
                        />

                        <InputLabel 
                            type={'password'} 
                            name={'password'}
                            label={'비밀번호 확인'}
                            handlerValueState={handleInput}
                            // handleKeyPress={handleKeyPress}
                            // err={'에러메시지'}
                        />

                        <InputLabel 
                            type={'password'} 
                            name={'passwordConfirm'}
                            label={'비밀번호 재입력'}
                            handlerValueState={handleInput}
                            // handleKeyPress={handleKeyPress}
                            err={'비밀번호가 일치하지 않습니다.'}
                        />
                    </FormArea>
                </div>
                <div>
                    <ButtonPrimary disabled ={ getIsActive && 'disabled' }>회원가입</ButtonPrimary>
                </div>
            </SignupPanel>
        </div>
    )
}


export default SignUp;

const SignupPanel = styled.div`
    display: flex;
    min-height:100vh;
    padding-bottom:4vh;
    flex-direction: column;
    justify-content:space-between;
`

const FormArea = styled.div`
    padding:20px 0;

    >*{
        margin-bottom:25px;
    }
`