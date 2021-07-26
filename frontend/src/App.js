import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import EmployeeDetails from './components/employee/EmployeeDetails'

// Auth imports
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

// Admin imports
import Dashboard from './components/admin/Dashboard'
import EmployeesList from './components/admin/EmployeesList'
import NewEmployee from './components/admin/NewEmployee'
import UpdateEmployee from './components/admin/UpdateEmployee'
import EmployeeComments from './components/admin/EmployeeComments'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const { user, loading } = useSelector(state => state.auth)
  return (
    <Router>
    <div className="App">
      <Header />
      <div className="conatiner conatiner-fluid">
        <Route path = "/" component={Home} exact/>
        <Route path = "/search/:keyword" component={Home} />
        <Route path = "/employee/:id" component={EmployeeDetails} exact/>

        <Route path = "/login" component={Login} />
        <Route path = "/register" component={Register} />
        <Route path = "/password/forgot" component={ForgotPassword} exact/>
        <Route path = "/password/reset/:token" component={NewPassword} exact/>
        <ProtectedRoute path = "/me" component={Profile} exact/>
        <ProtectedRoute path = "/me/update" component={UpdateProfile} exact/>
        <ProtectedRoute path = "/password/update" component={UpdatePassword} exact/>
      </div>
        <ProtectedRoute path = "/dashboard" isAdmin={true} component={Dashboard} exact/>
        <ProtectedRoute path = "/admin/employees" isAdmin={true} component={EmployeesList} exact/>
        <ProtectedRoute path = "/admin/employee" isAdmin={true} component={NewEmployee} exact/>
        <ProtectedRoute path = "/admin/employee/:id" isAdmin={true} component={UpdateEmployee} exact/>
        <ProtectedRoute path = "/admin/comments/" isAdmin={true} component={EmployeeComments} exact/>

        
        <Footer />
        
    </div>
    </Router>
  );
}

export default App;
