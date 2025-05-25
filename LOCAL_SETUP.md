# Running the Core Web Vitals Dashboard Locally

## Prerequisites
- **Node.js** (v18 or newer recommended)
- **npm** (comes with Node.js)

## 1. Install Dependencies
Open a terminal in your project directory and run:
```bash
npm install
```
If you get issues with peer dependencies, you can use the following command:
```bash
npm install --legacy-peer-deps
```

## 2. Set Up Environment Variables
Ensure that the `.env.local` file exists in the root directory and contains all required environment variables. The api url can be found in [chrome-ux-report](https://developer.chrome.com/docs/crux/api?authuser=1) docs. You need to create a google cloud account and enable the chromeuxreport api. Add the following variables:

```
NEXT_PUBLIC_API_URL=https://chrome-ux-report.vercel.app/api
```


## 3. Start the Development Server
Run:
```bash
npm run dev
```
This will start the Next.js development server. By default, your app will be available at [http://localhost:3000](http://localhost:3000).

## 4. Build & Start in Production (Optional)
To build for production:
```bash
npm run build
```
To start the production server:
```bash
npm start
```