declare interface ProductHandleProps {
  storeId: string;
  isOpen: boolean;
  onClose: () => void;
  type?: 'create' | 'update';
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
