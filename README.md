# 🤖 Support AI — AI-Powered Customer Support Chatbot

An AI-powered customer support chatbot designed to help businesses answer customer queries directly on their websites. Support AI aims to make customer support faster and more accessible by generating responses using business-specific information.

🔗 **Live Demo:** https://support-ai-beta-sable.vercel.app/

---

## 📌 About the Project

Customers often visit business websites looking for information about products, services, pricing, and policies. Finding these answers can take time, especially when human support is unavailable.

**Support AI** explores how generative AI can simplify this experience. Businesses can integrate a chatbot into their websites, allowing visitors to ask questions and receive AI-generated responses based on the information configured for that business.

The project combines web development, AI integration, authentication, and database connectivity in one application.

## ✨ Key Features

- 🤖 **AI-Powered Responses** — Uses Google Gemini AI to generate answers to customer queries.
- 🌐 **Website Integration** — Designed to support chatbot embedding through a JavaScript script.
- 🧠 **Business-Specific Knowledge** — Intended to provide responses based on configured business information.
- 🔐 **Authentication** — Uses Scalekit for authentication.
- ⚙️ **Chatbot Configuration** — Includes settings for managing chatbot information.
- ☁️ **Cloud Deployment** — Deployed using Vercel.

*Note: Features are subject to successful configuration and testing in the deployed environment.*

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Web application framework |
| TypeScript | Type-safe development |
| JavaScript | Chatbot integration |
| MongoDB | Database |
| Google Gemini AI | AI-generated responses |
| Scalekit | Authentication |
| Vercel | Deployment |

## 🏗️ How It Works

1. A visitor opens a business website.
2. The embedded chatbot allows the visitor to ask a question.
3. The application processes the query through its API.
4. Google Gemini AI generates a response using the available business context.
5. The response is returned to the chatbot interface.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js and npm
- MongoDB connection
- Google Gemini API key
- Scalekit application credentials

### 1. Clone the Repository

```bash
git clone https://github.com/Khushi-yadav8757/support-ai.git
cd support-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add your credentials:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

SCALEKIT_ENVIRONMENT_URL=your_scalekit_environment_url
SCALEKIT_CLIENT_ID=your_scalekit_client_id
SCALEKIT_CLIENT_SECRET=your_scalekit_client_secret

MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder values with your own credentials. Never commit `.env.local` or expose API keys and database passwords publicly.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

## 🔒 Security Notes

- Keep API keys and secrets in environment variables.
- Do not expose database credentials in frontend code.
- Configure authentication callback URLs for your deployment domain.
- Restrict database access according to your security requirements.

## 🎯 Project Goals

- Explore practical applications of generative AI.
- Build an embeddable customer support experience.
- Understand API integration and authentication workflows.
- Gain hands-on experience with database connectivity and cloud deployment.
- Improve the application through testing and iteration.

## 🔮 Future Improvements

- Improve response accuracy using business-specific knowledge retrieval.
- Add conversation history and analytics.
- Enhance chatbot customization and branding.
- Add better error handling and monitoring.
- Expand testing for embedded chatbot integrations.

## 👩‍💻 Author

**Khushi Yadav**

GitHub: [Khushi-yadav8757](https://github.com/Khushi-yadav8757)

---

⭐ If you find this project interesting, feel free to explore the repository and share feedback.

*Built while learning, experimenting, and exploring AI-powered web applications.* 🚀
