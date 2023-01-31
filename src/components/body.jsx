import React from 'react';

import But from './button';
import Div from './div';
import '../CSS/body.css';
import { useNavigate } from 'react-router-dom';

function Body() {
  const navigation = useNavigate();

  return (
    <div className="body">
      <div className="headBody">
        <But Name="Apple"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
      </div>
      <div className="ourPr">
        <h2>OUR PRODUCT</h2>
      </div>
      <div className="product">
        {new Array(25)
          .fill({
            image: '/image/ip14.webp',
            url: '/test',
            name: 'Iphone14 Promax',
            price: '40.000.000đ',
          })
          .map((item) => (
            <Div
              image={item.image}
              url={item.url}
              NamePr={item.name}
              PricePr={item.price}
            ></Div>
          ))}
      </div>
    </div>
  );
}
export default Body;
