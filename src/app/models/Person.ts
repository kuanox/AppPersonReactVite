export interface Address {
  street: string;
  comuna: string;
  region: string;
}

export interface Person {
  id: string;
  rut: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: Address;
}
