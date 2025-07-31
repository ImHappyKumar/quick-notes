import React from 'react';

const About = () => {
  return (
    <>
      <div className="container my-4">
        <div>
          <h3>About QuickNotes</h3>
          <p>Welcome to QuickNotes, your go-to platform for easy and efficient note-taking! Our app is designed to help you capture your ideas, thoughts, and important information quickly and effortlessly.</p>
        </div>

        <div>
          <h5>Our Mission</h5>
          <p>At QuickNotes, we believe that taking notes should be a seamless and enjoyable experience. Our mission is to provide a user-friendly platform that enables you to organize your notes effectively, so you can focus on what matters most to you.</p>
        </div>

        <div>
          <h5>Key Features</h5>
          <ul>
            <li>
              <h6>Fast and Intuitive</h6>
              <p>QuickNotes is built with simplicity in mind. The intuitive interface allows you to create new notes within seconds. No more distractions - just open the app and start jotting down your ideas right away.</p>
            </li>
            <li>
              <h6>Secure and Private</h6>
              <p>We prioritize the security and privacy of your data. All your notes are stored securely and are only accessible by you. Your information is in safe hands with QuickNotes.</p>
            </li>
            <li>
              <h6>Sync Across Devices</h6>
              <p>Take your notes with you wherever you go. QuickNotes synchronizes your notes across all your devices, ensuring you never miss a beat.</p>
            </li>
          </ul>
        </div>

        <div>
          <h5>Get Started</h5>
          <p>Join our growing community of note-takers today! Sign up for free and experience the convenience of QuickNotes.</p>
          <p>If you have any questions or feedback, please don't hesitate to contact our support team at <a href="mailto:support@quicknotes.com">support@quicknotes.com</a>.</p>
          <p>Thank you for choosing QuickNotes!</p>
        </div>
      </div>
    </>
  )
}

export default About;