// utils/emailTemplates.js

export const subscriptionTemplate = (userEmail) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h2 style="color: #222; text-align: center;">
        Welcome to 
        <span style="font-weight: bold; color: #ff4d4d;">
          QuickPick - <span style="color: #007bff;">PK</span>
        </span>
      </h2>
      <p style="font-size: 16px; color: #444; margin-top: 20px;">
        Hi <strong>${userEmail}</strong>,
      </p>
      <p style="font-size: 16px; color: #444;">
        🎉 Thank you for subscribing! You’ll now receive exciting updates, latest features, and news from QuickPick.
      </p>
      <p style="font-size: 16px; color: #444;">
        Stay connected with us and be ready for exclusive content delivered straight to your inbox 🚀.
      </p>
      <div style="margin-top: 30px; text-align: center;">
        <a href="#" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Explore Now</a>
      </div>
      <hr style="margin-top: 40px;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        If you didn’t subscribe, please ignore this email.
      </p>
    </div>
  </div>
`;
