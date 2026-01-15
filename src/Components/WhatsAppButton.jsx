// WhatsAppButton.js
import React from 'react';
import { Button } from 'react-bootstrap';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const openWhatsAppChat = () => {
    const phoneNumber = "1234567890"; // Replace with your WhatsApp number
    const message = encodeURIComponent("Hello! I need help with theme customization.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Button 
      className="whatsapp-float-button"
      onClick={openWhatsAppChat}
      title="Chat on WhatsApp"
    >
      <i className="bi bi-whatsapp"></i>
    </Button>
  );
};

export default WhatsAppButton;