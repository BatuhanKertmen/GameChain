import React from 'react';

const ProductRow = (props) => {
  return (
    <div className="margin-top-big row product ">
      <div className="col-md-2">
        <img src={props.img} alt="Video Game" height="150" />
      </div>
      <div className="col-md-8 product-detail">
        <h4>{props.title}</h4>
        <p>{props.desc}</p>
      </div>
      <div className="col-md-2 product-price">
        {props.price}
      </div>
    </div>
  );
}

export default ProductRow;