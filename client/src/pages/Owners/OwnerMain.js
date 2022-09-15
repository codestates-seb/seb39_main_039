import styled from "styled-components"
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import ListThumbnail from "../../components/PlaceList";
import sexIconMale from '../../assets/img/sexIcon-male.svg';
import sexIconFemale from '../../assets/img/sexIcon-female.svg';
import Arrows from '../../assets/img/arrows.svg';

const OwnerMain = () => {
    return(
        <div className="container bg-gray">
            <Header>
                <LogoArea>
                    <Logo/>
                </LogoArea>
                <Alert>
                    <FontAwesomeIcon icon={faBell}/>
                </Alert>
            </Header>
            <Section>
                <DogSlide>
                    <Slider {...settings}>
                        <div>
                            <DogProfile>
                                <span className="photo-ring">
                                    <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className={`img-circle`} alt="" />
                                </span>
                                <div className="dog-info">
                                    <span>시바견</span>
                                    {/* strong에 성별 값 className으로 주기 male, female */}
                                    <strong className="male">춘식</strong> 
                                    <em><FontAwesomeIcon icon={faCakeCandles}/> 2022.07.01<i>1세</i></em>
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

                        <div>
                            <DogProfile>
                                <span className="photo-ring">
                                    <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className={`img-circle`} alt="" />
                                </span>
                                <div className="dog-info">
                                    <span>시바견</span>
                                    {/* strong에 성별 값 className으로 주기 male, female */}
                                    <strong className="male">춘식</strong> 
                                    <em><FontAwesomeIcon icon={faCakeCandles}/> 2022.07.01<i>1세</i></em>
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
                    </Slider>
                </DogSlide>
            </Section>
            <Section>
                <Weather>
                    <p>날씨API 대기쓰</p>
                </Weather>
            </Section>
            <InfoSection>
                <h3>주변 강아지 동반 카페 <small><FontAwesomeIcon icon={faLocationDot}/> 강남구</small></h3>
                <ListThumbnail />
            </InfoSection>
        </div>
    )
}

export default OwnerMain

const settings = {
    dots: true,  // 점은 안 보이게
    infinite: false, // 무한으로 즐기게
    speed: 2000,
    autoplay:false,
    slidesToShow: 1, //4장씩 보이게 해주세요
    slidesToScroll: 1, //1장씩 넘어가세요
};


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:15px;
`
const LogoArea = styled.div`
    svg{width:55px};
`

const Alert = styled.div`
    font-size:19px;
    color:var(--gray-600);
`

const Section = styled.section`
    background:var(--white-000);
    padding:20px;
    border-radius:25px;
    margin-bottom:10px;
`

const DogSlide = styled.div`

`

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
        padding:12px 0;

        >*{
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

        em{
            padding-top:4px;
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
    background:var(--primary);
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

const Weather = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height:60px;
`

const InfoSection = styled.section`
    margin:20px 0 100px;
    h3{
        font-size:17px;
        small{
            font-size:13px;
            margin-left:9px;
            
            svg{
                color:var(--gray-400);
                font-size:12px;
            }
        }
    }
`