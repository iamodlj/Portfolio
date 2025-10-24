# Portfolio Contact API

This API handles contact form submissions for the portfolio website.

## Setup

1. Install dependencies:
```bash
cd api
npm install
```

2. Deploy to Vercel:
```bash
npm install -g vercel
vercel --prod
```

3. Update the contact form in `src/components/Contact.tsx` with your deployed API URL:
```javascript
const response = await fetch('https://your-actual-vercel-url.vercel.app/api/contact', {
```

## Configuration

The API uses the following SMTP configuration:
- Host: server242.web-hosting.com
- Port: 587
- User: service@kamakgroup.com
- Password: Kamak@123Kamak

Emails are sent to: techwiththefather@gmail.com

## Testing

You can test the API locally using:
```bash
npm run dev
```

Then make a POST request to `http://localhost:3000/api/contact` with:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Test message"
}
```