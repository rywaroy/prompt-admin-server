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
            res.write(data.toString());
        });
    } catch (error) {
        res.error('10101', error.message);
    }
};
