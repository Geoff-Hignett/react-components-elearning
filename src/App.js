import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import MultipleChoice from "./components/MultipleChoice"
import Contact from "./components/Contact"

function App() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="multiple-choice" element={ <MultipleChoice/> } />
          <Route path="contact" element={ <Contact/> } />
        </Routes>
      </div>
    )
  }
  
  export default App
