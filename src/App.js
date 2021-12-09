import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About"
import { Alert } from "./components/alert";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
function App() {
  return (
    <>
    <Router>
   <Navbar />
   <Alert message={"this is alert"}/>
   <div className="container my-3"> 
   <Switch>
     <Route exact path="/">
     <Home />
     </Route>
     <Route exact path="/about">
     <About />
     </Route>
     <Route exact path="/login">
     <Login />
     </Route>
     <Route exact path="/signup">
     <Signup />
     </Route>
   </Switch>
   </div>
 
    </Router>
    </>
  );
}

export default App;
