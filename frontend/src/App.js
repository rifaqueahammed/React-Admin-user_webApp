
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import AdminHome from './Pages/Admin/AdminHome';
import AdminLogin from './Pages/Admin/AdminLogin';

function App() {
  return (
    <div className="App">
      <Router>
     <Routes>
       <Route path={'/login'} element={<Login/>} ></Route>
       <Route path={'/Signup'} element={<SignUp/>} ></Route>
       <Route path={'/home'} element={<Home/>} ></Route>
       <Route path={'/admin'} element={<AdminHome/>} ></Route>
       <Route path={'/admin/login'} element={<AdminLogin/>} ></Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
