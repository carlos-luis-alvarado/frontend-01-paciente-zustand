import { usePatientStore } from "../store/patientsStore";
import CardPatient from "./CardPatient";


export default function List() {
  const { patients } = usePatientStore();
  return (
    <div className="w-full">
      <div className="my-4 text-center flex flex-col gap-2">
        {
          (patients.length == 0) ?
            <>
              <h2 className="font-black text-2xl dark:text-white transition-all duration-1000">No hay pacientes</h2>
              <p className="font-semibold text-sm dark:text-white transition-all duration-1000">Comienza agregando pacientes<span className="text-violet-700">y apareceran en este lugar</span></p>
            </>
            :
            <>
              <h2 className="font-black text-2xl dark:text-white transition-all duration-1000 ">Listado de Pacientes</h2>
              <p className="font-semibold text-sm dark:text-white transition-all duration-1000">Administra tus <span className="text-violet-700">Pacientes y Citas</span></p>
            </>
        }
      </div>
      <div className="h-[30rem] overflow-y-scroll  ">
        {
          patients.map(patient => (
            <CardPatient key={patient.id} patient={patient} />
          ))
        }

      </div>
    </div>
  )
}
