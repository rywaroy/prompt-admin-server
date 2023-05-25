const fetchSSE = require('../utils/fetchSSE');

exports.chat = async (req, res) => {
    try {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        });
        const { model = 'gpt-3.5-turbo', messages } = req.body;
        await fetchSSE('https://api.openai.com/v1/chat/completions', {
            onMessage: (data) => {
                res.write(`data: ${data}\n\n`);
            },
            onError: (error) => {
                res.error('10101', error.message);
            },
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model,
                temperature: 0,
                max_tokens: 1536,
                top_p: 1,
                presence_penalty: 0,
                frequency_penalty: 0,
                messages,
                stream: true,
            }),
        });
    } catch (error) {
        res.error('10101', error.message);
    }
};
