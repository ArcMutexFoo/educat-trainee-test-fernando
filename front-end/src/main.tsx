import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import ListAll from './components/ListAll.tsx'
import CreateOneTask from './components/CreateOne.tsx'
import UpdateOne from './components/UpdateOne.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ListAll />} />
      <Route path='/update/:id' element={<UpdateOne />} />
      <Route path='/create' element={<CreateOneTask />} />
    </Routes>

  </BrowserRouter>,
)
