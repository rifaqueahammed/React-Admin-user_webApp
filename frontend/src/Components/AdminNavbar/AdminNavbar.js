import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
    MDBInputGroup,
  } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import {useNavigate,Link} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreaters } from '../../State/index';


  function AdminNavbar() {
  const auth = useSelector(state=>state.token.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {removeToken} = bindActionCreators(actionCreaters,dispatch);
 
  const adminLogout = ()=>{
    removeToken();
    navigate('/Admin/login');
  }
  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand>Home</MDBNavbarBrand>
        <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
          <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
          <MDBBtn outline>Search</MDBBtn>
        </MDBInputGroup>
        {(auth === "") ? <Button variant='danger'><Link style={{textDecoration:'none',color:'white'}} to="/admin/login">Login</Link></Button> :<Button className='' variant='danger' onClick={()=>adminLogout()}>SignOut</Button> }
      </MDBContainer>
    </MDBNavbar>
    
  )
}

export default AdminNavbar
