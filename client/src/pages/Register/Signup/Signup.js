import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import { ButtonPrimary } from '../../../components/Button/Buttons';
import InputLabel from "../../../components/Inputs/InputLabel";
import { useInput } from "../../../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { JoinSuccess } from "../../../redux/actions/signupActions";


const SignUp = () => {
    const dispatch = useDispatch();
    const err = useSelector((state) => state.signup.err);
    const [usernameError, setUsernameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [state, setState] = useInput({
        email: '',
        nickName: '',
        password: '',
    });
    const { email, nickName, password } = state;

    const isValidInput = nickName.length >= 3;
    const isValidEmail = email.includes('@') && email.includes('.');
    const commonLetter = password.search(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{1,}$/);
    const isValidPassword = commonLetter === 0;
    const getIsActive = isValidEmail && isValidPassword && isValidEmail === true;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            postJoin();
        }
    };

    console.log(err);
    const handleButtomValid = () => {
        !isValidInput ? (setUsernameError('3자 이상 입력해주세요.')) : (setUsernameError())
        !isValidEmail ? (setEmailError('이메일 형식을 확인해주세요.')) : (setEmailError())
        !isValidPassword ? (setPasswordError('영문, 숫자, 특수문자를 2자리 이상 포함해주세요.')) : (setPasswordError())
        if(err.includes('사용중')){
            setUsernameError(err);
            setEmailError(err);
        }
    };

    const postJoin = () => {
        (async () => await handleButtomValid())();
        if(getIsActive){
            dispatch(
                JoinSuccess(
                email,
                nickName,
                password
              )
            )
        } 
     }
    

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
                            value={state.email}
                            handlerValueState={setState}
                            handleKeyPress={handleKeyPress}
                            handlerOnblur={handleButtomValid}
                            err={emailError} 
                        />

                        <InputLabel 
                            type={'text'} 
                            name={'nickName'}
                            label={'닉네임'}
                            value={state.nickName}
                            handlerValueState={setState}
                            handleKeyPress={handleKeyPress}
                            handlerOnblur={handleButtomValid}
                            err={usernameError} 
                        />

                        <InputLabel 
                            type={'password'} 
                            name={'password'}
                            label={'비밀번호 확인'}
                            value={state.password}
                            handlerValueState={setState}
                            handleKeyPress={handleButtomValid}
                            handlerOnblur={handleButtomValid}
                            err={passwordError} 
                        />
                    </FormArea>
                </div>
                <div>
                    <ButtonPrimary className={getIsActive ? '' : 'disabled'}
                        onClick={()=>postJoin()}
                    >회원가입</ButtonPrimary>
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