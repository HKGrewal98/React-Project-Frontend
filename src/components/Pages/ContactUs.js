import {Link} from 'react-router-dom'

export default function ContactUs(){
    return (
        <div style={{color:"white", marginTop:"100px"}}>
        <h1>Contact Us</h1><br/>
        <h3>
            Phone : (647)-843-7890<br /><br/>
            Email : ottomonsfood@gmail.com<br /><br/>
            Address : 205 Humber College Blvd., Toronto, Ontario, Canada M9W 5L7
        </h3><br/>
        <h3>Hours of Operation : </h3>
        <ul>
            <li>Monday-Friday: 9am-9pm</li><br/>
            <li>Saturday: 10am-8pm</li><br/>
            <li>Sunday: 10am-6pm</li><br/>
        </ul>
        <Link to='/ottomonMenu'>Main Page</Link>
       </div>
    )
}