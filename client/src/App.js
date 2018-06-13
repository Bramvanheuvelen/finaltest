import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import BatchList from './components/BatchList'
import LogoutPage from './components/logout/LogoutPage'
import CreateBatch from './components/CreateBatch'
import BatchDetails from './components/BatchDetails'
import './App.css'
import TopBar from './components/layout/TopBar'
import CreateStudent from './components/CreateStudent';
import StudentDetails from './components/StudentDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/batches" component={BatchList} />
            <Route exact path="/students/:id" component={StudentDetails} />
            <Route exact path="/batches/create" component={CreateBatch} />
            <Route exact path="/batches/:id" component={BatchDetails}/>
            <Route exact path="/students/create" component={CreateStudent}/>
            <Route exact path="/" render={ () => <Redirect to="/batches" /> } />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
