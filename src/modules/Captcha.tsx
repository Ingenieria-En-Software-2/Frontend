import ReCAPTCHA from "react-google-recaptcha"
import { useEffect } from "react";
import React, { useRef } from 'react';
import axios from 'axios';

const Captcha = () =>{
    const captchaRef = useRef(null);
    const siteKey = import.meta.env.VITE_APP_SITE_KEY; 
    const secretVar = import.meta.env.VITE_APP_SECRET_KEY;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const inputVal = await e.target[0].value;
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();

        try{
          let response = await axios.post(`http://localhost:4000/verify-token`,{
              secret:secretVar,
              response: token
          });
          console.log(response);
          return response.data;
        }catch(error){
          console.log("error ",error);
        }
    }

    return(
      <>
          
        <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="input"/>
                    <ReCAPTCHA
                      sitekey={siteKey}
                      ref={captchaRef}
                      />
            <button>Submit</button>
          </form>
      </>
    );
}
export default Captcha;
