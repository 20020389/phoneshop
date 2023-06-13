import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStoreData } from '../../hooks/useStoreData';

// /**
//  *
//  * @param {{
//  *  user?: User
//  * }} param0
//  */

export function StoreNavigate() {
  const location = useLocation();
  const query = useParams();
  const { data } = useStoreData(query.storeid);

  return (
    <div className="flex">
      <Link to={`/profile/store/${data?.uid}`}>Products</Link>
      <Link to={`/profile/store/${data?.uid}/transactions`}>Transactions</Link>
    </div>
  );
}
