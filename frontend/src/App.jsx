import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./routes/Register"
import Dashboard from "./routes/Dashboard"
import Login from "./routes/Login"
import Error from "./routes/Error"

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<Error/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
