const express = require("express");
const OpenAI = require("openai");
const path = require("path");

const app = express();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
    try {
        const { messages } = req.body;

        if (!Array.isArray(messages)) {
            return res.status(400).json({
                error: "Invalid messages"
            });
        }

        const response = await client.responses.create({
            model: "gpt-6-luna",
            instructions:
                "You are TRZM AI, a helpful general-purpose AI assistant. Give clear, useful answers. When writing code, format it clearly.",
            input: messages
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "TRZM AI could not process the request."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`TRZM AI running on port ${PORT}`);
});
