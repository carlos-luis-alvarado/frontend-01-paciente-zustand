export type Patient = {
  name: string,
  owner: string,
  email: string,
  discharge_data: Date,
  symptoms: string
}

export type PatientStore = Patient & { id: string };

