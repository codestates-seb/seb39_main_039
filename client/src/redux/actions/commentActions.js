import customAxios from "../axiosAPI";

export const addComment = (wantedId, content) => {
    return async () => {
      try {
        const addCommentAPI = customAxios
          .post(`/wanted/${wantedId}/comment`, `${content}`)
          .then((res) => window.location.reload());
        let add_comment = await addCommentAPI;
      } catch (error) {
        //에러 핸들링 하는 곳
        console.log("에러", error);
      }
    };
  };


export const editComment = (wantedId, commentId, content) => {
  return async () => {
    try {
      const editCommentAPI = customAxios
        .put(`/wanted/${wantedId}/comment/${commentId}/edit`, `${content}`)
      let edit_comment = await editCommentAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};


export const delComment = (wantedId, commentId) => {
  return async () => {
    try {
      const delCommentAPI = customAxios
        .delete(`/wanted/${wantedId}/comment/${commentId}/delete`)
        .then((res) => window.location.reload());
      let del_comment = await delCommentAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};


export const selectComment = (wantedId, commentId, pick) => {
  return async () => {
    try {
      const selectCommentAPI = customAxios
        .put(`/wanted/${wantedId}/comment/${commentId}/edit`, pick)
      let select_comment = await selectCommentAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};
