import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { ResetPassword } from './pages/auth/ResetPassword'
import { Verification } from './pages/auth/Verification'
import { ProtectHomeRoute } from './protectedRoutes/protectHomeRoute'
import { Home } from './pages/main/Home'
import { Search } from './pages/main/Search'
import { Activity } from './pages/main/Activity'
import { CreateThread } from './pages/main/CreateThread'
import { Profile } from './pages/main/Profile'
import { Communities } from './pages/main/Communities'
import { ViewUser } from './pages/main/ViewUser'
import { ViewThread } from './pages/main/ViewThread'
import { ViewCommunity } from './pages/main/ViewCommunity'

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
              <Route path='/search' element={<Search />} />
              <Route path='/activity' element={<Activity />} />
              <Route path='/createThread' element={<CreateThread />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/communities' element={<Communities />} />
              <Route path='/search/:username' element={<ViewUser />} />
              <Route path='/avtivity/viewThread/:threadId' element={<ViewThread />} />
              <Route path='/communities/community/:communityId' element={<ViewCommunity />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
