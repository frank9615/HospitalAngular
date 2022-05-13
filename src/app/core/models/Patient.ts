export interface Patient {
  id?: number;
  cf: string;
  name: string;
  surname: string;
  birthday: Date;
  registrationdate?: Date;
}
