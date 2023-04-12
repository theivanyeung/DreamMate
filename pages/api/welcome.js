const sgMail = require("@sendgrid/mail");

const { SG_API_KEY, WELCOME_TEMPLATE_ID } = process.env;

sgMail.setApiKey(SG_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    await sgMail.send({
      to: email,
      from: "dreammateofficial@gmail.com",
      templateId: WELCOME_TEMPLATE_ID,
    });
    return res.status(200).json({ success: true });
  }

  return res.status(404).json({
    error: {
      code: "not_found",
      message: "The requested endpoint was not found or doesn't exist",
    },
  });
}
