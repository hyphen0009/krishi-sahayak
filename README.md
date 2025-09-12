🌾 KrishiSahayak

An AI-powered agricultural assistant for farmers

KrishiSahayak helps farmers make better decisions through AI-driven crop recommendations, pest & disease detection, soil health insights, and a multilingual chatbot. Designed for accessibility, it empowers farmers with timely, localized, and easy-to-understand agricultural guidance.


---

🚜 Problem

Farmers often struggle with crop planning, pest management, and soil health due to limited access to expert and localized advice. This leads to reduced yields and inefficient resource use.


---

💡 Solution

KrishiSahayak provides:

Crop Advisor – AI-based crop suggestions tailored to soil, weather, and location.

Pest Detection – Upload crop images to detect pests/diseases with remedies.

Soil Health Guidance – Best practices for maintaining fertility.

Multilingual Chatbot – Ask questions and get simple, AI-powered answers.

Mobile-Friendly Dashboard – Accessible anytime, anywhere.


Powered by Next.js, TypeScript, Tailwind CSS, Shadcn UI, and OpenAI APIs, it delivers real-time, farmer-friendly support.


---

🛠️ Tech Stack

Frontend: Next.js 13+ (App Router), TypeScript, Tailwind CSS, Shadcn UI

AI: OpenAI APIs (Gemini / GPT) for recommendations, pest detection & chatbot

Validation: Zod for form validation

Deployment: Firebase Hosting (example config included)



---

🚀 Execution & Scaling Plan

1. MVP: Launch with core features (crop advisor, pest detection, chatbot).


2. Localization: Add multilingual and regional support with weather/soil data.


3. Enhancements: Introduce voice interaction and real-time alerts.


4. Scaling: Optimize AI usage, expand to more crops/regions, and partner with agricultural agencies.




---

📂 Repository Structure

src/
 ├── ai/flows/              # AI logic (crop advice, pest detection, chatbot)
 ├── app/(main)/            # Next.js app pages
 ├── components/ui/         # Reusable Shadcn UI components
 ├── context/               # Language and global state
 └── hooks/                 # Custom hooks (e.g., mobile detection)


---

⚡ Getting Started

Prerequisites

Node.js 18+

pnpm / npm / yarn


Setup

# Clone repo
git clone https://github.com/hyphen0009/krishi-sahayak.git
cd krishisahayak

# Install dependencies
pnpm install

# Run dev server
pnpm dev

Open http://localhost:3000 in your browser.


---

🌍 Roadmap

[ ] Implement AI flows

[ ] Add translation files for multilingual support

[ ] Voice interaction (STT/TTS)

[ ] Weather alerts integration

[ ] Automated testing & CI/CD



---

🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.


