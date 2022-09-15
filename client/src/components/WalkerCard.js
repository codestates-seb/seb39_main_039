import styled from "styled-components"
import noImage from '../assets/img/noImage.svg';
import Arrows from '../assets/img/arrows.svg';
import ArrowsWh from '../assets/img/arrows-wh.svg';

const WalkerCard = () => {
    return(
        <div>
            <WalkerProfile>
                <span className="photo-ring">
                    <img src={noImage} className={`img-circle`} alt="" />
                </span>
                <div className="dog-info">
                    <div>
                        <strong>이지은</strong> 
                        <em>010-1234-1234</em>
                    </div>
                </div>
            </WalkerProfile>
            <WalkState>
                <NotWalk>
                    <p>산책 알바 찾기</p>
                </NotWalk>
                <Walking>
                    <div>
                        <p>춘식 외 2마리 산책중..</p>
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

export default WalkerCard


const WalkerProfile = styled.div`
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
            padding:8px 0;
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
    color:var(--white-000);
    box-shadow: 0 0 15px 0 rgba(49, 130, 247, .6 );

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