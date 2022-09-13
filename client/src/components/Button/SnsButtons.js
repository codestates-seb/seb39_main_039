import styled from "styled-components"
import logoGoogle from '../../assets/img/logoGoogle.png';
import logoKakao from '../../assets/img/logoKakao.png';

export const SnsButton = styled.button`
    width:100%;
    height:52px;
    padding:.9em 0 .75em;
    border:0;
    border-radius: 15px;
    font-size:15px;
    font-weight:500;
    transition:all .7s;
    margin:5px 0;
    background-repeat: no-repeat;
    background-position:10px 50%;
    background-size:43px auto;
`

export const SnsButtonGoogle = styled(SnsButton)`
    background-color:var(--white-000);
    border:1px solid var(--gray-200);
    background-image:url('${logoGoogle}');
    &:hover{
        background-color:var(--gray-050);
    }
`

export const SnsButtonKakao = styled(SnsButton)`
    background-color:#FFE600;
    background-image:url('${logoKakao}');
`