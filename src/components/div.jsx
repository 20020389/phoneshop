import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import '../CSS/div.css';
// import But from './button';

function Div(props) {
  return (
    <Link to={props.url}>
      <div className="pr" onClick={props.onClick}>
        <div id="imge">
          <img src={props.image} alt="" />
        </div>
        {/* <div id="wrap"></div> */}
        <div id="namePr">
          <span>{props.NamePr}</span>
        </div>
        <div id="pricePr">
          <span>{props.PricePr}</span>
        </div>
        <div id="buy">
          <Button border={'none'} outline= '0 !important' width={'90%'} height='30px' bg={'rgb(250,127,19)'} color='aliceblue'> Mua ngay </Button>
        </div>
      </div>
     </Link>
  );
}
export default Div;
