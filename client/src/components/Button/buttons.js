import styled from "styled-components"

export const ButtonPrimary = styled.button`
    width:100%;
    padding:.85em 0 .75em;
    background-color:var(--primary);
    border:2px solid transparent;
    border-radius: 15px;
    font-size:20px;
    font-weight:600;
    color:var(--white-000);
    transition:all .7s;

    &:hover{
        background-color:var(--primary-active);
    }
`

export const ButtonPrimaryLine = styled(ButtonPrimary)`
    background-color:var(--white-000);
    border-color:var(--primary);
    color:var(--black-900);

    &:hover{
        background-color:var(--white-000);
        border-color:var(--primary-active);
    }
`
