
import './App.css'
import AppRouter from './Route/AppRouter'
import "react-toastify/dist/ReactToastify.css";
import {Toaster} from "./components/ui/sonner"

function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
      {/* <Toaster
        position="top-right"
        toastOptions={{
        unstyled: true,
        classNames: {
        toast: "w-[300px]  max-w-full rounded-lg px-3 py-2 shadow-lg flex items-start gap-3",
        success: "bg-green-800 text-white",
        error: "bg-red-800 text-white",
        warning: "bg-yellow-800 text-black",
        info: "bg-blue-800 text-white",
    },
  }}
/> */}
    </>
  )
}

export default App
