const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/proxy/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    const cbeUrl = `https://apps.cbe.com.et:100/?id=${transactionId}`;

    const response = await axios.get(cbeUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }, // Fake browser request
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch transaction.", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
