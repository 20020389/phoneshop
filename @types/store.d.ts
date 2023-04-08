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
  phoneoffers: PhoneOffer[];
}

interface PhoneOffer {
  price: number;
  count: number;
  color: string;
  storage: string;
}

type Cart<T = string[]> = {
  uid: string;
  name: string;
  images: T;
  rating?: number;
  phoneoffers: PhoneOffer[];
  count: number;
}[];
