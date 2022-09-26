import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from '../assets/img/close.svg';
import { getCityInfo } from '../redux/actions/cityActions';
import { useDispatch, useSelector } from "react-redux";
import { ButtonPrimary } from './Button/Buttons';

const CitySelect = ({isOpen, setIsOpen, setRegion, setRegionValue, confirmHandler}) => {
    const dispatch = useDispatch();
    const { cityInfo } = useSelector((state) => state.city);

    const cityData = [
        {city:'서울'},
        {city:'경기'},
        {city:'인천'},
        {city:'강원'},
        {city:'대전'},
        {city:'세종'},
        {city:'충남'},
        {city:'충북'},
        {city:'울산'},
        {city:'경남'},
        {city:'경북'},
        {city:'대구'},
        {city:'광주'},
        {city:'전남'},
        {city:'전북'},
        {city:'제주'},
    ]

    useEffect(() => {
        document.body.style= `overflow: hidden`;
        return () => document.body.style = `overflow: auto`
    }, [])

    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };

    const citySelect = (regionName) =>{
        dispatch(getCityInfo(regionName));
        setRegion(null);
    }

    const regionHandler = (e) => {
        setRegion(e.target.value);
        setRegionValue(e.target.dataset.name)
    }


    
    return(
        <>
            {isOpen ? 
            <StyledModal className="modal" onClick={openModalHandler}>
                <StyledModalCon onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="btn-modal-cls" onClick={openModalHandler}><Close/></button>
                    <div className="modal-body">
                       <h3>지역 선택</h3>
                       <div className="region-list">
                            <div className="i1">
                                <ul className="item-ul">    
                                    {cityData.map((el, idx)=>{
                                        return(
                                            <li 
                                            onClick={()=>citySelect(`${el.city}`)}
                                            key={idx}
                                            >{el.city}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="i2">
                                <ul className="item-ul">
                                    {cityInfo?.map((el, key)=>{
                                        return(
                                            <li 
                                                value={el.cityId} 
                                                data-name={`${el.regionName} ${el.name}`}
                                                onClick={(e)=>regionHandler(e)}
                                                key={key}
                                            >{el.name}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                       </div>
                       <ButtonPrimary className='btn-select' onClick={()=>confirmHandler()}>선택</ButtonPrimary>
                    </div>
                </StyledModalCon>
            </StyledModal> : null}
        </>
    )
}

export default CitySelect


const StyledModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position:fixed;
    width:100%;
    height:100vh;
    top:0;right:0;bottom:0;left:0;
    background:rgba(0,0,0, .75);
    z-index: 99;
`

const StyledModalCon= styled.div`
    position:relative;
    display: flex;
    flex-direction:column;
    width: 90%;
    height:95vh;
    margin:0 auto;
    text-align: center;
    background:var(--white-000);
    box-shadow: 5px 5px 20px 0 rgba(0,0,0, .3);
    border-radius:15px;
    * {
    flex: 1 0;
    }
    .btn-modal-cls{
        position:absolute;
        top:10px;
        right:10px;
        display: inline-block;
        background:none;
        border:0
    }
    .modal-body{
        h3{
            font-size:20px;
            font-weight: 600;
            padding:20px;
            text-align: left;
            border-bottom:1px solid var(--gray-200);
        }
        .region-list{
            display: flex;
            text-align: left;

            .i1{
                flex:1;
                border-right:1px solid var(--gray-300);
            }

            .i2{
                flex:3;
            }

            .item-ul{
                height: calc( 95vh - 119px );
                padding-bottom:15px;
                overflow-y: scroll;
                
                li{
                    padding:18px 18px;
                    font-weight: 500;
                    font-size: 17px;
                }

                li.on{
                    background:var(--primary);
                    color:var(--white-000);
                }
            }
        }
        .btn-select{
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    }
`