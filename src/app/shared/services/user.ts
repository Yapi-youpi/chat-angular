export interface User {
  login?: string;
  uid: string;
  email: string;
  displayName?: {
    editForm: string;
  };
  photoURL?: string;
}
