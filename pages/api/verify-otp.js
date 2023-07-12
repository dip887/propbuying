import Nexmo from "nexmo";

const nexmo = new Nexmo({
  apiKey: process.env.NEXT_PUBLIC_VONAGE_API_KEY,
  apiSecret: process.env.NEXT_PUBLIC_VONAGE_API_SECRET,
});

export default async (req, res) => {
  const { otp, requestId } = req.body;

  nexmo.verify.check({ request_id: requestId, code: otp }, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    } else {
      if (result && result.status == "0") {
        // Success!
        res.status(200).json({ message: "Account verified!" });
      } else {
        // handle the error - e.g. wrong PIN
        res.status(400).json({ message: "Wrong Pin!" });
      }
    }
  });
};
