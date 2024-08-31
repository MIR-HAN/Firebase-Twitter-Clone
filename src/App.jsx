import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Protected from './pages/Protected'
import Feed from './pages/Feed'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}/>

      <Route element={<Protected/>}>
      <Route path='/home' element={<Feed/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App