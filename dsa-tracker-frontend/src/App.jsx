import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProblem from './pages/UserProblem';
import Navbar from './components/navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Problems from './pages/Problems'

function App(){
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path = "/" element = {
          <ProtectedRoute>
          <Problems />
          </ProtectedRoute>
          }/>
          <Route path = "/userproblem" element = {
          <ProtectedRoute>
          <UserProblem />
          </ProtectedRoute>
          }/>
          <Route path = "/dashboard" element = {
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
          }/>
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/register" element = {<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
