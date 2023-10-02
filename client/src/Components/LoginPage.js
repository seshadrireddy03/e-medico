import React from 'react';
import '../css/main.css'; // Make sure this points to the correct path of your CSS file
import don from "../assests/p.jpg";
import vol from "../assests/v.jpeg";
import rec from "../assests/d.jpg";
import { Link } from 'react-router-dom';
const LoginPage = () => {
  return (
    <div>
      <div className="nav">
        <div className="head">
          <h2>FeedNow</h2>
        </div>
        <ul>
          <li>Home</li>
          <li>Service</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
      </div>
      <div className="container">
        <div className="button_text">
          <Link to="/Dlogin">
            <img className="imge" src={don} alt="Donor Login" />
          </Link>
          <div className="button_label">Donor</div>
        </div>
        <div className="button_text">
          <Link to="/VolunterLogin">
            <img className="imge" src={vol} alt="Volunter Login" />
          </Link>
          <div className="button_label">Volunter</div>
        </div>
        <div className="button_text">
          <Link to="/RecipientLogin">
            <img className="imge" src={rec} alt="Recepient Login" />
          </Link>
          <div className="button_label">Recepient</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;