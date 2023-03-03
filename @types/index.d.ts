interface User {
  id: number;
  uid: String;
  email: String;
  password: String;
  name: String;
  image: String;
  phoneNumber: String;
  profile: String;
  role: 'STORE' | 'DEFAULT';
  verified: Boolean;
  updateAt: String;
  lastLogin: String;
  registeredAt: String;
}

enum UserRole {
  STORE,
  DEFAULT,
}

interface Store {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

type StoreCallback<T> = (store: Store) => T;

interface UseStore {
  <T>(callback: StoreCallback<T>): T;
}
