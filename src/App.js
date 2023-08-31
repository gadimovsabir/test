import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import MSM from "./assets/msm.png"
import './App.css';

/* global google */
// dont forget console.log 

function App() {

  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function handleCallbackResponse(response) {
    var token = response.credential
    var userObject = jwt_decode(token);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    closeModal()
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "749035568078-vusb1fvn9vutcfnrgllad36hmko8tvea.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.disableAutoSelect();
  }, []);

  return (
    <>
      <div id='signInDiv'></div>
      <div className="App">
        <div className="App-Header">
          <div className="App-Header-Left">
            <div><img src={MSM}></img></div>
            <h1>SMS Göndəriş</h1>
            <h1> Hesabatlar</h1>
            <h1> Qruplar</h1>
            <h1> Hazır mesajlar</h1>
            <h1>Qara siyahı</h1>
            <h1> Admin</h1>
          </div>  
          <div className="App-Header-Right">
            {Object.keys(user).length !== 0 ? (
              <>
                <h1>{user.name}</h1>
                <button onClick={(e) => handleSignOut(e)}>Çıxış</button>
              </>
            ) : (
              <button onClick={openModal}>Log In</button>
            )}
          </div>
        </div>
        <div className="App-Footer">
          <div> <h1>MSMT LLC Mobile Solutions & Marketing</h1> <p>© 2023 - Bütün hüquqları qorunur.</p> </div>
          <div><h1>Kaveroçkin küç 127-129 m 8 AZ1007 Bakı</h1> <p>Telefon: (+994 12) 441 55 11</p> </div>
          <div><h1>info@msm.az</h1> <p>Texniki dəstək : (+994 12) 441 55 11</p> </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Login with</h2>
            <div className="modal-buttons">
              <button className="modal-button" onClick={() => google.accounts.id.prompt()}>Google</button>
              <button className="modal-button">Github</button>
              <button className="modal-button">Bitbucket</button>
              <button className="modal-button">Phone Number</button>
              <button className="modal-button">E-Mail</button>
            </div>
            <button onClick={closeModal} className="modal-close-button">Close</button>
          </div>
        </div> 
      )}
    </>
  );
}

export default App;
