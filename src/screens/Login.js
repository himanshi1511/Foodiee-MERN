import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    // alert('Sign Up Successful!');
    // preDefault is synthetic event
    // Synthetic events in React provide a consistent interface across different browsers. They have properties and methods similar to native DOM events.
    e.preventDefault(); // prevents the default click behavior

    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const jsonData = await response.json();

      if (!jsonData.success) {
        alert("Enter Your Credentials Carefully");
      }else {
        console.log("Form Data Submitted Successfully");
        console.log(credentials);
      }
      if(jsonData.success){
        localStorage.setItem("userEmail" , credentials.email);
        localStorage.setItem("authToken",jsonData.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.log("Error while Submitting your form");
    }

  };

  const onChange = (event) => {
    // updating the crendentials, which r given by user
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button
            variant="success"
            type="submit"
            className="m-3 btn btn-success"
          >
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  );
}

