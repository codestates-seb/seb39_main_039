import styled from "styled-components"

const InputLabel = ({name, label, type, err}) => {
    return(
        <IptFormArea>
            <input id={name} type={type} data-error={err} className={`ipt-form`} autocomplete="off" required></input>
            <label htmlFor={name}><span>{label}</span></label>
            {err && <p class="err-msg">{err}</p>}
        </IptFormArea>
    )
}

export default InputLabel

const IptFormArea = styled.div`
    position:relative;

    .err-msg{
        font-size:13px;
        color:var(--err-danger);
        padding:7px 19px;
    }
    .ipt-form{
      box-sizing:border-box; width:100%; height:60px; border:0 none; outline:none;
   }

   .ipt-form + label{
      position:absolute;
      width:100%;
      height:100%;
      height:60px;
      left:0;
      color:var(--gray-400);
      border:1px solid var(--gray-200);
      border-radius:15px;
      height:60px;
   }

   .ipt-form + label span {
      position:absolute;
      top:50%;
      left:18px;
      font-size:17px;
      transform: translate(0, -50%);
      transition: all .3s ease;
   }

   .ipt-form:focus, .ipt-form:valid{
      padding-top:21px;
   }

   .ipt-form:focus + label span, .ipt-form:valid + label span {
      transform: translate(0, -150%);
      font-size:13px;
   }

   .ipt-form[data-error]:empty + label {
      border-color:var(--err-danger)
   }
`