const initialState = {
    user:{
      id:"",
      username:"",
      email:"",
      phone:""
    }
  };
  
const dataReducer = (prevState = initialState, action) => {
    switch (action.type) {
      case "addData":
        return {
          ...prevState,
          id:action.id,
          username:action.username,
          email:action.email,
          phone:action.phone
        };
      default:
        return initialState;
    }
  };
  
export default dataReducer;