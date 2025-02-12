import { SubmitHandler, useForm } from "react-hook-form"
import { Patient, PatientStore } from "../types"
import { ErrorMessageForm } from "./ErrorMessageForm";
import { usePatientStore } from "../store/patientsStore";
import { useEffect } from "react";
import { notifySuccess, notifyUpdate } from "./notifications";

export default function Form() {
  const { addPatient, idPatientSelected, getPatientId, getIdPatientSelected, setIdPatientSelected, editPatient } = usePatientStore();
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Patient>({
    defaultValues: {
      name: '',
      owner: '',
      email: '',
      discharge_data: new Date(),
      symptoms: ''
    }
  })

  useEffect(() => {
    const result: PatientStore | string = getPatientId(getIdPatientSelected())
    if (typeof result !== 'string') {
      setValue('name', result.name)
      setValue('owner', result.owner)
      setValue('email', result.email)
      setValue('discharge_data', result.discharge_data)
      setValue('symptoms', result.symptoms)
    }


  }, [idPatientSelected])

  const clearForm = () => {
    reset({
      name: '',
      owner: '',
      email: '',
      discharge_data: new Date(),
      symptoms: ''
    })
  }

  const onSubmit: SubmitHandler<Patient> = data => {
    if (idPatientSelected == '') {
      addPatient(data)
      notifySuccess()
    } else {
      editPatient({
        ...data,
        id: idPatientSelected
      })
      notifyUpdate()
    }
    clearForm()
    setIdPatientSelected('')
  };
  return (
    <div className="w-full">
      <div className="my-4 text-center flex flex-col gap-2">
        <h2 className="font-black text-2xl dark:text-white transition-all duration-1000">Seguimiento Pacientes</h2>
        <p className="font-semibold text-sm dark:text-white transition-all duration-1000">Añade Pacientes y <span className="text-violet-700">Administralos</span></p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} action="" className="bg-white dark:bg-slate-800 dark:text-white py-8 px-4 flex flex-col gap-4 max-w-xl m-auto rounded-md shadow-md dark:shadow-slate-700 transition-all duration-1000">
        <div className="flex flex-col gap-1">
          <label className="uppercase font-black text-xs" htmlFor="paciente">Paciente</label>
          <input
            {...register('name', { required: 'El nombre del paciente es requerido', minLength: { value: 2, message: 'El nombre debe tener al menos dos caracteres' } })}
            aria-invalid={errors.name ? "true" : "false"}
            className="border border-gray-300 p-1 dark:border-slate-600 placeholder:text-slate-700 dark:placeholder:text-slate-500" type="text" id="paciente" placeholder="Nombre del paciente"
          />
          {errors.name && <ErrorMessageForm message={errors.name.message} />}
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase font-black text-xs" htmlFor="propietario">Propietario</label>
          <input {...register('owner', { required: 'El propietario es obligatorio' })}
            className="border border-gray-300 p-1 dark:border-slate-600 placeholder:text-slate-700 dark:placeholder:text-slate-500" type="text" id="propietario" placeholder="Nombre del propietario"
          />
          {errors.owner && <ErrorMessageForm message={errors.owner.message} />}
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase font-black text-xs" htmlFor="email">Email</label>
          <input {...register('email', {
            required: 'El email es obligatorio', pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email No Válido'
            }
          })} className="border border-gray-300 p-1 dark:border-slate-600 placeholder:text-slate-700 dark:placeholder:text-slate-500" type="email" id="email" placeholder="Nombre del propietario" />
          {errors.email && <ErrorMessageForm message={errors.email.message} />}
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase font-black text-xs" htmlFor="fecha_alta">Fecha Alta</label>
          <input {...register('discharge_data', { required: 'La fecha de alta es obligatoria' })} className="border border-gray-300 p-1 dark:border-slate-600 placeholder:text-slate-700 dark:placeholder:text-slate-500 scheme-light" type="date" id="fecha_alta" />
          {errors.discharge_data && <ErrorMessageForm message={errors.discharge_data.message} />}
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase font-black text-xs" htmlFor="sintomas">Sintomas</label>
          <textarea {...register('symptoms', { required: 'Los sintomas son obligatorios' })} className="border border-gray-300 p-1 dark:border-slate-600 placeholder:text-slate-700 dark:placeholder:text-slate-500" id="sintomas" placeholder="Sintomas del paciente" />
          {errors.symptoms && <ErrorMessageForm message={errors.symptoms.message} />}
        </div>
        <input className="bg-blue-600 text-white p-2 uppercase font-bold hover:bg-blue-700 hover:cursor-pointer hover:transition-colors" type="submit" value="Guardar Paciente" />
      </form>
    </div>
  )
}
