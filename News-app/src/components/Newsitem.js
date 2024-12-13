import React from 'react'
import { Link } from 'react-router-dom'


const Newsitem = (props) => {

    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        <div className="my-3 mx-4">
        <div className="card">
          <div style={{display:'flex',
                       justifyContent:'flex-end',
                       position:'absolute',
                       right:'0'
          }}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
        <img src={!imageUrl?"https://images.seattletimes.com/wp-content/uploads/2024/11/11222024_Weather-Bomb-Cyclone_tzr_220214.jpg?d=1200x630":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <Link rel="noreferrer" to={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</Link>
            </div>
        </div>
        </div>
      </div>
    )
  }

export default Newsitem