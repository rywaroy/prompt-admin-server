const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.chat = async (req, res) => {
    try {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            // 'Content-Type': 'text/plain',
            // 'Transfer-Encoding': 'chunked',
        });
        const { model = 'gpt-3.5-turbo', messages } = req.body;
        const completion = await openai.createChatCompletion(
            {
                model,
                temperature: 0,
                max_tokens: 1536,
                top_p: 1,
                presence_penalty: 0,
                frequency_penalty: 0,
                messages,
                stream: true,
            },
            { responseType: 'stream' },
        );
        completion.data.on('data', (data) => {
            const text = data.toString();
            console.log(text);
            res.write(text);
            if (text.indexOf('[DONE]') !== -1) {
                res.end();
            }
        });
    } catch (error) {
        if (error.response?.status) {
            res.error(error.response.status, error.message);
        } else {
            res.error('500', 'An error occurred during OpenAI request');
        }
    }
};
