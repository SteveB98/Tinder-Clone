import Nav from "../components/Nav";
import { useState } from "react";
import React from "react";
import AuthModal from "../components/AuthModal";
import '../index.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);
  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
    setIsSignUp(true);
  };

  const handleModalOpen = () => {
    setIsModalActive(true);
  };

  const handleModalClose = () => {
    setIsModalActive(false);
  };
  
  return (
    <div className={`overlay ${isModalActive ? 'blur' : ''}` }>
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
        isSignUp={isSignUp}
        onClose={handleModalClose}
      />
      <div className="home">
        <h1 class="slideInLeft" className="primary-title">Swipe Right</h1>
        <button className="primary-button"
         onClick={() => {handleClick();
                        handleModalOpen();
                        setShowModal(true);
         }}>
          {authToken ? "Signout" : "Create Account"}
        </button>
        {showModal && (
          <AuthModal showModal={showModal} setShowModal={setShowModal} isSignUp={isSignUp} onClose={handleModalClose} />
        )}
      </div>
    </div>
  );
};
export default Home;
