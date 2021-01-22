import React, { useState, useEffect, Fragment } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import Navbar from './layout/Navbar'
import Users from './users/Users'
import axios from 'axios'
import Search from './users/Search'
import About from './pages/About'
import User from './users/User'

import GithubState from './context/gitHub/GithubState'

const App = () => {
   const [users, setUsers] = useState([])
   const [user, setUser] = useState({})
   const [repos, setRepos] = useState([])
   const [loading, setLoading] = useState(false)
   const [alert, setAlert] = useState(null)
  

//  async componentDidMount() {
//    setState({ loading: true });

//     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
//     client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

//     setState({ users: res.data, loading:false })
//   }
  
  useEffect( async() => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    setUsers( res.data)
   setLoading(false);
  }, [])

  // Get Single User
 const getUser = async (username) => {
    setLoading(true);

   const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

   setUser( res.data)
   setLoading(false);
   
  }


  

  const getUserRepos = async (username) => {
    setLoading(true);
    
     const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
     client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
 
     setUser( res.data)
     setLoading(false);
     
  }

//  Clear users from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    
    setTimeout(() => setAlert(null), 5000)
  }

  return (
      <GithubState>
    <Router>
        <div className='App'>
        <Navbar title='Github Finder'/>
        <div className="container">

          <Switch>
            <Route exact path='/' render={props =>(
              <Fragment>

                <Search 
                clearUsers={clearUsers } 
                showClear={users.length > 0 ? true : false}
                showAlert={showAlert}
                />
              <Users loading={loading} users={users}/>
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} 
              getUser={getUser} 
              getUserRepos={getUserRepos} 
              repos={repos} user={user}
               />
            )} 
            />

            </Switch>
        </div>
      </div>
    </Router>
    </GithubState>
    )
}

export default App
