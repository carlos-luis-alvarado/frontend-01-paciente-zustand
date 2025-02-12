import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Patient, PatientStore } from '../types'
import { devtools, persist } from 'zustand/middleware';

type PatientList = {
  patients: PatientStore[],
  idPatientSelected: PatientStore['id'],
  setIdPatientSelected: (id: PatientStore['id']) => void,
  getIdPatientSelected: () => PatientStore['id'],
  addPatient: (newPatient: Patient) => void,
  removePatient: (id: PatientStore['id']) => void,
  editPatient: (patient: PatientStore) => void,
  getPatientId: (id: PatientStore['id']) => PatientStore | string
}

export const usePatientStore = create<PatientList>()(
  devtools(
    persist(
      (set, get) => ({
        patients: [],
        idPatientSelected: '',
        getIdPatientSelected: () => get().idPatientSelected,
        setIdPatientSelected: (id: PatientStore['id']) => set(() => ({
          idPatientSelected: id
        })),
        addPatient: (newPatient: Patient) => set((state) => ({
          patients: [...state.patients, { ...newPatient, id: uuidv4() }]
        })),
        removePatient: (id) => set((state) => ({
          patients: state.patients.filter(patient => patient.id !== id)
        })),
        editPatient: (patientUpdate) => set((state) => ({
          patients: state.patients.map(patient => {
            if (patientUpdate.id == patient.id) {
              return patientUpdate
            }
            return patient
          })
        })),
        getPatientId: (id) => {
          const patient = get().patients.find(patient => patient.id == id)
          return patient ? patient : ''
        }

      }),
      { name: 'patientsStore' }
    )
  )
)