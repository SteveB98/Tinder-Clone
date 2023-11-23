import logo from "../logo.png";
import colorLogo from "../tinder-logo-color.png";

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };
  const authToken = false;
  return (
    <nav>
      <div className="logo-containter">
        <img className="logo" src={minimal ? logo : colorLogo} />
      </div>

      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in{" "}
        </button>
      )}
    </nav>
  );
};
export default Nav;
