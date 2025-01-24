import { SocialIcon } from "react-social-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="spidey-text">
          <p>
            This app was created by Sean Borland! It is also approved by
            Spider-Man, just saying 😉 If you like what I do, check out my
            &nbsp;
            <a href="https://netherix.github.io/Front-end-Portfolio/index.html">
              portfolio!
            </a>
          </p>
          <img
            src="src/assets/ok_spidey_transparent.png"
            style={{ width: "250px", height: "150px" }}
          />
        </div>
        <div className="social-links">
          <p>Socials:</p>
          <SocialIcon network="github" style={{ height: 40, width: 40 }} />
          <SocialIcon network="facebook" style={{ height: 40, width: 40 }} />
          <SocialIcon network="youtube" style={{ height: 40, width: 40,  }} />
          <SocialIcon network="linkedin" style={{ height: 40, width: 40 }} />
        </div>
      </div>
    </>
  );
};

export default Footer;
