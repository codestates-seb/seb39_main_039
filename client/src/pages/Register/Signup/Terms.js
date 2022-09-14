import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import { ButtonPrimary } from '../../../components/Button/Buttons';
import Checkbox from '../../../components/Inputs/Checkbox';
import Arrows from '../../../assets/img/arrows.svg';
import { Link } from "react-router-dom";

const Terms = () => {
    return(
        <div className="container">
             <ConPanel>
                <div>
                    <Header pageTitle={'이메일 회원가입'} />
                    <PageSummary>알바멍을 이용하시려면<br />약관동의가 필요합니다.</PageSummary>
                    
                    <FormArea>
                        <div className="allCheck">
                            <Checkbox text={'전체 약관 동의'}/>
                        </div>

                        <div className="check">
                            <Checkbox text={'알바멍 이용 약관 동의 (필수)'}/>
                            
                            <Link to="/"></Link>
                        </div>
                        <div className="check">
                            <Checkbox text={'개인정보 수집 이용 동의 (선택)'}/>
                            <Link to="/"></Link>
                        </div>
                    </FormArea>
                </div>
                <div>
                    <ButtonPrimary>다음</ButtonPrimary>
                </div>
             </ConPanel>
        </div>
    )
}

export default Terms;

const ConPanel = styled.div`
    display: flex;
    min-height:100vh;
    padding-bottom:4vh;
    flex-direction: column;
    justify-content:space-between;
`

const PageSummary = styled.h3`
    margin:25px 0 15px;
    font-size:20px;
    font-weight: 500;
    line-height: 1.4em;
`

const FormArea = styled.div`
    padding:20px 0;

    .allCheck{
        border-bottom:1px solid var(--gray-200);
        padding-bottom:17px;
        margin-bottom:17px;
        em{
            font-weight: 600;
        }
    }

    .check{
        position: relative;
        a{
            position: absolute;
            top:50%;
            right:0;
            transform: translate(0, -50%);
            display: inline-block;
            width:50px;
            height:27px;
            background-image:url('${Arrows}');
            background-repeat: no-repeat;
            background-position:80% 50%;
        }
    }

    .check+.check{
        margin-top:17px;
    }

`