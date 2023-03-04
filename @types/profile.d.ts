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
