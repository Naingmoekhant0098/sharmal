import axios from "axios";
const SendInquiryEmailAPI = async (name, phoneNumber, email, details,toast,setisLoading ) => {
  try {
    setisLoading(true)
    const response = await axios.post(
      process.env.REACT_APP_COMMON_SERVICE + "email",
      {        
        ToMail: process.env.REACT_APP_IS_PRODUCTION==true?"valiant2542023@gmail.com":"nksoftwarehouse@gmail.com",
        Subject: "New Inquiry Received",
        Body: `
          <html>
            <body>
              <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
                <h2 style="text-align: center; color: #333;">New Inquiry Received</h2>
                <div style="border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
                  <p style="font-size: 16px; color: #555;">
                    <strong>Name:</strong> ${name}
                  </p>
                  <p style="font-size: 16px; color: #555;">
                    <strong>Phone Number:</strong> ${phoneNumber}
                  </p>
                  <p style="font-size: 16px; color: #555;">
                    <strong>Email:</strong> ${email}
                  </p>
                  <p style="font-size: 16px; color: #555;">
                    <strong>Details:</strong><br />
                    ${details}
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Email Sent Successfully");
    setisLoading(false)

    
  } catch (error) {
    toast.error("Sorry we are having error in sending mail.");

    
  }
};
export { SendInquiryEmailAPI };
