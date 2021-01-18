import React from 'react'
import { useState ,useEffect} from 'react'

function Counter() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(count + 1)
        // document.title = 'You clicked {count} times'
    }

    useEffect(() =>{
        document.title = `You clicked ${count} times`

    })
    return (


        <div>
            <h3>Counter</h3>
            <button onClick={handleClick}> Clicked {count} times</button>
        </div>
    )
}

export default Counter
