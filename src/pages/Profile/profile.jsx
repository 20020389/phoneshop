import { Fragment } from 'react';
import { useStore } from 'src/lib/zustand';
import { StoreProfile } from './StoreProfile';

export function Profile() {
  const user = useStore((store) => store.user);

  if (user.role == 'STORE') {
    return <StoreProfile user={user} />;
  }

  return <Fragment></Fragment>;
}
