import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About"
import  Alert  from "./components/alert";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import { useState } from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}


  return (
    <>
    <Router>
   <Navbar />
   <Alert alert={alert}/>
   <div className="container my-3"> 
   <Switch>
     <Route exact path="/">
     <Home showAlert={showAlert} />
     </Route>
     <Route exact path="/about">
     <About />
     </Route>
     <Route exact path="/login">
     <Login showAlert={showAlert}/>
     </Route>
     <Route exact path="/signup">
     <Signup showAlert={showAlert}/>
     </Route>
   </Switch>
   </div>
 
    </Router>
    </>
  );
}

export default App;
