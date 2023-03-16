interface User {
  id: number;
  uid: string;
  email: string;
  password: string;
  name: string;
  image: string;
  phoneNumber: string;
  profile: string;
  role: 'STORE' | 'DEFAULT';
  verified: Boolean;
  updateAt: string;
  lastLogin: string;
  registeredAt: string;
}

enum UserRole {
  STORE,
  DEFAULT,
}

interface Store {
  user?: User;
  loading: boolean;
  setUser: (user?: User) => void;
  setLoading: (loading: boolean) => void;
}

type StoreCallback<T> = (store: Store) => T;

type DynamicObject = {
  [key: string]: any;
};

type State<T> = [T, (e: T) => void];

interface UseStore {
  (): Store;
  <T>(callback: StoreCallback<T>): T;
}
