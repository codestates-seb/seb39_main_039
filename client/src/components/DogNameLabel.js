import styled from "styled-components"

const DogNameLabel = ({size}) => {
    return (
        <Label className={size}>
            <span className="dog-photo">
                <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className={`img-circle ${size}`} alt="" />
            </span>
            <dl>
                <dt>시바견</dt>
                <dd>춘식</dd>
            </dl>
        </Label>
    )
}

export default DogNameLabel

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
    }

    &.xs{
        dl{
            font-size: 13px;
        }
    }
`