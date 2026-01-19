import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import logo from "../../../assets/invoiccee-360.png";
import { Link } from 'react-router-dom';

const Footer1 = () => {
  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebookF />, bg: "#3b5998" },
    { href: "https://twitter.com", icon: <FaTwitter />, bg: "#1da1f2" },
    { href: "https://instagram.com", icon: <FaInstagram />, bg: "#e1306c" },
    { href: "https://wa.me/919876543210", icon: <FaWhatsapp />, bg: "#25d366" },
  ];

  return (
    <footer style={{ 
      background: 'linear-gradient(135deg, #0a0a0a, #111)', 
      color: '#fff', 
      minHeight: '350px',  
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'Poppins, sans-serif', 
      padding: '40px 0',
      borderTop: '3px solid #33cccc',
    }}>
      <Container>
        <Row className="g-4 align-items-start">
          {/* Logo & Description */}
          <Col xs={12} sm={6} md={3}>
            <img src={logo} alt="Logo" width={160} height={60} className="mb-3" />
            <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0' }}>
              Complete business management solution for accounts, inventory, and financial control.
            </p>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={6} md={3}>
            <h5 style={{ borderBottom: '2px solid #33cccc', display: 'inline-block', paddingBottom: '3px', color: '#33cccc', fontSize: '0.95rem' }}>Quick Links</h5>
            <Nav className="flex-column mt-2 gap-2">
              {['About Us', 'Features', 'Pricing', 'FAQ'].map((link, idx) => (
                <Nav.Link
                  key={idx}
                  href={`/${link.replace(' ', '').toLowerCase()}`}
                  style={{ color: '#fff', padding: 0, fontWeight: 500, fontSize: '0.85rem', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#33ffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#fff'}
                >
                  {link}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          {/* Contact / Support */}
          <Col xs={12} sm={6} md={3}>
            <h5 style={{ borderBottom: '2px solid #33cccc', display: 'inline-block', paddingBottom: '3px', color: '#33cccc', fontSize: '0.95rem' }}>Contact</h5>
            <div className="mt-2 d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope size={16} color="#33cccc" /> 
                <span style={{ fontSize: '0.85rem' }}>info@kreativebrands.co.za</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPhone size={16} color="#33cccc" /> 
                <span style={{ fontSize: '0.85rem' }}>+27 69 668 4616</span>
              </div>
            </div>
          </Col>

          {/* Follow */}
          <Col xs={12} sm={6} md={3}>
            <h5 style={{ borderBottom: '2px solid #33cccc', display: 'inline-block', paddingBottom: '3px', color: '#33cccc', fontSize: '0.95rem' }}>Follow</h5>
            <div className="d-flex gap-3 mt-2 flex-wrap">
              {socialLinks.map((item, idx) => (
                <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '45px',
                    height: '45px',
                    backgroundColor: item.bg,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'all 0.4s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.15) rotate(3deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {React.cloneElement(item.icon, { size: 20 })}
                </a>
              ))}
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="pt-4 mt-4" style={{ borderTop: '1px solid #444' }}>
          <Col md={6} className="d-flex flex-column flex-md-row align-items-center gap-2 gap-md-3">
            <small style={{ opacity: 0.7, fontSize: '0.85rem' }}>&copy; {new Date().getFullYear()} Accounting. All rights reserved.</small>
            <div className="d-flex gap-2 gap-md-3">
              <Link to="/PrivacyPolicy" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#33ffff'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}>Privacy Policy</Link>
              <span style={{ opacity: 0.5 }}>|</span>
              <Link to="/TermsConditions" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#33ffff'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}>Terms & Conditions</Link>
            </div>
          </Col>
          <Col md={6} className="d-none d-md-flex justify-content-end"></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer1;
