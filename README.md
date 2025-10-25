# Abraham Sackey Ohene Gyan - Portfolio

My professional portfolio showcasing various web development projects.

### Featured Projects
- **Clapes Department**: E-commerce website for a clothing brand
- **Abokobi Secure Banking Shield**: Modern banking platform for rural banking in Ghana
- **TicTacToe Game**: Classic game with both Player vs Player and AI modes
- **Kool Hib**: E-commerce platform for a premium hibiscus-based beverage brand
- **Calculator App**

## Technology Stack

This portfolio is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How to Run This Project Locally

**Prerequisites**
- Node.js (version 14 or higher)
- npm

**Installation**

```sh
# Clone the repository
git clone https://github.com/iamodlj/Portfolio.git

# Navigate to the project directory
cd Portfolio

# Install dependencies
npm install

# Copy the example environment file
cp .env.example .env

# Edit .env with your SMTP credentials (for contact form)
# SMTP_HOST=smtp.example.com
# SMTP_USER=your-email@example.com
# SMTP_PASS=your-password
# RECIPIENT_EMAIL=your-recipient@example.com
# FROM_EMAIL=your-email@example.com

# Start the development server
npm run dev
```

The application will open in your browser at `http://localhost:5173`.

## Environment Variables

The following environment variables are required for the contact form to work:

- `SMTP_HOST`: Your SMTP server hostname
- `SMTP_USER`: Your SMTP username/email
- `SMTP_PASS`: Your SMTP password
- `RECIPIENT_EMAIL`: Email address to receive contact form submissions
- `FROM_EMAIL`: Email address to send from (defaults to SMTP_USER)
- `VITE_API_URL`: API endpoint URL (optional, has default)

See `.env.example` for a template.

## Deployment

This portfolio is deployed on Vercel. For your own deployment:

1. Push your code to GitHub
2. Sign up for [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure build settings (Vite should be auto-detected)
5. **Add environment variables** in Vercel project settings (required for contact form)
6. Deploy

### Adding Environment Variables in Vercel

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add the SMTP configuration variables listed above
4. Redeploy your project

## Contact

Abraham Sackey Ohene Gyan (ASOG)
- Email: [ohenegyanfamily@gmail.com]
- GitHub: [iamodlj](https://github.com/iamodlj)

## License

This project is available as open source under the terms of the MIT License. 