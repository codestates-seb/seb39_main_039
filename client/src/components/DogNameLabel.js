import styled from "styled-components"
import anonymousDog from '../assets/img/anonymousDog.svg'

export const DogNameLabel = ({size, name, species}) => {
    return (
        <Label className={size}>
            <span className="dog-photo">
                <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className={`img-circle ${size}`} alt="" />
            </span>
            <dl>
                <dt>{species}</dt>
                <dd>{name}</dd>
            </dl>
        </Label>
    )
}

export const DogNameLabelType2 = ({name, size}) => {
    return (
        <Label className={`type2 ${size}`}>
            <span className="dog-photo">
                <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className={`img-circle xs`} alt="" />
            </span>
            <dl>
                <dd>{name}</dd>
            </dl>
        </Label>
    )
}

export const AnonymousLabelType2 = () => {
    return (
        <Label className="type2 add">
            <span className="dog-photo">
                <img src={anonymousDog} className={`img-circle xs`} alt="" />
            </span>
            <dl>
                <dd>강아지 등록</dd>
            </dl>
        </Label>
    )
}


const Label = styled.span`
    overflow:hidden;
    display: inline-flex;
    background:var(--white-000);
    border:1px solid var(--gray-200);
    border-radius: 50px;
    padding:.2em .7em 0 .2em; 

    .dog-photo{
        display: inline-block;
        margin-right:.3em;
    }

    dl{
        display: flex;
        align-items: center;
        font-weight: 500;
        margin-top:-.2em;
        
        dt{
            color:var(--gray-600);
            border-right:1px solid #ddd;
            padding-right:.4em;
            margin-right:.4em;
        }

        dt:empty{
            margin-left:-10px
        }
    }

    &.xs{
        dl{
            font-size: 13px;
        }
    }

    &.type2{
        cursor: pointer;
        padding:4px 14px 3px 6px;
        border:0;
        box-shadow: 0 0 8px 0 rgba(0,0,0, .13);
        dl{
            margin-top:0;
        }
    }

    &.type2.lg{
        padding:4px 18px 1px 4px;
        .dog-photo{
            img{
                width:34px;
                height:34px;
            }
        }
    }

    &.add{
        color:var(--gray-500);
    }
`