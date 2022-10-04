import styled from "styled-components"
import noticeIcon from '../../assets/img/dog-notice.png';
import dogHead from '../../assets/img/dog-head.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const CoachMarks = () => {
    const [isOn, setIsOn] = useState(true);

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        localStorage.setItem("coachCheck", false);
    },[])

    const skipHandler = () => {
        setIsOn(false)
        document.body.style.overflow = "unset";
        localStorage.setItem("coachCheck", true);
    }
        
    return(
        <Mark className={isOn ? '' : 'checked'} onClick={()=>skipHandler()}>
            <MainButton>
                <div className="icon-area">
                    <div className="item"><p>아래 버튼을 눌러서<br />산책을 기다리는<br />강아지를 만날 수 있어!</p></div>
                    <i className="item-i2"></i>
                </div>
                <button
                    type="button"
                    className="nav-button"
                >
                    <FontAwesomeIcon icon={faPaw} />
                </button>
            </MainButton>
        </Mark>
    )
}

export default CoachMarks

const Mark = styled.section`
    position: absolute;
    width:100vw;
    height:100vh;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0, .75);
    z-index: 999;
    cursor: pointer;

    &.checked{
        display:none;
    }
    .icon-area{
        position: absolute;
        text-align: center;
        left:0;
        bottom:80px;
        width:100vw;
        animation-name: fadeUp;
        animation-duration: 1s;
        animation-timing-function: ease-in;

        .item{
            position: relative;
            display: inline-block;
            text-align: center;
            color:var(--white-000);
            width:250px;
            height:135px;
            padding-top:35px;
            background-image:url('${noticeIcon}');
            background-size:100% auto;
            background-repeat: no-repeat;
            font-size:18px;
            font-weight: 600;
            line-height: 1.2em;
            z-index: 1;
        }

        .item-i2{
            position:absolute;
            left:50%;
            display: inline-block;
            width:110px;
            height:105px;
            background-image:url('${dogHead}');
            background-size:100% auto;
            background-repeat: no-repeat;
            transform: translate(-50%, -60%);
            animation-name: ani;
            animation-duration: 3s;
            animation-timing-function: ease-in;
            animation-iteration-count: infinite;
        }
    }

    .nav-button {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom:13px;
        left: 50%;
        width: 135px;
        height: 60px;
        border: 6px solid var(--white-000);
        background: rgb(51, 134, 255);
        background: linear-gradient(
        133deg,
        rgba(51, 134, 255, 1) 0%,
        rgba(101, 75, 255, 1) 100%
        );
        border-radius: 100px;
        box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.14);
        animation-name: example;
        animation-duration: 4s;
        animation-iteration-count: 3;
        animation-timing-function: ease-in;
        transform: translate(-50%, 0);
        font-size: 22px;
        color: var(--white-000);
    }

    @keyframes example {
        0% {
        border: 6px solid var(--white-000);
        }
        25% {
        border: 8px solid var(--white-000);
        }
        50% {
        border: 5px solid var(--white-000);
        }
        75% {
        border: 7px solid var(--white-000);
        }
        100% {
        border: 6px solid var(--white-000);
        }
    }

    @keyframes ani {
        0% {
            transform: translate(-50%, -60%);
        }
        50% {
            transform: translate(-50%, -70%);
        }
        100% {
            transform: translate(-50%, -60%);
        }
    }

    @keyframes fadeUp {
        0% {
            opacity: 0;
            transform: translate(0, -50px);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }
    }
`;


const MainButton = styled.div`

`