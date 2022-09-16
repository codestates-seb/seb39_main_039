import { Link } from "react-router-dom"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const FloatingBtnAdd = ({mid}) => {
    return(
        <Link to={`/${mid}`}>
            <Floating>
                <FontAwesomeIcon icon={faPenToSquare}/>
            </Floating>
        </Link>
    )
}

const Floating = styled.div`
    position:fixed;
    right:14px;
    bottom:20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width:50px;
    height:50px;
    background-color:var(--primary);
    border-radius: 100px;
    box-shadow: 3px 3px 10px 0 rgba(0,0,0, .25);
    color: var(--white-000);
    font-size:20px;
    
    svg{
        position:relative;
        right:-1px
    }

    &:hover{
        background-color:var(--primary-active)
    }
`
  
