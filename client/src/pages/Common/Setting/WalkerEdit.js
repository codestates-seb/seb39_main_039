import styled from "styled-components";
import { HeaderConfirm } from "../../../components/Layout/Header";

const WalkerEdit = () => {
    const ClickHandler = () =>{
        console.log('수정 확인 함수');
    }

    return(
        <div className="container">
            <HeaderConfirm pageTitle={'알바 정보 수정'} ConfirmName={'완료'} ClickHandler={ClickHandler}/>
            <Form>
                <div className="ipt-group">
                    <label htmlFor="name" className="ipt-label">이름</label>
                    <input type="text" name="name" className="ipt-form" value={'이지은'} disabled />
                </div>
                <div className="ipt-group">
                    <label htmlFor="phone" className="ipt-label">휴대폰 번호</label>
                    <input type="number" name="phone" className="ipt-form" placeholder="연락처를 입력해주세요."/>
                </div>
                <div className="ipt-group">
                    <label htmlFor="" className="ipt-label">산책 가능 지역</label>
                    <select name="" id="" className="ipt-form" >
                        <option value="">서울 강동구</option>
                        <option value="">서울 강동구</option>
                        <option value="">서울 강동구</option>
                        <option value="">서울 강동구</option>
                    </select>
                </div>
                <div className="ipt-group">
                    <label htmlFor="" className="ipt-label">최대 산책 가능 거리</label>
                    <input type="text" name="" className="ipt-form" placeholder="산책 지역으로부터 최대 산책 거리"/>
                </div>
                <div className="ipt-group">
                    <label htmlFor="" className="ipt-label">경력사항</label>
                    <textarea name="" id="" className="ipt-form" placeholder="반려동물 관련 경력사항이 있다면 작성해주세요."></textarea>
                </div>
                <div className="ipt-group">
                    <label htmlFor="" className="ipt-label">소개글</label>
                    <textarea name="" id="" className="ipt-form" placeholder="상세 소개글을 작성해주세요."></textarea>
                </div>
            </Form>
        </div>
    )
}

export default  WalkerEdit 


const Form = styled.div`
    padding-top:15px;
`