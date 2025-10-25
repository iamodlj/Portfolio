import handler from './contact.js';

async function run() {
  const req = {
    method: 'POST',
    headers: {
      origin: 'https://asog.vercel.app',
      host: 'localhost'
    },
    url: '/api/contact?debug=1',
    body: {
      name: 'LocalTest',
      email: 'local@example.com',
      message: 'This is a local debug test.'
    }
  };

  const res = {
    headers: {},
    statusCode: 200,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(obj) {
      console.log('--- Handler JSON response ---');
      console.log('Status:', this.statusCode);
      console.log('Headers:', this.headers);
      console.log('Body:', JSON.stringify(obj, null, 2));
    },
    end() {
      console.log('--- Handler ended response ---');
      console.log('Status:', this.statusCode);
      console.log('Headers:', this.headers);
    }
  };

  try {
    await handler(req, res);
    console.log('\nTest completed.');
  } catch (err) {
    console.error('Handler threw error:', err);
  }
}

run();
