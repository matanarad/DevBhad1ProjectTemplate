import './AppFooter.css';
import BroshLogo from '../../img/BroshLogo.png'
import Bhad1Logo from '../../img/Bhad1Logo.png'

function AppFooter() {
    return (
        <footer className="footer">
            <div className="left">
                <div className="image-container">
                    <img src={Bhad1Logo} alt={Bhad1Logo} />

                </div>
            </div>
            <div className="text">
                <p>אֱמֹר מְעַט וַעֲשֵׂה הַרְבֵּה</p>
                <p>פותח על ידי פלוגה ב’ ברוש 82</p>
            </div>
            <div className="right">
                <div className="image-container">
                    <img src={BroshLogo} alt={BroshLogo} />
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;
