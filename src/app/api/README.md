# 🚀 API Routes

This directory contains all API endpoints organized by functionality:

## 📁 Directory Structure

```
api/
├── analytics/           # Analytics and tracking endpoints
│   ├── dashboard       # Analytics dashboard data
│   ├── export         # Data export functionality
│   └── assistant      # AI-powered analytics insights
├── auth/               # Authentication endpoints
│   ├── google         # Google OAuth integration
│   └── status         # Auth status checks
├── chatbot/            # AI chatbot functionality
│   ├── conversation   # Message handling
│   └── analytics      # Chatbot usage tracking
├── contact/            # Contact form endpoints
│   ├── email          # Email sending via Resend
│   ├── meeting        # Calendar scheduling
│   └── image          # Image upload handling
└── tracking/           # User interaction tracking
    ├── button         # Button click analytics
    ├── tour           # Tour interaction tracking
    └── visitor        # Visitor location/info
```

## 🔧 Endpoint Groups

### Analytics (`/analytics/*`)

- **Dashboard Data**: Real-time analytics and metrics
- **Data Export**: Secure analytics data export
- **AI Insights**: Intelligent analytics processing

### Authentication (`/auth/*`)

- **Google OAuth**: Calendar integration auth
- **Status Checks**: Session management
- **Security**: Route protection

### Chatbot (`/chatbot/*`)

- **Conversation**: OpenAI integration
- **Message History**: Chat session management
- **Usage Analytics**: Interaction tracking

### Contact (`/contact/*`)

- **Email**: Resend API integration
- **Calendar**: Google Calendar scheduling
- **File Upload**: Image/document handling

### Tracking (`/tracking/*`)

- **Interactions**: Button/element clicks
- **Tour Analytics**: Guided tour usage
- **Visitor Data**: Geographic/device info

## 🔐 Security

- All routes use environment variables for sensitive data
- Authentication required for protected endpoints
- Rate limiting on public endpoints
- Input validation and sanitization
- CORS configuration for production

## 🛠️ Usage

### Example: Contact Form

```typescript
// Send a message
POST /api/contact/email
{
  "name": string,
  "email": string,
  "message": string
}

// Schedule a meeting
POST /api/contact/meeting
{
  "email": string,
  "date": string,
  "duration": number
}
```

### Example: Analytics

```typescript
// Get dashboard data
GET /api/analytics/dashboard
Headers: {
  "Authorization": "Bearer ${token}"
}

// Track button click
POST /api/tracking/button
{
  "buttonId": string,
  "action": string
}
```

## 🔧 Configuration

Required environment variables:

```env
# Email (Resend)
RESEND_API_KEY=your_key

# OpenAI
OPENAI_API_KEY=your_key

# Google Calendar
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

# Analytics Protection
ANALYTICS_SECRET=your_secret
```

## 📝 Development

1. Copy `.env.example` to `.env.local`
2. Configure required API keys
3. Run `npm run dev`
4. Test endpoints at `http://localhost:3000/api/*`

## 🚨 Error Handling

All endpoints follow a consistent error response format:

```typescript
{
  error: boolean,
  message: string,
  code: number,
  details?: any
}
```

Common status codes:

- `200`: Success
- `400`: Bad request
- `401`: Unauthorized
- `403`: Forbidden
- `429`: Too many requests
- `500`: Server error

## 🧪 Testing

Test files are located in `__tests__` directory:

```bash
# Run API tests
npm run test:api

# Test specific endpoint
npm run test:api -- --grep "contact"
```
