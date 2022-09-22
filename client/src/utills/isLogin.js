const isLogin = () => {
  if(!localStorage.getItem('idx')) {
    alert("로그인 후 접근할 수 있습니다.");
    window.location.replace('/login');
  }
};

export default isLogin;