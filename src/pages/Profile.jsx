import { Fragment, useMemo } from 'react';
import { useStore } from '../lib/zustand';
import { Profile } from '../components/Profile';
import Header1 from '../components/header1';
import { Outlet } from 'react-router-dom';

export function ProfilePage() {
  const user = useStore((store) => store.user);

  const renderProfile = useMemo(() => {
    if (user.role === 'STORE') {
      return <Fragment></Fragment>;
    }
    return <Fragment></Fragment>;
  }, [user]);

  return (
    <div>
      <Header1 />
      <Profile user={user} />
    </div>
  );
}
