import styled from "styled-components"

const SwitchMode = ({isOn, toggleHandler}) => {
    return(
        <ToggleContainer onClick={toggleHandler}>
            <div className={`toggle-container ${isOn ? 'toggle--checked' : ''}`}>
                <div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`}/>
                <span className={`${isOn ? '' : 'toggle--checked'}`}>견주</span>
                <span className={`${isOn ? 'toggle--checked' : '' }`}>알바</span>
            </div>
        </ToggleContainer>
    )
}

export default SwitchMode


const ToggleContainer = styled.div`
    cursor: pointer;
    .toggle-container{
        display: flex;
        align-items:center;
        position:relative;
        width:100px;
        height:35px;
        background:var(--gray-200);
        border-radius: 10px;

        >span{
            flex: 1;
            text-align: center;
            z-index: 10;
            color:var(--gray-400);
            font-weight: 600;
        }
        >span.toggle--checked{
            color:var(--white-000);
            font-weight: 800;
        }

        .toggle-circle{
            position: absolute;
            top:50%;
            transform: translate(0, -50%);
            left:1px;
            display: inline-block;
            width:46px;
            height:28px;
            border-radius: 8px;
            background:var(--primary);
            box-shadow: 0 0 6px 0 rgba(0,0,0, .1);
            margin-left:3px;
            transition:  all .3s;
            &.toggle--checked{margin-left:50px}
        }
    }
    
`