import React from 'react'

function Loading() {
    return (
        <div >
            <h2 style={pageLoad}>Loading...</h2>
        </div>
    )
}

const pageLoad ={
    color:'red',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}


export default Loading