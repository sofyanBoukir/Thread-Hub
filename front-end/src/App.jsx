import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { ResetPassword } from './pages/auth/ResetPassword'
import { Verification } from './pages/auth/Verification'
import { ProtectHomeRoute } from './protectedRoutes/protectHomeRoute'
import { Home } from './pages/main/Home'

export const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<Register />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/password-reset/:token' element={<ResetPassword />} />
            <Route path='/verification' element={<Verification />} />
            <Route element={<ProtectHomeRoute />}>
              <Route path='/' element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
