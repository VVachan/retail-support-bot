# RetailBot - AI-Powered Customer Support for Retail

A modern, AI-powered customer support chatbot application built for retail businesses. RetailBot provides 24/7 instant responses to customer queries with seamless human handoff capabilities.

## Features

- 🤖 **AI-Powered Chatbot** - Intelligent responses to retail-specific queries
- 🕐 **24/7 Availability** - Never miss a customer query
- 👥 **Human Handoff** - Seamless escalation to human agents when needed
- 📊 **Analytics Ready** - Dashboard-ready architecture for tracking customer satisfaction
- 🔒 **Secure & Private** - Enterprise-grade security for customer data
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_REPO_URL>
cd retail-support-bot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
retail-support-bot/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   │   ├── ui/      # shadcn/ui components
│   │   └── ...      # Custom components
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions
│   ├── pages/       # Page components
│   └── main.tsx     # Application entry point
├── index.html
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Styling

The project uses Tailwind CSS with custom theme variables defined in `src/index.css`. You can customize colors, fonts, and other design tokens there.

### Components

The application uses shadcn/ui components which can be customized by editing the component files in `src/components/ui/`.

## Integration Points

The application is ready for backend integration:

- **Authentication**: The Auth page is set up for Supabase integration (see `src/pages/Auth.tsx`)
- **AI Chatbot**: The chatbot uses Google Gemini API for intelligent responses (see `src/components/ChatbotModal.tsx`)

## Gemini API Setup

The chatbot is integrated with Google Gemini API. To enable it:

1. **Install the dependency:**
   ```bash
   npm install @google/generative-ai
   ```

2. **Get your API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key

3. **Create a `.env` file** in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Restart your dev server:**
   ```bash
   npm run dev
   ```

For detailed setup instructions, see [GEMINI_SETUP.md](./GEMINI_SETUP.md).

**Note:** If Gemini API is not configured, the chatbot will automatically fall back to mock responses.

## License

This project is private and proprietary.

## Support

For questions or issues, please contact the development team.
