const { createParser } = require('eventsource-parser');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function fetchSSE(url, options) {
    const { onMessage, onError, ...fetchOptions } = options;
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
        throw new Error(`Unexpected response ${res.statusText}`);
    }

    const parser = createParser((event) => {
        if (event.type === 'event') {
            onMessage(event.data);
        }
    });

    const feed = (chunk) => {
        let response = null;

        try {
            response = JSON.parse(chunk);
        } catch {
            // ignore
        }

        if (response?.detail?.type === 'invalid_request_error') {
            const msg = `ChatGPT error ${response.detail.message}: ${response.detail.code} (${response.detail.type})`;
            const error = new Error(msg);

            if (onError) {
                onError(error);
            } else {
                console.error(error);
            }
            return;
        }

        parser.feed(chunk);
    };

    if (!res.body.getReader) {
        // Vercel polyfills `fetch` with `node-fetch`, which doesn't conform to
        // web standards, so this is a workaround...
        const { body } = res;

        if (!body.on || !body.read) {
            throw new Error('unsupported "fetch" implementation');
        }

        body.on('readable', () => {
            let chunk;
            while ((chunk = body.read()) !== null) {
                feed(chunk.toString());
            }
        });
    } else {
        for await (const chunk of streamAsyncIterable(res.body)) {
            const str = new TextDecoder().decode(chunk);
            feed(str);
        }
    }
}

module.exports = fetchSSE;
