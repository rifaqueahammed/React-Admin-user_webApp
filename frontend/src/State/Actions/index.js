export const storeToken = (data)=>{
    return (dispatch)=>{
        dispatch({
            type:"storeToken",
            token:data.token,
            id:data.id
        })
    }
}

export const removeToken = (data)=>{
    return (dispatch)=>{
        dispatch({
            type:"removeToken",
            token:'',
            id:''
        })
    }
}

export const addData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "addData",
      id:data.id,
      username:data.usrename,
      email:data.email,
      phone:data.phone
    });
  };
};