import React, {useState, useEffect} from 'react'
import Loading from './Loading'

function News() {
    
    const [news, setNews] = useState([])
    const [search, setSearch] = useState('react')
    const[url, setUrl] = useState()
    const[loading, setLoading] = useState(false)

    const fetchNews = () => {
        setLoading(true)
        fetch(`http://hn.algolia.com/api/v1/search?query=${search}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.hits)  
            setNews(data.hits)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const onSearch = (e) => {
        e.preventDefault()
        setUrl(`http://hn.algolia.com/api/v1/search?query=${search}`)
    }

    useEffect(() => {
        fetchNews()
        
    },[url])

    const searchForm = () => (
        <form action="#" onSubmit={onSearch}>
        <input type="text" value={search} onChange={handleChange}/>
        <button>Search</button>
        </form>
    )

    const showNews = () => (
        news.map((n,i) => (
            <h3 key={i}>{n.title}</h3>
        ))
    )

    const showLoading = () => loading? <h2 style={pageLoad}>Loading...</h2>: ""
  
    if(loading) return <Loading/>
    return (
        <div>
          
          <div className="">
          <h2>News @ my office</h2>
           
           {searchForm()}
           {showNews()}
          </div>
        </div>
    )
}



const pageLoad ={
    color:'red',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}

export default News
