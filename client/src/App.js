import React from 'react'
import {BrowserRouter,Route,Link} from 'react-router-dom'
import ApplicationForm from './ApplicationForm'
import Home from './home'
import AdminDashboard from './AdminDashboard'
import AdminRegister from './AdminRegister'
import AdminLogin from './AdminLogin'
import {Navbar,Nav} from 'react-bootstrap'
import './index.css'



function App (){
    return(
        <BrowserRouter>
            <div>
                {/* <h1>User Details</h1>
                <Link to ="/">HOME</Link>
                <Link to ="/register">REGISTER</Link>
                <Link to ="/admin/register">REGISTER AS ADMIN</Link> */}
                <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/">Demo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="link" href="/">Home</Nav.Link>
                        <Nav.Link className="link" href="/register">Register as External </Nav.Link>
                        <Nav.Link className="link" href="/admin/register">Register as Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/register" component={ApplicationForm} exact={true}/>
                <Route path="/admin/register" component={AdminRegister}/>
                <Route path="/admin/login" component={AdminLogin}/>
                <Route path="/users" component={AdminDashboard}/>
                
            </div>
        </BrowserRouter>
    )
}
export default App