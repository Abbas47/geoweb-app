import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    try {
      const response = await fetch('', {  //'https://api.openai.com/v1/completions'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '', // updated you key here
        },
        body: JSON.stringify({
          model: '', //'gpt-4o-mini'
          prompt: message,
          max_tokens: 100,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json({ response: data.choices[0].text });
      } else {
        res.status(response.status).json({ error: data.error });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect to LLM API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}