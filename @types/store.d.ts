declare interface ProductHandleProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'create' | 'update';
}

interface PhoneOfferType {
  price: number;
  count: number;
  color: string;
  storage: string;
}

interface OfferProps {
  index?: number;
  defaultValue?: PhoneOfferType;
  onChange?: (e: PhoneOfferType, index: number) => void;
}
