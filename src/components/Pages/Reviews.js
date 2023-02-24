import {Link} from 'react-router-dom'
import ReviewForm from '../Reviews/ReviewForm'
import ShowReview from '../Reviews/ShowReview'

export default function Reviews(){
    return (
        <div style={{color:"red", marginTop:"100px"}}>
        <div className="container">
          <div className="form-section">
            <ReviewForm />
          </div>
          <div className="data-section">
            <ShowReview />
          </div>
      </div>
        <Link to='/ottomonMenu'>Main Page</Link>
        </div>
    )
}