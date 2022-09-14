import styled from "styled-components"
import sexIconMale from '../assets/img/sexIcon-male.svg';
import sexIconFemale from '../assets/img/sexIcon-female.svg';

const DogNameTag = ({size}) => {
    return (
        // 성별 내용 Tag class에 넣기  [male, female]
        <Tag className="male"> 
            <span className="dog-photo">
                <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className="img-circle" alt="" />
            </span>
            <div className="dog-info">
                <span>시바견</span>
                <strong>춘식</strong><small>1세</small>
            </div>
        </Tag>
    )
}

export default DogNameTag

const Tag = styled.div`
    display: inline-flex;
    width:100%;
    align-items: center;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 rgba(0,0,0, .13);
    padding:10px;
    background-color:var(--white--000);
    background-repeat: no-repeat;
    background-position:93% 10px;
    background-size:19px auto;
    

    &.male{
        background-image:url('${sexIconMale}')
    }

    &.female{
        background-image:url('${sexIconFemale}')
    }

    .dog-photo{
        display: inline-block;
        margin-right:.3em;
        img{
            width:55px;
            height:55px;
        }
    }

    .dog-info{
        span, small{
            display: block;
            font-size:13px;
            color:var(--gray-500);
            margin-bottom:4px;
        }

        small{
            display: inline-block;
            margin-left:3px;
        }

        strong{
           font-weight:800;
           font-size:18px;
        }
    }
`