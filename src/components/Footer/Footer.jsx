import { SocialIcon } from "react-social-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <>
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
          />
          <div>
            <p>Socials:</p>
            <a
              href="https://github.com/Netherix"
              style={{ marginRight: "10px" }}
            >
              <SocialIcon network="github" style={{ height: 40, width: 40 }} />
            </a>
            <a
              href="https://www.facebook.com/sean.borland.35/"
              style={{ marginRight: "10px" }}
            >
              <SocialIcon
                network="facebook"
                style={{ height: 40, width: 40 }}
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UC4Ddmg-Re-FLCofh73NTlLQ"
              style={{ marginRight: "10px" }}
            >
              <SocialIcon network="youtube" style={{ height: 40, width: 40 }} />
            </a>
            <a
              href="https://www.linkedin.com/in/sean-borland/"
              style={{ marginRight: "10px" }}
            >
              <SocialIcon
                network="linkedin"
                style={{ height: 40, width: 40 }}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
