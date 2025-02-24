import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mt-5 py-5= p-3">
      <h2 className="text-center text-uppercase fw-bold mb-4 fs-3">Contact Us</h2>

      <div className="row ">
        {/* Contact Form */}
        <div className="col-md-6 ">
          <div className="card  p-4 rounded shadow-lg bg-dark text-light">
            <h4 className="fw-bold mb-3 ">Get In Touch</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control border-0" placeholder="Enter your name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control  border-0" placeholder="Enter your email" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control  border-0" rows="4" placeholder="Write your message..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>

        {/* Contact Details */}
        <div className="col-md-6">
          <div className="card   p-4 rounded shadow-lg">
            <h4 className="fw-bold mb-3">Contact Information</h4>
            <p><i className="bi bi-geo-alt-fill text-danger"></i> 123 Borrow Wheelz St, Bangalore, India</p>
            <p><i className="bi bi-telephone-fill text-warning"></i> +91 98765 43210</p>
            <p><i className="bi bi-envelope-fill text-success"></i> support@borrowwheelz.com</p>
            <p><i className="bi bi-clock-fill text-info"></i> Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>

          {/* Google Maps Embed (Optional) */}
          <div className="mt-4">
            <iframe 
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.033455716221!2d-122.41941568468132!3d37.77492977975815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c8b3f8bcd%3A0x4f08f87c8f7c6e71!2sBorrow+Wheelz!5e0!3m2!1sen!2sus!4v1634322341234" 
              width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
