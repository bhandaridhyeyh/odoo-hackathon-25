// /controllers/aiController.js
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const improveDescription = async (req, res) => {
  const { input } = req.body;

  const prompt = `Rewrite the following item description to make it attractive for a secondhand clothing swap platform:\n\n"${input}"`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    });

    const result = completion.choices[0].message.content;
    res.json({ improved: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
