import { Link } from "react-router-dom";
import Header from './Header';

function Home() {
  return (
    <div>
        <Header title="Home" homePage />
        <div className="container mx-auto mt-10">
            <ol>
              <li><Link to="click-and-reveal">Click and Reveal</Link></li>
              <li><Link to="click-and-reveal-sequential">Click and Reveal Sequential</Link></li>
              <li><Link to="sliders">Sliders</Link></li>
              <li><Link to="sliders-global-before">Sliders Global Before</Link></li>
              <li><Link to="sliders-global-after">Sliders Global After</Link></li>
              <li><Link to="circular-sliders">Circular Sliders</Link></li>
              <li><Link to="multiple-choice">Multiple Choice</Link></li>
              <li><Link to="tick-all-correct">Tick All Correct</Link></li>
              <li><Link to="svg-wheel">SVG (wheel)</Link></li>
              <li><Link to="drag-and-drop">Drag And Drop</Link></li>
            </ol>
        </div>
    </div>
  );
}

export default Home;