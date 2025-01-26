import { SocialIcon } from "react-social-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <p>
          This app was created by Sean Borland! It is also approved by
          Spider-Man, just saying. If you like what I do, check out my &nbsp;
          <a href="https://netherix.github.io/Front-end-Portfolio/index.html">
            portfolio!
          </a>
        </p>
        <img
          src="/src/assets/ok_spidey_transparent.png"
          style={{ width: "250px", height: "150px" }}
          alt="Spider-Man giving a thumbs up"
        />
        <div>
          <p>Socials:</p>
          <SocialIcon
            url="https://github.com/Netherix"
            style={{ height: 40, width: 40, marginRight: "10px" }}
          />
          <SocialIcon
            url="https://www.facebook.com/sean.borland.35/"
            style={{ height: 40, width: 40, marginRight: "10px" }}
          />
          <SocialIcon
            url="https://www.youtube.com/channel/UC4Ddmg-Re-FLCofh73NTlLQ"
            style={{ height: 40, width: 40, marginRight: "10px" }}
          />
          <SocialIcon
            url="https://www.linkedin.com/in/sean-borland/"
            style={{ height: 40, width: 40, marginRight: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
