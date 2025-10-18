# Lead G Frontend

Modern React frontend for the Lead G lead generation platform with glass morphism design and responsive layout.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env if needed - defaults should work for local development
   ```

3. **Start development server:**
   ```bash
   yarn start
   ```

The application will be available at http://localhost:3000

## 📚 Available Scripts

```bash
yarn start    # Start development server
yarn build    # Build for production
yarn test     # Run tests
yarn lint     # Check code quality
yarn lint:fix # Fix linting issues
yarn format   # Format code with Prettier
```

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── About.jsx     # About page
│   │   ├── Contact.jsx   # Contact form
│   │   ├── Footer.jsx    # Footer component
│   │   ├── Header.jsx    # Navigation header
│   │   └── ...
│   ├── data/             # Mock data and constants
│   ├── App.js            # Main application
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── craco.config.js       # Create React App configuration
```

## 🎨 Design System

### Glass Morphism
The app features a modern glass morphism design with:
- Backdrop blur effects
- Semi-transparent backgrounds
- Subtle shadows and borders
- Smooth animations

### Components
- **GlassBox**: Reusable glass effect container
- **ScrollReveal**: Animated scroll-triggered reveals
- **Responsive Design**: Mobile-first approach

### Color Palette
- Primary: `#00FFD1` (Cyan)
- Background: Black/Dark gradients
- Glass: White with low opacity
- Text: White with varying opacity

## 🛠️ Tech Stack

### Core
- **React 18** - Modern React with hooks
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Forms
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Build Tools
- **Create React App** - Build toolchain
- **CRACO** - CRA configuration override
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🔧 Configuration

### Environment Variables (.env)

```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:8001

# Environment
REACT_APP_ENVIRONMENT=development
```

### Tailwind Configuration

Custom Tailwind configuration includes:
- Glass morphism utilities
- Custom animations
- Extended color palette
- Responsive breakpoints

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- `sm`: 640px (Mobile)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (Large Desktop)

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test --coverage

# Run tests in watch mode
yarn test --watch
```

## 🚀 Production Build

```bash
# Create production build
yarn build

# Serve locally to test
npx serve -s build
```

### Build Optimization
- Code splitting
- Tree shaking
- Asset optimization
- PWA ready

## 🔍 Key Features

### Navigation
- Responsive header with glass effect
- Dropdown menus for Services and Industries
- Mobile-friendly hamburger menu
- Portal-based dropdowns for proper z-index

### Pages
- **Home**: Hero section with animated metrics
- **About**: Company information and values
- **Contact**: Advanced contact form with validation
- **Privacy Policy**: Legal compliance
- **Terms of Service**: Service terms

### Components
- **Header**: Navigation with dropdowns
- **Footer**: Company info and links
- **GlassBox**: Reusable glass morphism container
- **ScrollReveal**: Animated scroll reveals
- **Contact Form**: Validated contact submission

## 📊 Performance

### Optimization Techniques
- Component lazy loading
- Image optimization
- CSS purging with Tailwind
- Bundle splitting
- Service worker caching

### Core Web Vitals
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## 🛠️ Development

### Code Style
- ESLint configuration for React
- Prettier for consistent formatting
- Component naming conventions
- File organization standards

### Best Practices
- Functional components with hooks
- Custom hooks for reusable logic
- Proper error boundaries
- Accessibility compliance
- SEO optimization

## 🤝 Contributing

1. Follow the established code style
2. Use functional components and hooks
3. Include PropTypes or TypeScript types
4. Write tests for new components
5. Update documentation

## 🆘 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

**API Connection Issues:**
```
Check REACT_APP_BACKEND_URL in .env
Ensure backend server is running on correct port
Verify CORS configuration in backend
```

**Styling Issues:**
```
Run Tailwind rebuild: yarn build
Check component class names
Verify Tailwind configuration
```

**Performance Issues:**
```
Use React DevTools Profiler
Check for unnecessary re-renders
Optimize large lists with virtualization
Lazy load heavy components
```

---

For more information, visit the [main project README](../README.md).