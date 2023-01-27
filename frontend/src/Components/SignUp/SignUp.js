import React,{useState} from 'react';
import axios from '../../axios';
import {useNavigate,Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import './SignUp.css';

function SignUp() {
const [username,setUsername] = useState('');
const [email,setEmail] = useState('');
const [phone,setPhone] = useState('');
const [password,setPassword] = useState('');
const [error,setError] = useState('');

const navigate = useNavigate();


const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('/signup', {
        username,
        email,
        phone,
        password
    }).then((response) => {
        if(response.data.success){
          navigate('/login');
        }else{
         setError(response.data.error)
        }
      });
}

  return (
    <MDBContainer fluid>
    <form onSubmit={handleSubmit}>
    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>
        
        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

            <h2 className="fw-bold mb-2 text-uppercase">SignUp</h2>
            <p className="text-white-50 mb-5">Please enter your Credentials</p>
             {error && <p className='text-danger fs-3'>{error}</p>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={username} onChange={(e)=>setUsername(e.target.value)} labelClass='text-white' label='Username' id='username' type='text' size="lg" />
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={email} onChange={(e)=>setEmail(e.target.value)} labelClass='text-white' label='Email address' id='email' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100'  value={phone} onChange={(e)=>setPhone(e.target.value)} labelClass='text-white' label='Phone Number' id='phone' type='number' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={password} onChange={(e)=>setPassword(e.target.value)} labelClass='text-white' label='Password' id='password' type='password' size="lg"/>

            <Button className='mx-2 px-5' type='submit' size='lg'>SignUp</Button>
            <div>
              <p className="mb-0">Already have an account?<span className="text-white-50 fw-bold"><Link to={'/login'}>Login</Link></span></p>
            </div>
          </MDBCardBody>
        </MDBCard>
        
        </MDBCol>
      </MDBRow>
      </form>
     </MDBContainer>
    
  );
}

export default SignUp;