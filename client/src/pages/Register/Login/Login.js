import styled from "styled-components";
import { Link } from "react-router-dom";
import { HeaderClose } from "../../../components/Layout/Header";
import { ReactComponent as Logo } from '../../../assets/img/logo.svg';
import { ButtonPrimary } from '../../../components/Button/Buttons';
import { SnsButtonGoogle, SnsButtonKakao } from '../../../components/Button/SnsButtons';
import InputLabel from "../../../components/Inputs/InputLabel";

const Login = () => {
    return(
        <div className="container">
            <LoginPanel>
                <VisualArea>
                    <HeaderClose />
                    <Logo/>
                </VisualArea>
                <div>
                    <FormArea>
                        <InputLabel 
                            type={'text'} 
                            name={'userName'}
                            label={'이메일 계정'}
                            // err={'이메일 계정 혹은 패스워드가 틀립니다.'}
                        />
                        <InputLabel 
                            type={'password'} 
                            name={'userpassword'}
                            label={'패스워드'}
                            // err={'이메일 계정 혹은 패스워드가 틀립니다.'}
                        />
                        <ButtonPrimary>로그인</ButtonPrimary>
                        <small>회원이 아니신가요? <Link to="/signupTerms">회원가입</Link></small>
                    </FormArea>
                    <SnsButtonGroup>
                        <a href="https://server.albamung.tk/oauth2/authorization/google">
                            <SnsButtonGoogle>구글 계정으로 시작</SnsButtonGoogle>
                        </a>
                        <SnsButtonKakao>카카오톡으로 시작</SnsButtonKakao>
                    </SnsButtonGroup>
                </div>
            </LoginPanel>
        </div>
    )
}

export default Login;

const LoginPanel = styled.div`
    display: flex;
    min-height:100vh;
    padding-bottom:4vh;
    flex-direction: column;
    justify-content:space-between;
`

const VisualArea = styled.div`
    text-align: center;
`

const FormArea = styled.div`
    padding:20px 0;
    small{
        display: flex;
        justify-content: center;
        padding:8px 0 15px;
        font-size:14px;
        color:var(--gray-600);

        a{
            margin-left:4px;
            font-weight: 800;
            color:var(--primary);
        }
    }
    >*{
        margin-bottom:10px;
    }
`

const SnsButtonGroup = styled.div`
    border-top:1px solid var(--gray-200);
    padding:30px 0 0;
`