import styled from "styled-components";

export const SwitchButton = ({isOn, toggleHandler}) => {
    return(
        <>
            <ToggleContainer onClick={toggleHandler}>
                <div className={`toggle-container ${isOn ? 'toggle--checked' : ''}`}>
                    <div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`}/>
                </div>
            </ToggleContainer>
        </>
    )
}


const ToggleContainer = styled.div`
    cursor: pointer;
    .toggle-container{
        display: flex;
        align-items:center;
        position:relative;
        width:50px;
        height:26px;
        background:#CBCBCB;
        border-radius: 50px;
        &.toggle--checked{background:var(--primary)}

        .toggle-circle{
            display: inline-block;
            width:20px;
            height:20px;
            border-radius: 50px;
            background:#fff;
            margin-left:3px;
            transition:  all .3s;
            &.toggle--checked{margin-left:26px}
        }
    }
    
`