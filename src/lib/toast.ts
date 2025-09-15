
import { toast } from "sonner"

export const successToast = (message: string, description?: string) =>
  toast.success(message, {
    description,
    className: "bg-green-700 text-white border-none",
  })

export const errorToast = (message: string, description?: string) =>
  toast.error(message, {
    description,
    className: "bg-red-700 text-white border-none",
  })

export const warningToast = (message: string, description?: string) =>
  toast(message, {
    description,
    className: "bg-yellow-600 text-black border-none",
  })

export const infoToast = (message: string, description?: string) =>
  toast(message, {
    description,
    className: "bg-blue-600 text-white border-none",
  })
