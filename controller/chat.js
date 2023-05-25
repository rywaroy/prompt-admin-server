const { Configuration, OpenAIApi } = require('openai');
const fetchSSE = require('../utils/fetchSSE');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.chat = async (req, res) => {
    try {
        // res.writeHead(200, {
        //     'Content-Type': 'text/event-stream',
        //     'Cache-Control': 'no-cache',
        //     Connection: 'keep-alive',
        // });
        const { model = 'gpt-3.5-turbo', messages } = req.body;
        // await fetchSSE('https://api.openai.com/v1/chat/completions', {
        //     onMessage: (data) => {
        //         res.write(`data: ${data}\n\n`);
        //     },
        //     onError: (error) => {
        //         res.error('10101', error.message);
        //     },
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        //     },
        //     body: JSON.stringify({
        //         messages,
        //         temperature: 1,
        //         max_tokens: 256,
        //         top_p: 1,
        //         frequency_penalty: 0,
        //         presence_penalty: 0,
        //         model,
        //         stream: true,
        //     }),
        // });
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
        // console.log('chat');
        // const completion = await openai.createChatCompletion({
        //     model: 'text-davinci-003',
        //     prompt: 'Hello world',
        // });
        completion.data.on('data', (data) => {
            // const lines = data.toString().split('\n').filter((line) => line.trim() !== '');
            // for (const line of lines) {
            //     const message = line.replace(/^data: /, '');
            //     if (message === '[DONE]') {
            //         return; // Stream finished
            //     }
            //     try {
            //         const parsed = JSON.parse(message);
            //         console.log(parsed.choices[0].text);
            //     } catch (error) {
            //         console.error('Could not JSON parse stream message', message, error);
            //     }
            // }
            console.log(data.toString());
        });
        res.success({});
        // const data = await fetch('https://api.openai.com/v1/chat/completions');
        // res.success(data);
    } catch (error) {
        res.error('10101', error.message);
    }
};
