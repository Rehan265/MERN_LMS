import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/auth-context/Auth-Context'
import InstructorContext from './context/instructor-context/InstructorContext'
import StudentContext from './context/student-context/StudentContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <InstructorContext>
          <StudentContext>
            <App />
          </StudentContext>
        </InstructorContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
