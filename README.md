# 🔍 Reddit Discovery Platform

A powerful Reddit analytics tool that discovers, analyzes, and scores subreddit mentions for companies and brands. Built with FastAPI, React, and Google Custom Search API.

![Reddit Discovery Platform](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 🎯 Features

- 🔎 **Smart Discovery** - Automatically find Reddit mentions using Google Custom Search API
- 📊 **Analytics Engine** - Analyze subreddit engagement metrics (subscribers, posts, comments)
- 💼 **Business Value Scoring** - Proprietary algorithm scores communities (0-100)
- 📈 **Interactive Dashboard** - Beautiful React UI with animations and real-time search
- ⚡ **High Performance** - Parallel API calls for 25x speed improvement
- 🔄 **Graceful Fallback** - Mock data when API quota exceeded

## 🏗️ Architecture

```
project/
├── discoveredLabs/fastapi-app/    # Backend FastAPI application
│   ├── app/
│   │   ├── controllers/           # Business logic layer
│   │   ├── models/                # Pydantic models
│   │   ├── routers/               # API endpoints
│   │   ├── services/              # Reddit data enrichment
│   │   └── utils/                 # Google Search integration
│   ├── Dockerfile                 # Container configuration
│   └── requirements.txt           # Python dependencies
│
├── react-app/                     # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── RedditDiscovery.jsx    # Main component
│   │   │   └── RedditDiscovery.css    # Styles & animations
│   │   └── config.js              # API configuration
│   └── package.json               # Node dependencies
│
└── highLevel/                     # Additional Node.js services
    └── ...                        # URL shortener & wallet APIs
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for frontend)
- Python 3.11+ (for local development)

### Backend Setup

```bash
cd discoveredLabs/fastapi-app
docker-compose up --build
```

Backend will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

### Frontend Setup

```bash
cd react-app
npm install
npm run dev
```

Frontend will be available at: http://localhost:5173

## 📊 API Usage

### Discover Reddit Posts

```bash
curl --location 'http://localhost:8000/reddit/discover' \
--header 'Content-Type: application/json' \
--data '{
    "company": "openai",
    "description": "openai",
    "limit": 100
}'
```

### Response Structure

```json
{
  "company_name": "openai",
  "post_count": 59,
  "subreddit_analytics": [
    {
      "subreddit_name": "MachineLearning",
      "subscribers": 3015416,
      "business_value_score": 6.8,
      "audience_size": 9.3,
      "mention_frequency": 0.1,
      "content_quality": 10.0,
      "posts": [
        {
          "title": "Discussion about AI...",
          "score": 481,
          "num_comments": 187,
          "url": "https://reddit.com/r/..."
        }
      ]
    }
  ]
}
```

## 💡 Business Value Algorithm

The proprietary scoring algorithm combines three key metrics:

| Metric | Weight | Description |
|--------|--------|-------------|
| **Audience Size** | 35% | Log-scaled subscriber count (0-10) |
| **Mention Frequency** | 30% | How often brand appears in posts |
| **Content Quality** | 35% | Discussion vs noise ratio |

**Formula:**
```
Business Value Score = (Audience Size × 0.35) + (Mention Frequency × 0.30) + (Content Quality × 0.35)
```

## 🎨 UI Highlights

- **Hero Page**: Animated landing with floating icons and feature cards
- **Search**: Real-time search with loading states
- **Results Table**: Compact grid layout with sortable columns
- **Detail View**: Expandable rows showing post analytics
- **Responsive**: Works on desktop, tablet, and mobile
- **Animations**: Smooth transitions (0.15s-0.3s)

## 🔧 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation
- **Google Custom Search API** - Post discovery
- **Reddit JSON API** - Data enrichment
- **aiohttp** - Async HTTP client
- **Docker** - Containerization

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **CSS Grid/Flexbox** - Layout
- **Fetch API** - HTTP requests

## 📈 Performance

- **API Response Time**: <2 seconds
- **Concurrent Requests**: 25 parallel calls
- **Subreddits per Search**: 20+ analyzed
- **Data Points per Post**: 12 fields
- **UI Load Time**: <1 second

## 🔐 Environment Variables

Create a `.env` file in `fastapi-app/`:

```env
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CSE_ID=your_custom_search_engine_id
```

## 🛣️ Roadmap

- [ ] **Database Integration** - MongoDB for caching, Redis for speed
- [ ] **Historical Tracking** - Track brand sentiment over time
- [ ] **Sentiment Analysis** - NLP on post content
- [ ] **Competitor Comparison** - Side-by-side analysis
- [ ] **Export Features** - CSV/PDF reports
- [ ] **Authentication** - Rate limiting per user
- [ ] **Real-time Updates** - WebSocket integration
- [ ] **Advanced Filters** - Date ranges, post types, scores

## 💼 Use Cases

1. **Brand Monitoring** - Track where your brand is discussed
2. **Market Research** - Identify relevant communities
3. **Community Engagement** - Find high-value subreddits
4. **Competitor Analysis** - See where competitors are mentioned
5. **Product Launches** - Find ideal subreddits for announcements

## 🐛 Known Issues

- Google Custom Search API has 100 queries/day limit (free tier)
- System automatically falls back to mock data when quota exceeded
- Some subreddits may return null for subscribers (handled gracefully)

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ by Rishabh**

*Transforming how businesses understand their Reddit presence*

# discover-labs-reddit
