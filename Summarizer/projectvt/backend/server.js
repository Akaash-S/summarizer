const express = require("express");
const multer = require("multer");
const { SpeechClient } = require("@google-cloud/speech");

const app = express();
const upload = multer({ dest: "uploads/" });

// Google Speech-to-Text Client
const client = new SpeechClient();

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const audioBytes = require("fs").readFileSync(filePath).toString("base64");

    const request = {
      audio: { content: audioBytes },
      config: {
        encoding: "LINEAR16", // Adjust as per your file format
        sampleRateHertz: 16000,
        languageCode: "en-US",
      },
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    res.json({ transcription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
