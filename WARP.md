# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

"News Can Be Good" is a Next.js web application that aggregates and displays positive news from RSS feeds. The project aims to counteract negative news consumption by curating uplifting content from reliable sources.

## Development Commands

### Core Commands
```bash
npm run dev        # Start development server on localhost:3000
npm run build      # Build production version
npm start          # Start production server
npm run lint       # Run ESLint
```

### Testing Individual Components
- Test news fetching: Visit `/api/fetch-news` endpoint directly
- Test single pages: Navigate to `/quiz`, `/donate`, or `/` in browser
- Debug RSS feeds: Check browser console when clicking "Refresh Latest News"

## Architecture Overview

### Data Flow Architecture
The application follows a hub-and-spoke pattern centered around RSS feed aggregation:

1. **RSS Aggregation Pipeline** (`lib/newsUtils.js`, `lib/rssFetcher.js`)
   - Fetches from curated positive news RSS feeds
   - Filters content using positive keyword matching
   - Stores articles in MongoDB with deduplication

2. **API Layer** (`pages/api/`)
   - `fetch-news.js`: Main news aggregation endpoint with timeout handling
   - `subscribe.js`: Email subscription management
   - `send-newsletter.js`: Newsletter distribution system

3. **Database Layer** (`lib/mongodb.js`)
   - MongoDB connection with server-side only access
   - Articles collection with automatic deduplication by title
   - User preferences storage for personalization

### Frontend Architecture
- **Page-based routing** using Next.js Pages Router
- **Server-side rendering** for SEO optimization and initial data loading
- **Component-based UI** with shared Header/Footer components
- **Tailwind CSS** with custom theme colors (`nur-blue`, `nur-light`)

### Key Technical Patterns

#### RSS Feed Management
The application uses a resilient RSS parsing strategy:
- Limited feed sources (2 primary feeds) to prevent timeouts
- `Promise.allSettled()` for graceful feed failure handling  
- Positive keyword filtering with predefined criteria
- 3-second timeout per feed with fallback mechanisms

#### Database Patterns
- Connection reuse with global `clientPromise`
- Server-side only database access (client-side protection)
- Upsert operations for article deduplication
- Date-based sorting for chronological display

#### Email Integration
- Newsletter system using Nodemailer
- Subscription management with email validation
- Automated positive news digest generation

## Environment Variables

Required `.env` variables:
- `MONGODB_URI`: MongoDB Atlas connection string
- `EMAIL_USER`: SMTP email account for newsletter
- `EMAIL_PASS`: Email account app password
- `PRINTFUL_API_TOKEN`: Merchandise integration token
- `MERCH_LINK`: Printful store URL

## Key Files and Their Purpose

### Core Business Logic
- `lib/newsUtils.js`: RSS parsing, filtering, and database operations
- `pages/api/fetch-news.js`: Optimized news fetching endpoint with error handling
- `pages/index.js`: Main homepage with SSR article loading

### Data Processing
- `lib/mongodb.js`: Database connection and server-side access control
- `pages/api/subscribe.js`: User subscription management
- `pages/api/send-newsletter.js`: Automated newsletter distribution

### User Interface  
- `components/Header.js`: Navigation with donation integration
- `pages/quiz.js`: User preference collection for personalization
- `pages/donate.js`: PayPal donation integration

## Development Considerations

### RSS Feed Reliability
The system prioritizes speed and reliability:
- Only 2-3 most reliable RSS sources to prevent timeouts
- Aggressive timeout settings (3 seconds per feed)
- Fallback mechanisms for failed feeds
- Articles limited to 3 per feed to maintain performance

### Database Performance
- Articles are deduplicated by title before insertion
- MongoDB ObjectId converted to strings for JSON serialization
- Server-side rendering pre-loads articles for better UX

### Content Filtering
Positive news identification uses keyword matching on:
- Article titles and descriptions
- Predefined positive keywords array
- Manual curation of RSS feed sources

### Styling Architecture
Uses Tailwind CSS with:
- Custom color palette for brand consistency
- Responsive design patterns
- Component-based styling approach
- Custom utilities for "nur-blue" and "nur-light" theme colors

## Enhanced Features & Modern Design

The website has been completely transformed with modern UI/UX and professional features:

### 🎨 Modern UI/UX Design
- **Beautiful Hero Section**: Gradient backgrounds, animated elements, statistics display
- **Professional Header**: Sticky navigation with mobile hamburger menu
- **Enhanced Article Cards**: Social sharing, hover effects, responsive grid layout
- **Modern Footer**: Social links, newsletter signup, comprehensive link structure
- **Responsive Design**: Mobile-first approach with smooth transitions

### 🔍 Search & Filtering
- **Smart Search Bar**: Real-time search through article titles and content
- **Category Filtering**: Pre-defined categories (Community, Environment, Innovation, Health, Education)
- **Interactive Filter Buttons**: Visual feedback and smooth transitions
- **Search Results**: Dynamic result counts and clear no-results states

### 📰 Content Features
- **Featured Article Layout**: Large hero article display with rich media
- **Social Sharing**: Built-in sharing for Twitter, Facebook, WhatsApp, LinkedIn, Email
- **Copy Link Functionality**: One-click link copying for easy sharing
- **Article Source Attribution**: Clear source labeling and external link handling
- **Publication Date Formatting**: Human-readable date displays

### 📧 Enhanced Newsletter System
- **Beautiful Signup Forms**: Gradient backgrounds with success states
- **Trust Indicators**: Subscriber counts and benefit highlights
- **Email Validation**: Client-side and server-side validation
- **Success Animations**: Engaging confirmation experiences
- **Professional Email Templates**: HTML emails with styling and branding

### 🎯 SEO & Performance
- **Complete Meta Tags**: OpenGraph, Twitter Cards, structured data
- **Semantic HTML**: Proper heading hierarchy and accessibility
- **Performance Optimized**: Lazy loading, optimized images, code splitting
- **Search Engine Friendly**: Clean URLs, sitemaps, proper canonicals

## 📊 Enhanced Admin Dashboard

Completely redesigned admin interface at `/admin` with advanced analytics:

### 🎛️ Overview Dashboard
- **Key Metrics Cards**: Articles, subscribers, views, engagement rates
- **Growth Tracking**: Week-over-week percentage changes
- **Quick Actions Panel**: One-click access to common tasks
- **Recent Activity Feed**: Real-time updates and notifications
- **Visual Statistics**: Color-coded metrics with icons

### 📈 Analytics & Insights
- **Top News Sources**: Visual charts showing content source breakdown
- **Category Analytics**: Content distribution across different topics
- **Performance Metrics**: Daily views, engagement rates, subscriber growth
- **Content Strategy**: Data-driven insights for editorial decisions

### 🛠️ Advanced Management Tools
- **Tabbed Interface**: Overview, Articles, Subscribers, Analytics, Settings
- **Bulk Operations**: Mass actions for content management
- **Real-time Updates**: Live data refresh without page reloads
- **Professional Table Views**: Sortable, searchable data tables
- **Action Confirmations**: Safety prompts for destructive operations

### ⚙️ Configuration Settings
- **RSS Feed Management**: Configurable fetch intervals and source limits
- **Newsletter Automation**: Scheduling and content curation settings
- **System Preferences**: Customizable platform behavior
- **Performance Tuning**: Optimization controls for site speed

### API Endpoints (Enhanced)
- `GET /api/admin/stats` - Comprehensive website statistics
- `GET /api/admin/articles` - Advanced article management with filtering
- `DELETE /api/admin/articles/[id]` - Safe article deletion with confirmations
- `GET /api/admin/subscribers` - Detailed subscriber management
- `POST /api/admin/send-newsletter` - Professional newsletter distribution
