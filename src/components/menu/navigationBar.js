import '../../styles/navBar.css';
import favicon from "../../assets/images/favicon.png";
import AccountButton from './accountButton';


const Navbar = () => {
    return (
        <div className="navigationBar">

            <div className="gameLogoPanel">
                <img src={favicon} className="gameLogo" alt="gameLogo"/>
                <h2 className="GameTitle">Bomb Da ECI</h2>
            </div>

            <AccountButton />

        </div>
    );
  };
  
export default Navbar;



