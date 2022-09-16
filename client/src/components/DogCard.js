import styled from "styled-components"
import { Link } from "react-router-dom";
import sexIconMale from '../assets/img/sexIcon-male.svg';
import sexIconFemale from '../assets/img/sexIcon-female.svg';
import anonymousDog from '../assets/img/anonymousDog.svg';
import Arrows from '../assets/img/arrows.svg';
import ArrowsWh from '../assets/img/arrows-wh.svg';
import { ButtonPrimaryXS } from "./Button/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';

export const DogCard = () => {
    return(
        <div>
            <DogProfile>
                <span className="photo-ring">
                    <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className={`img-circle`} alt="" />
                </span>
                <div className="dog-info">
                    <div>
                        <span>시바견</span>
                        {/* strong에 성별 값 className으로 주기 male, female */}
                        <strong className="male">춘식</strong> 
                        <em><FontAwesomeIcon icon={faCakeCandles}/> 2022.07.01<i>1세</i></em>
                    </div>
                </div>
            </DogProfile>
            <WalkState>
                <NotWalk>
                    <p>춘식이는 산책중이 아니에요.</p>
                </NotWalk>
                <Walking>
                    <div>
                        <p>이지은 님과 산책중..</p>
                        <small>09.15 오후 4:00까지</small><small>수행률 70%</small>
                    </div>
                </Walking>
                <WalkHistory>
                    <div>
                        <p>지난 산책 내역</p>
                        <small>총 13km</small>
                    </div>
                    <div>
                        <b>3</b>건
                    </div>
                </WalkHistory>
            </WalkState>
        </div>
    )
}


export const AnonymousDogCard = () => {
    return(
        <div>
            <DogProfile>
                <span className="photo-ring">
                    <img src={anonymousDog} className={`img-circle`} alt="" />
                </span>
                <div className="dog-info">
                    <div>
                        <strong className="anonymous">강아지를 등록해보세요.</strong> 
                        <em><Link to="/dogAdd"><ButtonPrimaryXS>내 강아지 등록하기</ButtonPrimaryXS></Link></em>
                    </div>
                </div>
            </DogProfile>
            <WalkState>
                <NotWalk>
                    <p>산책중이 아니에요.</p>
                </NotWalk>
                <WalkHistory>
                    <div>
                        <p>지난 산책 내역</p>
                        <small>총 0km</small>
                    </div>
                    <div>
                        <b>0</b>건
                    </div>
                </WalkHistory>
            </WalkState>
        </div>
    )
}

const DogProfile = styled.div`
    text-align: center;
    padding:13px 0 6px;

    .photo-ring{
        display: inline-block;
        box-shadow: 0 0 15px 0 rgba(0,0,0, .13);
        border-radius: 100px;
        img{
            width:142px;
            border:7px solid var(--white-000);
            vertical-align : bottom;
        };
    }

    .dog-info{
        display: flex;
        align-items: top;
        padding-top:8px;
        justify-content: center;
        height:100px;

        > div > *{
            display: block;
        }

        strong{
            display: inline-block;
            font-size:24px;
            font-weight: 800;
            padding:8px 0 8px 32px;
            background-repeat: no-repeat;
            background-position:0 50%;
            background-size:26px auto;
        }

        strong.male{
            background-image:url('${sexIconMale}')
        }

        strong.female{
            background-image:url('${sexIconFemale}')
        }

        strong.anonymous{
            padding-left:0;
            padding-bottom:5px;
            font-size:19px;
            font-weight: 600;
            color:var(--gray-500)
        }

        em{
            padding-top:2px;
            font-size:18px;
            letter-spacing: -.02em;
            svg{
                color:var(--gray-400)
            }
            i{
                position:relative;
                padding-left:7px;
                margin-left:7px
            }
            i:before{
                content: '';
                position: absolute;
                top:50%;
                left:0;
                display: inline-block;
                width:3px;
                height:3px;
                background:var(--gray-300)
            }
        }
    }
`



const WalkState = styled.div`
    >*{
        display: flex;
        align-items: center;
        height:70px;
        border-radius:10px;
        padding:0 25px;
        font-size:17px;
        font-weight: 500;
        margin-bottom:8px;
        background-repeat: no-repeat;
        background-position:94% 50%;
    }
`

const Walking = styled.div`
    background-color:var(--primary);
    background-image:url('${ArrowsWh}');
    box-shadow: 0 0 15px 0 rgba(49, 130, 247, .6 );
    color:var(--white-000);

    small{
        position:relative;
        font-size:12px;
        padding-right:7px;
        margin-right:7px;
    }
    small+small:before{
        content: '';
        display: inline-block;
        position: absolute;
        left:-7px;
        top:50%;
        margin-top:-4px;
        width:1px;
        height:10px;
        background:var(--white-000);
        opacity: .4;
    }
`

const NotWalk = styled.div`
    background-color:var(--gray-200);
    
    p{
        width:100%;
        text-align: center;
        color:var(--gray-400)
    }
`

const WalkHistory = styled.div`
    border:1px solid var(--gray-300);
    background-image:url('${Arrows}');

    >div{
        flex:1;
    }
    >div+div{
        text-align: right;
        padding-right:20px
    }
    b{
        font-weight: 800;
    }
    small{
        font-size:12px;
    }
`