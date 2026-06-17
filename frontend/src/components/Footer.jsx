import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🎬 CineVerse</span>
          <p className="footer-tagline">Your premium movie experience</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#!">Browse Movies</a>
            <a href="#!">Theatres</a>
            <a href="#!">Offers</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#!">Help Center</a>
            <a href="#!">Contact Us</a>
            <a href="#!">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 CineVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
