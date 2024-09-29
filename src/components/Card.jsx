import React from 'react';

function Card({ title, description,details, imageUrl }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{details}</p>
      </div>
    </div>
  );
}

export default Card;