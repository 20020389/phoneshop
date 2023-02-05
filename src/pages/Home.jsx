import Header1 from '../components/header1';
import Header2 from '../components/header2';
import Body from '../components/body';
import End from '../components/end';

export default function Home() {
  return (
    <div className="wrapper">
      <div className="wrap2">
            <Header1 ></Header1>
            
         <div className="wrap3">
            <Header2></Header2>
            <Body></Body>
            <End></End>
         </div>
      </div>
    </div>
  );
}
