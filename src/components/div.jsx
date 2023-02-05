import { Link } from 'react-router-dom';
import '../CSS/div.css';
import But from './button';

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
          <But Name="Mua Ngay"></But>
        </div>
      </div>
     </Link>
  );
}
export default Div;
