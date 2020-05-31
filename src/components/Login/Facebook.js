import React from "react";

const handleAuth = async (e) => {
  e.preventDefault();
 window.location.assign("https://kaldi-api.herokuapp.com/auth/fb/login")
};
const Facebook = () => (
  <button className="facebook" onClick={handleAuth}>
    Facebook
  </button>
);

export default Facebook;
