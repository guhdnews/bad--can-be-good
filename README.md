# News Can Be Good

A modern, responsive website dedicated to spreading positivity through curated good news and uplifting stories from around the world.

## 🌟 Features

### Core Functionality
- **Automated RSS Feed Aggregation**: Automatically fetches positive news from multiple reputable sources
- **Smart Content Filtering**: AI-powered filtering to ensure only genuinely positive content is displayed
- **Responsive Design**: Beautiful, mobile-first design that works seamlessly across all devices
- **Newsletter System**: Email newsletter capabilities with subscriber management
- **Admin Dashboard**: Complete admin interface for content and subscriber management

### User Experience
- **Modern UI/UX**: Clean, happiness-focused design with warm color palette
- **Search & Filter**: Advanced search and category-based filtering for articles
- **Personalization**: User preference system for customized news consumption
- **Social Sharing**: Easy sharing options for spreading positivity
- **Performance Optimized**: Fast loading times and optimized images

## 🎨 Design System

### Color Palette (Happiness Theme)
- **Primary**: Warm Yellow (#FCD34D) - Happiness and optimism
- **Secondary**: Vibrant Orange (#FB923C) - Energy and warmth  
- **Accent**: Soft Red (#F87171) - Passion and love
- **Supporting**: Light Blue (#60A5FA) - Trust and calm
- **Neutral**: Professional grays for text and backgrounds

## 🛠 Technical Stack

### Frontend
- **Next.js 14**: React framework with server-side rendering
- **Tailwind CSS**: Utility-first CSS framework
- **React**: Modern React with hooks and functional components

### Backend
- **Node.js**: Server-side JavaScript runtime
- **MongoDB**: NoSQL database for articles and subscribers
- **RSS Parser**: For fetching and parsing RSS feeds
- **Nodemailer**: Email sending capabilities

### Deployment
- **Vercel**: Hosting and deployment platform
- **Automated Cron Jobs**: Regular news fetching every 6 hours
- **Environment Variables**: Secure configuration management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- SMTP email credentials

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_email@domain.com
   SMTP_PASS=your_email_password
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access the site**
   Open [http://localhost:3000](http://localhost:3000)

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` to:
- View website statistics
- Manage articles (view/delete)
- Manage subscribers (view/delete) 
- Send newsletters
- Fetch latest news manually

## 📧 Newsletter System

The website includes a complete newsletter system:
- Subscriber management with MongoDB storage
- HTML email templates
- Automated sending capabilities
- Unsubscribe functionality
- Admin interface for newsletter management

## 🔄 Automatic News Fetching

News is automatically fetched every 6 hours via Vercel cron jobs from:
- Good News Network
- Positive News
- Berkeley Greater Good
- Upworthy
- Reader's Digest Good News
- And more...

Content is filtered for positivity using keyword matching and stored with automatic categorization.

## 🎯 Content Categories

Articles are automatically categorized into:
- Community Stories
- Environmental Wins  
- Innovation & Tech
- Health & Wellness
- Education & Learning
- Arts & Culture
- Human Achievements
- Animal Stories

## 🚢 Deployment

Deploy to Vercel:

1. **Connect to Vercel**
   ```bash
   vercel
   ```

2. **Set environment variables**
   Configure all required environment variables in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 🔗 Page Structure

- **Homepage** (`/`) - Latest positive news with search and filtering
- **About** (`/about`) - Information about the mission and team
- **Contact** (`/contact`) - Contact form and information
- **Mission** (`/mission`) - Detailed mission statement
- **Donate** (`/donate`) - Support the platform
- **Personalize** (`/quiz`) - Customize news preferences
- **Privacy Policy** (`/privacy`) - Privacy and data handling information
- **Admin Dashboard** (`/admin`) - Content and subscriber management

---

**Mission**: To counteract negativity bias in media by curating and sharing stories that highlight human kindness, innovation, and progress, creating a more optimistic and hopeful perspective on current events.

For questions or support, contact us at hello@badcanbegood.com
