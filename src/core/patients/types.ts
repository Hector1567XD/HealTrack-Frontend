import { Employee, Hospital } from "core/employees/types";

export enum SurgeryType {
  SURGERYTYPE1 = "A",
  SURGERYTYPE2 = "B",
  SURGERYTYPE3 = "C",
}

export interface Patient {
  id: number;
  name: string;
  lastname: string;
  age: number;
  address: string;
  personalPhone: string;
  homePhone: string;
  email: string;
  identification: string;
  hospital: Hospital;
  password: string;
  surgeryDate: string;
  surgeryProcedure: string;
  surgeryType: SurgeryType;
  deletedAt: Date;
  medic: Employee;
}
