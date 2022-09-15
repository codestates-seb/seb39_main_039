import styled from "styled-components"
import sticker01 from "../assets/img/sample-sticker.png";
import gradationImg from "../assets/img/gdt.png";

const UserGrade = () => {
    return(
        <Conpanel>
            <Grade>
                1티어
            </Grade>
            <Sticker>
                <ul>
                    <li>
                        <img src={sticker01} className="i-sticker" alt="" />
                        <em>+1</em>
                    </li>
                    <li>
                        <img src={sticker01} className="i-sticker" alt="" />
                        <em>+1</em>
                    </li>
                    <li>
                        <img src={sticker01} className="i-sticker" alt="" />
                        <em>+1</em>
                    </li>
                    <li>
                        <img src={sticker01} className="i-sticker" alt="" />
                        <em>+1</em>
                    </li>
                    <li>
                        <img src={sticker01} className="i-sticker" alt="" />
                        <em>+1</em>
                    </li>
                    <li>
                        <img src={sticker01} className="i-sticker" alt="" />
                        <em>+1</em>
                    </li>
                    <li>
                        <img src={sticker01} className="i-sticker" alt="" />
                        <em>+1</em>
                    </li>
                </ul>
                <i className="gradation"></i>
            </Sticker>
        </Conpanel>
    )
}

export default UserGrade

const Conpanel = styled.div`
    display: flex;
    gap:10px;
    overflow: hidden;
    padding:8px 0 8px 15px;
    background:var(--white-000);
    box-shadow: 0 0 10px 0 rgba(0,0,0, .1);
    border-radius:15px;
`

const Grade = styled.div`
    width:20%;
    align-self: center;
    padding-right:10px;
    border-right:1px solid var(--gray-100);
    font-size:12px;
`

const Sticker = styled.div`
    position:relative;
    width:80%;
    ul{
        overflow: auto;
        white-space: nowrap;
        gap: 20px;
        align-items: center;
        padding-right:23px;
    }
    li{
        position:relative;
        display: inline-block;
        margin:0 7px;
        em{
            position:absolute;
            bottom:0;
            right:-7px;
            font-size:12px;
            font-weight: 500;
            min-width:22px;
            padding:1px 2px 1px 1px;
            border-radius:10px;
            color:var(--gray-100);
            background-color: var(--gray-600);
        }
    }

    .i-sticker{
        width:35px;
        height:35px;
        border:1px solid var(--gray-100);
        border-radius: 100px;
    }

    .gradation{
        position:absolute;
        top:0;
        right:0;
        height:30px;
        width:26px;
        height:48px;
        background:url('${gradationImg}');
        background-size:100% auto;
        z-index: 9;
    }
`
