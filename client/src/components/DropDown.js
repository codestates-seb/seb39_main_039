import React, { useState } from 'react';
import styled from 'styled-components';

const Dropdown = ({name, data}) => {
    const [isShow, setIsShow] = useState(false);
    const showHandler = () => {
        setIsShow(!isShow)
    }
    return (
        <DropDownButton>
            <button className="on-button" data-set={isShow} onClick={showHandler}>
                {name} <i className="ico-caret"></i>
            </button>
            <div className="drop-menu" data-set={isShow}>
                <ul>
                    {data.map((el, idx)=>
                        <li key={idx} >{el.name}</li>
                    )}
                </ul>
            </div>
        </DropDownButton>
    )
};

export default Dropdown;

const DropDownButton = styled.div`
    position:relative;

    .on-button{
        border:0;
        font-size:15px;
        font-weight: 500;
        background:none;
        padding-right:20px;
    }

    .on-button[data-set=true]{

    }

    .on-button .ico-caret {
        position:absolute;
        right:8px;
        top:50%;
        margin-top:-2px
    }
    .ico-caret {
        display:inline-block;
        border-top:4px solid #333;
        border-left:4px solid transparent;
        border-right:4px solid transparent;
    }

    .drop-menu{
        display: none;
        overflow: hidden;
        position:absolute;
        top:140%;
        left:0;
        min-width:270px;
        background:var(--white-000);
        border-radius:15px;
        box-shadow: 0 0 20px 0 rgba(0,0,0, .15);
        z-index: 99;
        
        li{
            padding:13px 18px;
            text-align: left;
            font-size:16px;
            color:var(--gray-700);
            cursor: pointer;
        }
        li:hover{
            background:var(--gray-100);
        }
        li+li{
            border-top:1px solid var(--gray-200)
        }
    }
    .drop-menu[data-set=true]{
        display: block;
    }
`
