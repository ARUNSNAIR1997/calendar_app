import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const hardcodedCredentials = {
  email: 'staff@clinic.com',
  password: '123456',
};


function Login(){


const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === hardcodedCredentials.email && password === hardcodedCredentials.password) {
      navigate('/calendar');
    } else {
      alert('Invalid credentials');
    }
  };

    return(
        <>

    <section className="userlogin vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="a hospital image.png"
                alt="login form" className="img-fluid w-100 vh-100 object-fit-cover" />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form onSubmit={handleLogin}>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-hospital fa-2x me-3"></i>
                    <span className="h1 fw-bold mb-0">Hospital</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>

                  <div data-mdb-input-init className="mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <label className="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div data-mdb-input-init className="mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <label className="form-label" for="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}


export default Login