
type ItemCardPatientProps = {
  nameItem: string,
  valueItem: string
}
export default function ItemCardPatient({ nameItem, valueItem }: ItemCardPatientProps) {
  return (
    <p className="uppercase font-bold text-sm dark:text-slate-400 transition-all duration-1000">{nameItem}:{' '}<span className="normal-case font-semibold text-gray-700 dark:text-white">{valueItem}</span></p>
  )
}
