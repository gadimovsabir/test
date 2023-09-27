import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { ThreeCircles } from 'react-loader-spinner'
import jwt_decode from 'jwt-decode';



function App() {
    
  /* global google */

  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // loggedIn state var

  function handleCallbackResponse(response) {
    var token = response.credential
    var userObject = jwt_decode(token);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    closeModal()
    setLoggedIn(true); // logged in
    console.log(userObject)
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    setLoggedIn(false);
    darkModeToggle();
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "749035568078-vusb1fvn9vutcfnrgllad36hmko8tvea.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.disableAutoSelect();
  }, []);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // loader timeout
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    console.log('logged in ' + loggedIn); // log loggedIn status here
  }, [loggedIn]); // log when loggedIn changes


  const loaderStyle = {
    opacity: isLoading ? 1 : 0, // visible when loading = true
    transition: 'opacity 1.5s ease-in-out', // transition time
  };


  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  const darkModeToggle = () => {
    document.body.classList.toggle('dark-mode-variables');
    const spans = document.querySelectorAll('.dark-mode span');
    spans.forEach((span) => {
      span.classList.toggle('active');
    });
  };

  const Orders = [  
    {
      productName: 'Product 1',
      productNumber: '001',
      paymentStatus: 'Paid',
      status: 'Pending',
    },
    {
      productName: 'Product 2',
      productNumber: '002',
      paymentStatus: 'Unpaid',
      status: 'Declined',
    },
    
  ];


  return (
    <div className="main_page">
      <div id="signInDiv"></div>
      <div>
        <div style={loaderStyle} className="loader_anim">
          <ThreeCircles
            height="250"
            width="250"
            color="#9BE9EE"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
        {isLoading ? null : ( // hide all content when loading = true
          <>
            {!loggedIn && (
              <div className="login">
                <img src="./images/msm.png" alt="Logo" />
                <button className="login-button" onClick={openModal}>
                  Log In
                </button>
              </div>
            )}
            {loggedIn && (
              <div className="logged-in-content">
                {/* content for logged in user */}
                    <div class="container">
                        <aside>
                            <div class="toggle">
                                <div class="logo">
                                    <h2>MSM<span class="danger">.az</span></h2>
                                </div>
                                <div class="close" id="close-btn">
                                    <span class="material-icons-sharp">
                                    close
                                    </span>
                                </div>
                            </div>
                            <div class="sidebar">
                                <a href="#">
                                    <i className="bx bx-message-dots"></i>
                                    <h3>SMS Göndəriş</h3>
                                </a>
                                <a href="#">
                                    <i className="bx bx-file"></i>
                                    <h3>Hesabatlar</h3>
                                </a>
                                <a href="#">
                                    <i className="bx bx-group"></i>
                                    <h3>Qruplar</h3>
                                </a>
                                <a href="#">
                                    <i className="bx bx-message-check"></i>
                                    <h3>Hazır Mesajlar</h3>
                                </a>
                                <a href="#">
                                    <i className="bx bx-list-ul"></i>
                                    <h3>Qara Siyahı</h3>
                                </a>
                                <a href="#"  class="active">
                                    <i className="bx bx-code-alt"></i>
                                    <h3>Admin</h3>
                                </a>
                                <a href="#">
                                <i className='bx bx-log-out'></i>                       
                                <button className='logout-button' onClick={ handleSignOut }>Logout</button>
                                </a>
                            </div>
                        </aside>
                        <main>
                            <h1>Analytics</h1>
                            <div class="analyse">
                                <div class="sales">
                                    <div class="status">
                                        <div class="info">
                                            <h3>SMS Sayısı</h3>
                                            <h1>3,543,859</h1>
                                        </div>
                                        <div class="progresss">
                                            <svg>
                                                <circle cx="38" cy="38" r="36"></circle>
                                            </svg>
                                            <div class="percentage">
                                                <p>+81%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="visits">
                                    <div class="status">
                                        <div class="info">
                                            <h3>Online Customers</h3>
                                            <h1>173</h1>
                                        </div>
                                        <div class="progresss">
                                            <svg>
                                                <circle cx="38" cy="38" r="36"></circle>
                                            </svg>
                                            <div class="percentage">
                                                <p>-48%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="searches">
                                    <div class="status">
                                        <div class="info">
                                            <h3>Current User</h3>
                                            <h1>MSM</h1>
                                        </div>
                                        <div class="progresss">
                                            <svg>
                                                <circle cx="38" cy="38" r="36"></circle>
                                            </svg>
                                            <div class="percentage">
                                                <p>Change</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="new-users">
                                <h2>Admin Panel</h2>
                                <div class="user-list">
                                    <div class="user">
                                        <h2>Müştəri</h2>
                                    </div>
                                    <div class="user">
                                        <h2>Sendername</h2>
                                    </div>
                                    <div class="user">
                                        <h2>AddUser</h2>
                                    </div>
                                    <div class="user">
                                        <h2>ListUser</h2>
                                    </div>
                                    <div class="user">
                                        <h2>System Blacklist</h2>
                                    </div>
                                    <div class="user">
                                        <h2>Balance</h2>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <div class="right-section">
                            <div class="nav">
                                <button id="menu-btn" onClick={toggleSideMenu}>
                                <span class="material-icons-sharp">
                                menu
                                </span>
                                </button>
                                <div class="dark-mode" onClick={darkModeToggle}>
                                    <span class="material-icons-sharp active">
                                    <i className="bx bx-sun"></i>
                                    </span>
                                    <span class="material-icons-sharp">
                                    <i className="bx bx-moon"></i>
                                    </span>
                                </div>
                                <div class="profile">
                                    {loggedIn ? (
                                    <div className="info">
                                        <p>Hey, <b>{user.name}</b></p>
                                        <small className="text-muted">System Admin</small>
                                    </div>
                                    ) : (
                                    <>
                                    <p>Welcome</p>
                                    </>
                                    )}
                                    {loggedIn && (
                                    <div className="profile-photo">
                                        <img src={user.picture} alt="profile picture" />
                                    </div>
                                    )}
                                </div>
                            </div>
                            <div class="user-profile">
                                <div class="logo">
                                    <img src={user.picture} alt="profile" />
                                    <h2>{user.name}</h2>
                                    <p>System Admin</p>
                                </div>
                            </div>
                            <div className="reminders">
                                <div className="header">
                                    <h2>Reminders</h2>
                                    <span className="material-icons-sharp">
                                    <i className="bx bx-bell"></i>
                                    </span>
                                </div>
                                <div class="notification">
                                    <div class="icon">
                                        <span class="material-icons-sharp">
                                        <i className="bx bx-folder-open"></i>
                                        </span>
                                    </div>
                                    <div class="content">
                                        <div class="info">
                                            <h3>Detallı Hesabat</h3>
                                            <small class="text_muted">
                                            08:00 AM - 12:00 PM
                                            </small>
                                        </div>
                                        <span class="material-icons-sharp">
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="notification deactive">
                                    <div class="icon">
                                        <span class="material-icons-sharp">
                                        <i className="bx bx-folder-open"></i>
                                        </span>
                                    </div>
                                    <div class="content">
                                        <div class="info">
                                            <h3>Status Report</h3>
                                            <small class="text_muted">
                                            08:00 AM - 12:00 PM
                                            </small>
                                        </div>
                                        <span class="material-icons-sharp">
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="notification add-reminder">
                                    <div>
                                        <span class="material-icons-sharp">
                                        <i className="bx bx-plus"></i>
                                        </span>
                                        <h3>Add Reminder</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
            )}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Login with</h2>
                        <div className="modal-buttons">
                            <button className="modal-button" onClick={() => google.accounts.id.prompt()}>
                            <i className="fas fa-google"></i> Google
                            </button>
                            <button className="modal-button">
                            <i className="fab fa-github"></i> Github
                            </button>
                            <button className="modal-button">
                            <i className="fab fa-bitbucket"></i> Bitbucket
                            </button>
                            <button className="modal-button">
                            <i className="fas fa-phone"></i> Phone Number
                            </button>
                            <button className="modal-button">
                            <i className="fas fa-envelope"></i> E-Mail
                            </button>
                        </div>
                        <button onClick={closeModal} className="modal-close-button">
                        Close
                        </button>
                    </div>
                </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};


export default App;






