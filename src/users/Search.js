import React, { useState, useContext } from 'react'
import GithubContext from '../context/gitHub/githubContext'

const Search = (props) => {
    const githubcontext = useContext(GithubContext);

     const { showClear, clearUsers} = props
     
     const [text, setText] = useState('')
     
        const onSubmit = (e) => {
         e.preventDefault()
         githubcontext.searchUsers(text)
         setText(text)
        }
        
        const onChange = (e) => setText(e.target.value)
    
        return (
            <div>
                <form className="form" onSubmit={onSubmit}>
                    <input type="text" name="text"
                     value={text} 
                     placeholder='Search Users...' 
                     onChange={onChange}
                     />
                    <input type="submit" value='Search' className='btn btn-dark btn-block'/>

                </form>
                    { showClear && (
                <button
                className='btn btn-light btn-block'
                onClick={clearUsers}
                >
                    Clear
                </button>
                 )
                    }
            </div>
        )
}

export default Search
