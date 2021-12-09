import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
export const Login = (props) => {
    const host="http://localhost:5000"
const [credentials, setCredentials] = useState({email:"",password:""});
const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
let history = useHistory();
    const onSubmit= async (e)=>{
        e.preventDefault();
            //Api call
            const response = await fetch(`${host}/api/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
             body:JSON.stringify({email:credentials.email,password:credentials.password})
            });
            const json = await response.json();
            if(json.success===true){
                localStorage.setItem("token",json.authtoken);
                history.push('/');
                props.showAlert("logged in successfully","success");

            }else{
                props.showAlert("Invalid credentials","danger");
            }
    }
    return (
        <div>
          <h2>Login To Continue Cloud Notes</h2>
           <form onSubmit={onSubmit}>
  <div class="mb-3 my-4">
    <label for="exampleInputEmail1" class="form-label" >Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" name="email" onChange={onChange}  aria-describedby="emailHelp" />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label" >Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" name="password" onChange={onChange}/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    )
}
