export enum EmployeeRole {
  ADMIN = "admin",
  SPECIALIST = "specialist",
  ASSISTANT = "assistant",
}

export enum TranslatedEmployeeRole {
  admin = "Administrador",
  specialist = "Especialista",
  assistant = "Asistente",
}

export interface Hospital {
  id: number;
  name: string;
}
export interface Employee {
  id: number;
  name: string;
  lastname: string;
  email: string;
  identification: string;
  password: string;
  hospital: Hospital;
  role: EmployeeRole;
  deletedAt: Date;
}
