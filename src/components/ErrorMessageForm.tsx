
type MessageError = {
  message?: string
}
export function ErrorMessageForm({ message }: MessageError) {
  return (
    <p className="bg-red-600 text-white text-center p-2 uppercase text-xs font-bold">{message}</p>
  )
}



