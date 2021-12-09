import React,{useState} from "react";
import {useHistory} from "react-router-dom"
export const Signup = (props) => {
    const host="http://localhost:5000"
const [credentials, setCredentials] = useState({name:"",email:"",password:"",confirmpassword:""});
const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
let history = useHistory();
    const onSubmit= async (e)=>{
        e.preventDefault();
            //Api call
            const response = await fetch(`${host}/api/auth/createuser`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
             body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
            });
            const json = await response.json();
            if(json.success===true){
                history.push('/login');
                props.showAlert("User created successfully,please login! ","success");
            }else{
              props.showAlert("Invalid credentials","danger");
            }
    }
  return (
    <div>
       <h2>Signup To Create Your Account</h2>
        <form onSubmit={onSubmit}>
  <div className="mb-3 my-4">
    <label htmlFor="name" className="form-label" >Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange}  aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" className="form-control" minLength={5} id="exampleInputPassword1" name="password" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirmpassword" className="form-label" >Confirm Password</label>
    <input type="password" className="form-control" id="confirmpassword" minLength={5} name="confirmpassword" onChange={onChange}/>
  </div>
 { /* eslint-disable-next-line*/}
  <button type="submit" className="btn btn-primary" disabled={credentials.password!==credentials.confirmpassword || credentials.name==""}>Submit</button>
</form>
    </div>
  );
};
