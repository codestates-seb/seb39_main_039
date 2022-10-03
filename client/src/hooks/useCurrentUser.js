export const useCurrentUser = () => {
  const userId = localStorage.getItem('user');
  const handler = (data) => {
    if(Number(userId) === Number(data)){
        return true
      }
  }
  return [handler];
};
