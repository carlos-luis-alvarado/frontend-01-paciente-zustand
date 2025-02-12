import { toast } from "react-toastify";

export const notifySuccess = () => toast.success('Paciente registrado correctamente')
export const notifyDelete = () => toast.error('Paciente eliminado correctamente')
export const notifyUpdate = () => toast.info('Paciente actualizado correctamente')