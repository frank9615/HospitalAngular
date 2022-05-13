import { TriageColor } from '../../core/models/TriageColor';

export interface TriageRegistration {
  patientCf: string;
  notes: string;
  triageColor: TriageColor;
  doctor_id: number;
}
