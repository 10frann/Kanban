import gitHub from '../assets/logoGitHub.png'
import linkeDin from '../assets/logoLinkedin.png'

export const Footer = () => {
    return (
        <div id="footer">
            <p>
                ©️ Francisco López Serrano
            </p>
                <a href="https://github.com/10frann">
                    <img src={gitHub} alt="" width={"50px"}/>
                </a>
                <a href="https://www.linkedin.com/in/francisco-l%C3%B3pez-serrano-25b420292/">
                    <img src={linkeDin} alt="" width={"30px"}/>
                </a>
        </div>
    );
}