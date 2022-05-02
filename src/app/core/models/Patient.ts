export interface Patient {
  id?: number;
  cf: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  registrationDate?: Date;
}
