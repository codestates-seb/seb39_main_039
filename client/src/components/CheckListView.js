import styled from "styled-components";
import ckeckIcon from '../assets/img/checkedIcon-success.svg';

export const CheckListView = styled.ul`
    li{
        display: flex;
        position: relative;
        align-items:center;
        min-height:54px;
        margin:8px 0;
        padding:18px 18px;
        border:1px solid var(--gray-200);
        border-radius: 15px;
        background-color:var(--gray-100);
        line-height: 1.3em;
    }
    
    li.checked{
        background-color:var(--white-000);
        padding-left:46px;
    }

    li.checked:before{
        content: '';
        position:absolute;
        top:16px;
        left:15px;
        width:23px;
        height:23px;
        background-image:url('${ckeckIcon}');
    }
`