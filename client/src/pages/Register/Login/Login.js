import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HeaderClose } from "../../../components/Layout/Header";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import { ButtonPrimary } from "../../../components/Button/Buttons";
import {
  SnsButtonGoogle,
  SnsButtonKakao
} from "../../../components/Button/SnsButtons";
import InputLabel from "../../../components/Inputs/InputLabel";
import { useInput } from "../../../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/actions/loginActions";

const Login = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const err = useSelector((state) => state.login.err);

  const [state, setState] = useInput({
    email: "",
    password: ""
  });
  const { email, password } = state;
  const [errMessage, setErrMessage] = useState();
  console.log("err", err);
  const postLogin = () => {
    (async () => {
      await loginRequestHandler();
    })();
    if (isValidInput) {
      dispatch(loginSuccess(email, password));
      
      
      if (err === null) {
        setErrMessage(null);
      } else {
        setErrMessage(err);
      }
    }
  };

  const isValidInput = email.length > 0 && password.length > 0;
  const loginRequestHandler = () => {
    !isValidInput
      ? setErrMessage("이메일 계정과 패스워드를 모두 입력해주세요.")
      : setErrMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postLogin();
    }
  };

  return (
    <div className="container">
      <LoginPanel>
        <VisualArea>
          <HeaderClose />
          <Logo />
        </VisualArea>
        <div>
          <FormArea>
            <InputLabel
              type={"text"}
              name={"email"}
              label={"이메일 계정"}
              value={state.email}
              handlerValueState={setState}
              handleKeyPress={handleKeyPress}
              err={errMessage}
            />
            <InputLabel
              type={"password"}
              name={"password"}
              label={"패스워드"}
              value={state.password}
              handlerValueState={setState}
              handleKeyPress={handleKeyPress}
              err={errMessage}
            />
            <ButtonPrimary
              onClick={() => {
                postLogin();
                // navigate("/questions");
              }}
            >
              로그인
            </ButtonPrimary>
            <small>
              회원이 아니신가요? <Link to="/signupTerms">회원가입</Link>
            </small>
          </FormArea>
          <SnsButtonGroup>
            <a href="https://server.albamung.tk/oauth2/authorization/google">
              <SnsButtonGoogle>구글 계정으로 시작</SnsButtonGoogle>
            </a>
            <a href="https://server.albamung.tk/oauth2/authorization/kakao">
              <SnsButtonKakao>카카오톡으로 시작</SnsButtonKakao>
            </a>
          </SnsButtonGroup>
        </div>
      </LoginPanel>
    </div>
  );
};

export default Login;

const LoginPanel = styled.div`
  display: flex;
  min-height: 100vh;
  padding-bottom: 4vh;
  flex-direction: column;
  justify-content: space-between;
`;

const VisualArea = styled.div`
  text-align: center;
`;

const FormArea = styled.div`
  padding: 20px 0;
  small {
    display: flex;
    justify-content: center;
    padding: 8px 0 15px;
    font-size: 14px;
    color: var(--gray-600);

    a {
      margin-left: 4px;
      font-weight: 800;
      color: var(--primary);
    }
  }
  > * {
    margin-bottom: 10px;
  }
`;

const SnsButtonGroup = styled.div`
  border-top: 1px solid var(--gray-200);
  padding: 30px 0 0;
`;
