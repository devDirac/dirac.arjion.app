export const SET_UPLOAD = "@SET_UPLOAD";
export const RESET_UPLOAD = "@SET_UPLOAD";

export const setUpload = (file: any) => {
  return {
    type: SET_UPLOAD,
    value: file,
  };
};

export const resetUpload = () => {
  return {
    type: RESET_UPLOAD,
  };
};
