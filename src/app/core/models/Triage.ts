import { TriageColor } from "./TriageColor";

export interface Triage {
  id?: number;
  patient_id?: number;
  triageDate?: Date;
  triageColor: TriageColor;
  notes: string;
  doctor_id?: number;
  operator_id?: number;
  state: boolean;
}
