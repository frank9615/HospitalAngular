import { TriageColor } from "./TriageColor";

export interface Triage {
  id?: number;
  patientId?: number;
  triageDate?: Date;
  triageColor: TriageColor;
  notes: string;
  doctorId?: number;
  operatorId?: number;
  state: boolean;
}
