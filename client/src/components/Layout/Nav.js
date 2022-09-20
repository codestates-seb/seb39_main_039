import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    return(
        <FooterNav>
            <div>
                <Link to="/ownerMain" className="home-area active">
                    <i><FontAwesomeIcon icon={faHouse}/></i><p>홈</p>
                </Link>
            </div>
            <div>
                <Link to="/setting" className="setting-area">
                        <i><FontAwesomeIcon icon={faBars}/></i><p>전체</p>
                </Link>
            </div>
            
            <button type="button" className="nav-button">
                <Link to="/wantedList">
                    <FontAwesomeIcon icon={faPaw} />
                </Link>
            </button>
        </FooterNav>
    )
}

export default Nav

const FooterNav = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    bottom:0;
    right:0;
    left:0;
    width:100%;
    background:var(--white-000);
    z-index: 9;
    box-shadow: -7px 0 15px 0 rgba(0,0,0, .1);
    >div{
        width:110px;
        text-align: center;
    }
    
    .home-area, .setting-area{
        display: inline-block;
        padding:12px 25px 10px;
        color:var(--gray-300);

        svg{
            font-size:18px;
        }
        p{
            font-size:12px;
            color:var(--gray-500);
            margin-top:3px;
        }
    }

    a.active{
        color:var(--gray-800);
    }

    .nav-button{
        position:absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top:-16px;
        left:50%;
        width:135px;
        height:60px;
        border:6px solid var(--white-000);
        background: rgb(71,145,255);
        background: linear-gradient(140deg, rgba(71,145,255,1) 0%, rgba(37,208,219,1) 100%);
        border-radius: 100px;
        box-shadow: 0 0 7px 0 rgba(0,0,0, .14);
        animation-name: example;
        animation-duration: 4s;
        animation-iteration-count: 3;
        animation-timing-function: ease-in;
        transform: translate(-50%, 0);

        a{
            font-size:22px;
            color:var(--white-000);
        }
    }

    @keyframes example {
      0%   {border:6px solid var(--white-000)}
      25%  {border:8px solid var(--white-000)}
      50%  {border:5px solid var(--white-000)}
      75%  {border:7px solid var(--white-000)}
      100% {border:6px solid var(--white-000)}
   }

`