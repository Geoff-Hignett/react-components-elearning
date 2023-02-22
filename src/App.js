import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sliders from "./components/Sliders";
import SlidersGlobalBefore from "./components/SlidersGlobalBefore";
import SlidersGlobalAfter from "./components/SlidersGlobalAfter";
import CircularSliders from "./components/CircularSliders";
import MultipleChoice from "./components/MultipleChoice";
import TickAllCorrect from "./components/TickAllCorrect";
import ClickAndReveal from "./components/ClickAndReveal";
import ClickAndRevealSequential from "./components/ClickAndRevealSequential";
import DragAndDrop from "./components/DragAndDrop";
import SvgWheel from "./components/SvgTest";
import { AppProvider } from "./AppContext";

function App() {
    return (
        <div className="App">
          <AppProvider>
            <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="sliders" element={ <Sliders/> } />
              <Route path="sliders-global-before" element={ <SlidersGlobalBefore/> } />
              <Route path="sliders-global-after" element={ <SlidersGlobalAfter/> } />
              <Route path="circular-sliders" element={ <CircularSliders/> } />
              <Route path="multiple-choice" element={ <MultipleChoice/> } />
              <Route path="tick-all-correct" element={ <TickAllCorrect /> } />
              <Route path="click-and-reveal" element={ <ClickAndReveal /> } />
              <Route path="click-and-reveal-sequential" element={ <ClickAndRevealSequential /> } />
              <Route path="drag-and-drop" element={ <DragAndDrop /> } />
              <Route path="svg-wheel" element={ <SvgWheel /> } />
            </Routes>
          </AppProvider>
        </div>
    )
  }
  
  export default App
