declare interface ProductHandleProps {
  storeId: string;
  isOpen: boolean;
  onClose: () => void;
  type?: 'create' | 'update';
  refetch?: () => void;
}

interface PhoneOfferType {
  key: number;
  price: number;
  count: number;
  color: string;
  storage: string;
}

interface OfferProps {
  index?: number;
  defaultValue?: PhoneOfferType;
  onChange?: (e: PhoneOfferType, index: number) => void;
  onCopy?: () => void;
  onDelete?: () => void;
}

interface Phone<T = string[]> {
  uid: string;
  name: string;
  images: T;
  storeId: string;
  updateAt: string;
  createAt: string;
  rating?: number;
  owner?: boolean;
  phoneoffers: PhoneOffer[];
}

interface PhoneOffer {
  price: number;
  count: number;
  color: string;
  storage: string;
  uid: string;
}

type TransactionStatus = 'PROCESSING' | 'SUCCESS' | 'REFUSE';

type Transaction = {
  id: number;
  uid: string;
  status: TransactionStatus;
  userId: string | null;
  updateAt: Date;
  createAt: Date;
  storeId: number;
  products: (PhoneOffer & { name: string })[];
  user: User;
  store: StoreData;
};

type Cart<T = string[]> = {
  uid: string;
  name: string;
  images: T;
  rating?: number;
  phoneoffers: PhoneOffer[];
  count: number;
}[];

interface PhoneProfile {
  title: string;
  content: string;
}

interface PhoneDescription {
  title: string;
  content: string;
}

interface SearchData {
  phones: Phone<string>[];
  lastCalled: number;
}
