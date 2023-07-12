import Nexmo from "nexmo";

const nexmo = new Nexmo({
  apiKey: process.env.NEXT_PUBLIC_VONAGE_API_KEY,
  apiSecret: process.env.NEXT_PUBLIC_VONAGE_API_SECRET,
});

export default async (req, res) => {
  const { phoneNumber } = req.body;
  const brand = "PropBuying";

  nexmo.verify.request({ number: phoneNumber, brand }, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    } else {
      let requestId = result.request_id;
      if (result && result.status == "0") {
        res.status(200).json({ requestId: requestId }); // Success! Now, have your user enter the PIN
      } else {
        res.status(401).send(result.error_text);
      }
    }
  });
};
