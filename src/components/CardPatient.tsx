import { usePatientStore } from "../store/patientsStore";
import { PatientStore } from "../types"
import ItemCardPatient from "./ItemCardPatient";
import { notifyDelete } from "./notifications";

type CardPatientProps = {
  patient: PatientStore
};

export default function CardPatient({ patient }: CardPatientProps) {
  const { removePatient, setIdPatientSelected } = usePatientStore();
  return (
    <div className='bg-white dark:bg-slate-800 py-8 px-4 flex flex-col gap-2 max-w-xl m-auto rounded-md shadow-md mb-4 dark:shadow-slate-700 transition-all duration-1000'>
      <ItemCardPatient nameItem="Id" valueItem={patient.id} />
      <ItemCardPatient nameItem="Nombre" valueItem={patient.name} />
      <ItemCardPatient nameItem="Propietario" valueItem={patient.owner} />
      <ItemCardPatient nameItem="Email" valueItem={patient.email} />
      <ItemCardPatient nameItem="Fecha Alta" valueItem={patient.discharge_data.toString()} />
      <ItemCardPatient nameItem="Sintomas" valueItem={patient.symptoms} />
      <div className="flex flex-col md:flex-row gap-3  justify-between">
        <button onClick={() => setIdPatientSelected(patient.id)} className="bg-blue-500 py-2 px-6 text-white uppercase text-sm font-bold rounded-sm hover:bg-blue-600 hover:cursor-pointer">Editar</button>
        <button onClick={() => {
          removePatient(patient.id)
          notifyDelete()
        }} className="bg-red-500 py-2 px-6 text-white uppercase text-sm font-bold rounded-sm hover:bg-red-600 hover:cursor-pointer">Eliminar</button>
      </div>
    </div>
  )
}
