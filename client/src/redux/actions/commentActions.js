import customAxios from "../axiosAPI";

export const addComment = (walkId, content) => {
    return async () => {
      try {
        const addCommentAPI = customAxios
          .post(`/wanted/${walkId}/comment`, `${content}`)
          .then((res) => window.location.reload());
        let add_comment = await addCommentAPI;
      } catch (error) {
        //에러 핸들링 하는 곳
        console.log("에러", error);
      }
    };
  };