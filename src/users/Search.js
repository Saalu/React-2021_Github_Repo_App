import React, { Component } from 'react'

 class Search extends Component {
     state = {
         text: ''
     }

     
     onSubmit = (e) => {
         e.preventDefault()
         this.props.searchUsers(this.state.text)
         this.setState({text: ''})
        }
        
    onChange = (e) => this.setState({[e.target.name]: e.target.value})
    
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input type="text" name="text"
                     value={this.state.text} 
                     placeholder='Search Users...' 
                     onChange={this.onChange}
                     />
                    <input type="submit" value='Search' className='btn btn-dark btn-block'/>

                </form>
                    { this.props.showClear && (
                <button
                className='btn btn-light btn-block'
                onClick={this.props.clearUsers}
                >
                    Clear
                </button>
                 )
                    }
            </div>
        )
    }
}

export default Search
