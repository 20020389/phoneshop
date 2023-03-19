declare interface ProductHandleProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'create' | 'update';
}
