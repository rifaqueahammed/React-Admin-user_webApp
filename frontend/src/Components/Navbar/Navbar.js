import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import {useNavigate,Link} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreaters } from '../../State/index';

 function Navbar() {
  const navigate = useNavigate();
  const auth = useSelector(state=>state.token.token);
  const dispatch = useDispatch();
  const {removeToken} = bindActionCreators(actionCreaters,dispatch);

  const userLogout = ()=>{
   removeToken();
  // localStorage.removeItem("user");
    navigate('/login');
  }


  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand>Home</MDBNavbarBrand>
        {(auth === "") ? <Button variant='danger'><Link style={{textDecoration:'none',color:'white'}} to="/login">Login</Link></Button> :<Button className='' variant='danger' onClick={()=>userLogout()}>SignOut</Button> }
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar