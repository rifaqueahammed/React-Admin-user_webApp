import React,{useState,useEffect} from 'react';
import axios from '../../axios';
import {useNavigate,Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';
import './AdminLogin.css';
import { useSelector,useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreaters } from '../../State/index';

function AdminLogin() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const auth = useSelector(state=>state.token.token);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {storeToken} = bindActionCreators(actionCreaters,dispatch);

  useEffect(()=>{
    if(auth){
      navigate('/admin');
    }
  })

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('admin/login', {
      email,
      password
  }).then((response) => {
    if(response.data.auth){
      const data = {
        token:response.data.token,
        id:response.data.id,
      };
      storeToken(data);
      navigate('/admin');
    }else{
     setError(response.data.error)
    }
    });
  };
  return (
    <MDBContainer fluid>
    <form onSubmit={handleSubmit}>
    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

            <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
            <p className="text-white-50 mb-5">Please enter your login and password!</p>
            {error && <p className='text-danger fs-3'>{error}</p>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={email} onChange={(e)=>setEmail(e.target.value)} labelClass='text-white' label='Email address' id='email' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={password} onChange={(e)=>setPassword(e.target.value)} labelClass='text-white' label='Password' id='password' type='password' size="lg"/>
            <Button className='mx-2 px-5' type='submit' size='lg'>Login</Button>
            <div>
              <p className="mb-0">Don't have an account? <span className="text-white-50 fw-bold"><Link to={'/signup'}>SignUp</Link></span></p>

            </div>
          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>
    </form>
  </MDBContainer>
    
  );
}

export default AdminLogin;