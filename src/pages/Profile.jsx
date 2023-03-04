import { Fragment, useMemo } from 'react';
import { useStore } from '../lib/zustand';
import { StoreProfile } from '../components/Profile';
import Header1 from '../components/header1';

export function Profile() {
  const user = useStore((store) => store.user);

  const renderProfile = useMemo(() => {
    if (user.role === 'STORE') {
      return <StoreProfile user={user} />;
    }
    return <Fragment></Fragment>;
  }, [user]);

  return (
    <div>
      <Header1></Header1>
      {renderProfile}
    </div>
  );
}
