import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import Navbar from './layout/Navbar'
import Users from './users/Users'
import axios from 'axios'
import Search from './users/Search'
import About from './pages/About'
import User from './users/User'

 class App extends Component {
  state = {
    users: [],
    loading: false,
    user: {},
    errorMsg: ''
  }

 async componentDidMount() {
   this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ users: res.data, loading:false })
  }

  // Get Single User

 getUser = async (username) => {
   this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.
    setState({ user: res.data, loading:false })
  }


  

  searchUsers = async text => {
    this.setState({ loading: true });
    
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  
        this.setState({users: res.data.items, loading: false})
    console.log(res.data.items)
   
  }

 
  
  clearUsers = () => {
    this.setState({users: [] , loading:false})
  }

  render() {
    const {users,user, loading} = this.state

    return (
    <Router>
        <div className='App'>
        <Navbar title='Github Finder'/>
        <div className="container">

          <Switch>
            <Route exact path='/' render={props =>(
              <Fragment>

                <Search searchUsers={this.searchUsers} 
                clearUsers={this.clearUsers } 
                showClear={users.length > 0 ? true : false}
                
                />
              <Users loading={loading} users={users}/>
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={this.getUser} user={user} />
            )} />

            </Switch>
        </div>
      </div>
    </Router>
    )
  }
}

export default App
