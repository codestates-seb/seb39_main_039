import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as IconBack } from '../../assets/img/hdIcon-back.svg';
import { ReactComponent as IconSearch } from '../../assets/img/hdIcon-search.svg';
import { ReactComponent as Close } from '../../assets/img/close.svg';

// 우측 아이콘도 사용할 경우 useRight 'on'
// <Header pageTitle={'로그인'} useRight="on"></Header>
export const Header = ({pageTitle, useRight}) => {
    return(
        <Conpanel>
            <div className="left-area">
                <Link to ="/"><IconBack /></Link>
            </div>
            <h2>{pageTitle}</h2>
        <div className={`right-area ${useRight}`}>
                <Link to ="/" className={useRight}><IconSearch/></Link>
            </div>
        </Conpanel>
    )
}

export const HeaderClose = ({pageTitle}) => {
    return(
        <Conpanel>
            <div className="left-area">
                <Link to ="/"></Link>
            </div>
            <h2>{pageTitle}</h2>
            <div className="right-area on">
                <Link to ="/"><Close/></Link>
            </div>
        </Conpanel>
    )
}

export const HeaderConfirm = ({pageTitle, useRight, ConfirmName, ClickHandler}) => {
    return(
        <Conpanel>
            <div className="left-area">
                <Link to ="/"><IconBack /></Link>
            </div>
            <h2 class="confirm">{pageTitle}</h2>
            <div className={`right-area on confirm`} onClick={ClickHandler}>
                {ConfirmName}
            </div>
        </Conpanel>
    )
}


const Conpanel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    padding:3px 0;
    font-size:18px;
    font-weight: 500;

    h2{
        flex:5;
        text-align: center;
    }
    h2.confirm{
        padding-left:10px;
    }
    .left-area, .right-area{
        flex:1;
    }

    .left-area{
        margin-left:-10px;
    }

    .right-area{
        text-align: right;
        margin-right: -10px;
        a {
            display: none;
        }
    }

    .right-area.on{
        a {
            display: block;
        }
    }

    .right-area.confirm{
        cursor: pointer;
        margin-right:0;
        padding:10px 0;
        color:var(--primary);
        font-weight: 600;
    }
`