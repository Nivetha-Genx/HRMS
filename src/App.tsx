
import './App.css'
import Login from './Pages/Login'

import Signup from './Pages/Signup'
import OTP from './Pages/OTP'
import Resetpassword from './Pages/Resetpassword'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import  Forgot from './Pages/Forgot';
import { Toaster } from "sonner"
import Dashboard1 from './Dashboard/Dashboard1'
import Employee from './Pages/Employee'
import MasterLayout from './MasterLayout.tsx/MaterLayout'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
                
              <Route path="/" element= { <Login />} />
              <Route path="/signup" element= { <Signup />} />
              <Route path="/forgot" element= { <Forgot />} />
              <Route path="/otp" element= { <OTP />} />
              <Route path="/resetpassword" element= { <Resetpassword />} />
            

              <Route path="/masterLayout" element={<MasterLayout />}>
              <Route index element={<Dashboard1 />} /> 
              <Route path="dashboard1" element={<Dashboard1/>} />
              <Route path="employee" element={<Employee/>} />
              
            </Route>
          </Routes>
       </BrowserRouter> 
        <Toaster position="top-right" richColors />

    </>
  )
}

export default App
