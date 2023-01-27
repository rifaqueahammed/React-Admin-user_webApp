import React,{Fragment} from 'react';
import AdminHome from '../../Components/Admin/AdminHome';
import AdminNavbar from '../../Components/AdminNavbar/AdminNavbar';


function AdminHomePge() {
  return (
    <Fragment>
        <AdminNavbar/>
        <AdminHome/>
    </Fragment>
    
  )
}

export default AdminHomePge