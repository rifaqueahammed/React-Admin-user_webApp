import React, { useEffect, useState } from 'react';
import { 
    MDBCol, 
    MDBContainer, 
    MDBRow, 
    MDBCard, 
    MDBCardBody, 
    MDBTypography, 
 } from 'mdb-react-ui-kit';
 import './Home.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';


function Home() {
  const [userDetailes,setUserDetailes] = useState([]);
  const token = useSelector(state=>state.token);
  const navigate = useNavigate();
 
  console.log(token.id)
  useEffect(()=>{
     if(token.token === ""){
      navigate('/login');
     }else{
      axios.post('/user',{userId:token.id}).then((result)=>{
        const userDetailes = result.data;
        console.log(userDetailes)
        setUserDetailes(userDetailes);
      })
     }
  },[navigate,token.id, token.token]);

  return (
    <div className="vh-100" style={{ backgroundColor: '##6a11cb' }}>
    <MDBContainer className="container py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol md="12" xl="4">
          <MDBCard style={{ borderRadius: '15px' }}>
            <MDBCardBody className="text-center">
              <MDBTypography tag="h4">{userDetailes.username}</MDBTypography>
              <MDBTypography tag="h4">{userDetailes.email}</MDBTypography>
              <MDBTypography tag="h4">phone:{userDetailes.phone}</MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  )
}

export default Home
