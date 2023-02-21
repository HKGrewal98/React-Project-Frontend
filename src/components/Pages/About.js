import React from "react";
import {Link} from 'react-router-dom'

const About = () => {
    return (
        <div style={{color:"red", marginTop:"100px"}}>
         <p>About Us</p>
         <p>we pride ourselves on serving the freshest ingredients, handpicked by our experienced chefs, to create mouth-watering dishes that will leave you wanting more. From classic comfort food to modern twists on old favorites, we have something for everyone.</p>

<p>With our easy-to-use online food ordering app, you can browse our extensive menu, place your order, and have it delivered right to your doorstep. You can also choose to pick up your order at your convenience, without having to wait in long lines.</p>

<p> Our dishes are made with love and care, using only the best quality ingredients, ensuring that every bite is bursting with flavor.</p>

<p>So why wait? Order online and enjoy the convenience of having your favorite dishes today!</p>
         <Link to='/ottomonMenu'>Main Page</Link>
        </div>
     );
  };
export default About;