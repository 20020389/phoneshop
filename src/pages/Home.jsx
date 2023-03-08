import Header1 from '../components/header1';
import Header2 from '../components/header2';
import Body from '../components/body';
import End from '../components/end';
import ChoosePr from '../components/ChoosePr';
import Bar from '../components/bar';
export default function Home() {
  return (
    <div className="wrapper">
      <div className="wrap2">
            <Header1 ></Header1>
            
         <div className="wrap3">
            <Header2></Header2>
            <ChoosePr></ChoosePr>
            <Body></Body>
            <Bar></Bar><br />
            <Body></Body>
            <End></End>
         </div>
      </div>
    </div>
  );
}
