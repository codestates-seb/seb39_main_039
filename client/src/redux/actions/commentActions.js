import customAxios from "../axiosAPI";
import { toast } from "react-toast";

export const COMMENT_SELECT_ERROR = "COMMENT_SELECT_ERROR";
export const GET_CONTACT_INFO_SUCCESS = "GET_CONTACT_INFO_SUCCESS";


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
  return async (dispatch) => {
    try {
      const selectCommentAPI = customAxios
        .put(`/wanted/${wantedId}/comment/${commentId}/match`, `${pick}`)
      let select_comment = await selectCommentAPI;
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 403) {
        toast.error(error.response.data);
        dispatch({
          type: "COMMENT_SELECT_ERROR",
          payload: error.response.data
        });
      }
    }
  };
};


export const getContactInfo = (wantedId, commentId) => {
  return async (dispatch) => {
    try {
      const getContactInfoAPI = customAxios.get(`/wanted/${wantedId}/comment/${commentId}/viewPhoneNumber`);
      let get_contactInfo = await getContactInfoAPI;
      dispatch({
        type: "GET_CONTACT_INFO_SUCCESS",
        payload: {
          contactInfo: get_contactInfo.data
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};