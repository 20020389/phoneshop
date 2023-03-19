interface ProfileProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

interface EditProfileForm {
  name: string;
  phoneNumber: string;
}

interface EditProfileUseForm {
  register: import('react-hook-form').UseFormRegister<EditProfileForm>;
  handleSubmit: import('react-hook-form').UseFormHandleSubmit;
}

interface StoreData {
  uid: string;
  name: string;
  location: string;
  group: string;
  productCount: string;
  createAt: string;
  updateAt: string;
}

interface ImageData {
  file?: File;
  src?: string;
}

interface UseUpload {
  ref: React.MutableRefObject<any>;
  image: Partial<ImageData>[];
  picker: (e: any) => void;
  onChange: (callback: (image: ImageData[]) => void) => () => void;
}
