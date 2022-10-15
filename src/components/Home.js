import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto">
      <h1>This is the home page</h1>
      <Link to="about">Click to view our about page</Link>
      <Link to="contact">Click to view our contact page</Link>
    </div>
  );
}

export default Home;