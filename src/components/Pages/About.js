import {Link} from 'react-router-dom'

export default function About(){
    return (
       <div style={{color:"red", marginTop:"100px"}}>
        <p>About</p>
        <Link to='/ottomonMenu'>Main Page</Link>
       </div>
    )
}