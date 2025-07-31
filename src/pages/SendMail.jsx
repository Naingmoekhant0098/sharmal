import React from 'react';
import axios from 'axios';

export function SendMailPage() {

  const sendOTPEmail = async () => {
    try {
      const response = await axios.post('http://nksoftware-001-site20.dtempurl.com/service/email', {
        ToMail: "nksoftwarehouse@gmail.com;zwehtet144@gmail.com",
        Subject: "ContactUs mail template",
        Body: `
          <html>
            <body>
              <div style="font-family: Arial, sans-serif; text-align: center;">
                <h2>Your OTP Code</h2>
                <p style="font-size: 18px;">Please use the following OTP to complete your action:</p>
                <h1 style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; display: inline-block;">123456</h1>
                <p style="font-size: 14px; color: #777;">If you did not request this OTP, please ignore this email.</p>
              </div>
            </body>
          </html>
        `      
      });


      
    } catch (error) {

      
    }
  };

  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={sendOTPEmail}>Send OTP</button>
    </div>
  );
}





