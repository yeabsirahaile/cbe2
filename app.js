import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/fetch", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).send("Missing transaction ID");

  try {
    const response = await fetch(`https://apps.cbe.com.et:100/?id=${id}`);
    if (!response.ok) throw new Error(`Failed: ${response.status}`);

    const pdf = await response.arrayBuffer();
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdf));
  } catch (error) {
    res.status(500).send("Failed to fetch PDF");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
