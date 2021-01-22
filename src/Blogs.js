import React,{useState,useEffect} from 'react'

function Blogs() {
    const[blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const[error, setError] = useState(null)

    useEffect(() => {
        fetch(" http://localhost:8080/blogs")
            .then(res => {
                if (!res.ok) {
                 throw Error('could not fetch the data for that...')
                }
            return res.json()
            })
            .then(data => {
                console.log(data)
                setBlogs(data)
                setLoading(false)
                setError(null)

            })
            .catch(err => {
                setError(err.message)
                console.log(err.message)
                setLoading(false)
                
        })
    }, [])

    const blogList =  blogs.map(blog => (<div key={blog.id}>
        <h2>{blog.name}</h2>
        <p>{blog.email}</p>
    </div>))

    return (
        <div>
            <h2>Blog Post</h2> 
            {error && <h3>{error}</h3>}
            {loading && <h3>Loading...</h3>}
            {
            blogList
            }
        </div>
    )
}

export default Blogs
