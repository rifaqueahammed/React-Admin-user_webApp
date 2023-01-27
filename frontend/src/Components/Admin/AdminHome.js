import React,{useState,useEffect,Fragment} from 'react'
import {  MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from '../../axios';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
// import { actionCreaters } from '../../State/index';

function AdminHome() {
  const [users,setUsers] = useState([]);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');

  const [usernameEdit,setUsernameEdit] = useState('');
  const [emailEdit,setEmailEdit] = useState('');
  const [phoneEdit,setPhoneEdit] = useState('');
  const [currentUserId,setId] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const navigate = useNavigate();

  const auth = useSelector(state=>state.token);
  
  useEffect(()=>{
    if(auth.token){
      axios.get('admin/home').then((result)=>{
        const user = result.data;
        if(!user.isBlocked){
          setUsers(user);
        }
      })
    }
    else{
      navigate('/admin/login');
    }
  },[auth.token, navigate]);

  const blockUser = (id)=>{
    axios.post('admin/blockuser',{id:id,token:auth}).then((result)=>{
      if(result.data.error){
        navigate('/admin/login');
      }
      else{
        setUsers(users.filter((element) => {
          if(element._id === id) element.isBlocked = !element.isBlocked;
          return element;
        }))
      }
    })
  }
  const unblockUser = (id)=>{
    axios.post('admin/unblockuser',{id:id,token:auth}).then((result)=>{
      if(result.data.error){
        navigate('/admin/login');
      }
      else{
        setUsers(users.filter((element) => {
          if(element._id === id) element.isBlocked = !element.isBlocked;
          return element;
        }))
      }
    })
  }

  const addUser = (e)=>{
    e.preventDefault();
    axios.post('admin/useradd', {
        username,
        email,
        phone,
        password,
        token:auth
    }).then((response) => {
      if(response.data.error){
        navigate('/admin/login');
      }
      else{
        handleClose();
        setUsers(response.data)
      }
    });
  }

  const showEdit = (id)=>{
     handleShow1();
     const currentUser = users.filter((element) => {
     return element._id === id ? element : null;
    })
     setUsernameEdit(currentUser[0].username);
     setEmailEdit(currentUser[0].email);
     setPhoneEdit(currentUser[0].phone);
     setId(id);
  }

  const editUser = (e)=>{
    e.preventDefault();
    axios.post('admin/userEdit', {
      usernameEdit,
      emailEdit,phoneEdit,currentUserId,
      token:auth
  }).then((response) => {
    if(response.data.error){
      navigate('/admin/login');
    }else{
      setUsers(response.data)
      handleClose1();
    }
  });
    
   
  }


  return (
    <Fragment>
    <Button className='mt-5' variant="success" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={addUser}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type='submit'>
            Add User
          </Button>
        </Modal.Footer>
        </Form>
        </Modal.Body>
        </Modal>

    <MDBTable align='middle mt-5'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>email</th>
          <th scope='col'>Phone</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users.map((user)=>{
          return(
            <tr>
           <td>
             <div className='d-flex align-items-center'>
               <img
                 src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                 alt=''
                 style={{ width: '45px', height: '45px' }}
                 className='rounded-circle'
               />
               <div className='ms-3'>
                 <p className='fw-bold mb-0'>{user.username}</p>
               </div>
             </div>
           </td>
           <td>
           <p className='fw-bold mb-0'>{user.email}</p>
           </td>
           <td>
           <p className='fw-bold mb-0'>{user.phone}</p>
           </td>
           <td>
           <Button className='' variant="success" onClick={()=>showEdit(user._id)}>
        Edit
      </Button>
           {user.isBlocked === false ? <Button className='ms-2' variant="danger" 
           onClick={()=>blockUser(user._id)}>Block</Button>:<Button className='ms-2' variant="success" 
           onClick={()=>unblockUser(user._id)}>UnBlock</Button>}
           </td>
         </tr>
         )
        })
      }
      </MDBTableBody>
    </MDBTable>

    

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={editUser}>
            <Form.Group className="mb-3" controlId="username1">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                value={usernameEdit}
                onChange={(e)=>setUsernameEdit(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={emailEdit}
                onChange={(e)=>setEmailEdit(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phoneEdit}
                onChange={(e)=>setPhoneEdit(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="success" type='submit'>
           Edit User
          </Button>
        </Modal.Footer>
        </Form>
        </Modal.Body>
        </Modal>

    </Fragment>
    
  )
}

export default AdminHome
