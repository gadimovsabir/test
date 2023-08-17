import logo from './logo.svg';
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import './App.css';


// dont forget console.log 

function App() {

  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    var token = response.credential
    console.log("Encoded JWT ID Token: " + token);
    var userObject = jwt_decode(token);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    // change credentials 
    google.accounts.id.initialize({
      client_id: "749035568078-vusb1fvn9vutcfnrgllad36hmko8tvea.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  }, [])

    // OPTIONAL CODE BELOW - USE IF YOU WANT TO PROPT A LOG IN ON PAGE LOAD.
    //google.accounts.id.prompt();

  return (
    <div className="App">
      <div id='signInDiv'></div>
      { Object.keys(user).length != 0 &&
        <button onClick={ (e)  => handleSignOut(e)}>Sign Out</button>
      }
      
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
