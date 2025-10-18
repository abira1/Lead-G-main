# 📦 Dependencies Documentation

Complete list of all dependencies used in Lead G application with their versions and purposes.

---

## 🐍 Backend Dependencies (Python)

### Core Framework & Server

| Package | Version | Purpose |
|---------|---------|---------|
| **fastapi** | 0.115.6 | Modern web framework for building APIs |
| **uvicorn[standard]** | 0.34.0 | ASGI server for running FastAPI |
| **python-dotenv** | 1.0.1 | Load environment variables from .env files |
| **python-multipart** | 0.0.18 | Support for file uploads and form data |

### Database & Storage

| Package | Version | Purpose |
|---------|---------|---------|
| **firebase-admin** | 6.5.0 | Firebase Admin SDK for Firestore database |

### Data Validation

| Package | Version | Purpose |
|---------|---------|---------|
| **pydantic** | 2.10.5 | Data validation using Python type hints |
| **email-validator** | 2.2.0 | Email address validation |

### Date & Time

| Package | Version | Purpose |
|---------|---------|---------|
| **python-dateutil** | 2.9.0.post0 | Extensions to the standard datetime module |

### Security & Authentication

| Package | Version | Purpose |
|---------|---------|---------|
| **cryptography** | 44.0.0 | Cryptographic recipes and primitives |
| **pyjwt** | 2.10.1 | JSON Web Token implementation |
| **passlib[bcrypt]** | 1.7.4 | Password hashing library |

### Development Tools

| Package | Version | Purpose |
|---------|---------|---------|
| **pytest** | 8.3.4 | Testing framework |
| **black** | 24.10.0 | Code formatter |
| **isort** | 5.13.2 | Import statement organizer |
| **flake8** | 7.1.1 | Code linter |

### Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| **requests** | 2.32.3 | HTTP library for API calls |
| **typer** | 0.15.1 | CLI application framework |

### Export Functionality

| Package | Version | Purpose |
|---------|---------|---------|
| **reportlab** | 4.2.5 | PDF generation |
| **openpyxl** | 3.1.5 | Excel file reading/writing |
| **xlsxwriter** | 3.2.0 | Excel file creation |

---

## ⚛️ Frontend Dependencies (Node.js)

### Core Framework

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | 18.3.1 | JavaScript library for building UIs |
| **react-dom** | 18.3.1 | React package for working with the DOM |
| **react-scripts** | 5.0.1 | Create React App scripts |

### Routing

| Package | Version | Purpose |
|---------|---------|---------|
| **react-router-dom** | 6.26.2 | Declarative routing for React |

### UI Component Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| **@radix-ui/react-accordion** | 1.2.8 | Accessible accordion component |
| **@radix-ui/react-alert-dialog** | 1.1.11 | Modal dialog for alerts |
| **@radix-ui/react-avatar** | 1.1.7 | Avatar component |
| **@radix-ui/react-checkbox** | 1.2.3 | Checkbox input |
| **@radix-ui/react-dialog** | 1.1.11 | Modal dialog component |
| **@radix-ui/react-dropdown-menu** | 2.1.12 | Dropdown menu component |
| **@radix-ui/react-label** | 2.1.4 | Label for form inputs |
| **@radix-ui/react-popover** | 1.1.11 | Popover component |
| **@radix-ui/react-select** | 2.2.2 | Select dropdown |
| **@radix-ui/react-slider** | 1.3.2 | Slider input |
| **@radix-ui/react-switch** | 1.2.2 | Toggle switch |
| **@radix-ui/react-tabs** | 1.1.9 | Tab navigation component |
| **@radix-ui/react-toast** | 1.2.11 | Toast notification |
| **@radix-ui/react-tooltip** | 1.2.4 | Tooltip component |

### Form Management

| Package | Version | Purpose |
|---------|---------|---------|
| **react-hook-form** | 7.56.2 | Form state management and validation |
| **@hookform/resolvers** | 3.9.1 | Validation resolvers for react-hook-form |
| **zod** | 3.24.4 | TypeScript-first schema validation |

### Animation

| Package | Version | Purpose |
|---------|---------|---------|
| **framer-motion** | 12.23.13 | Production-ready animation library |

### Icons & Graphics

| Package | Version | Purpose |
|---------|---------|---------|
| **lucide-react** | 0.507.0 | Beautiful & consistent icon library |
| **three** | 0.180.0 | 3D graphics library (for LiquidEther) |

### Styling

| Package | Version | Purpose |
|---------|---------|---------|
| **tailwindcss** | 3.4.17 | Utility-first CSS framework |
| **tailwindcss-animate** | 1.0.7 | Animation utilities for Tailwind |
| **tailwind-merge** | 3.2.0 | Merge Tailwind CSS classes |
| **autoprefixer** | 10.4.20 | PostCSS plugin for vendor prefixes |
| **postcss** | 8.4.49 | CSS transformation tool |
| **class-variance-authority** | 0.7.1 | CSS-in-JS variant management |
| **clsx** | 2.1.1 | Utility for constructing className strings |

### HTTP Client

| Package | Version | Purpose |
|---------|---------|---------|
| **axios** | 1.8.4 | Promise-based HTTP client |

### Date Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| **date-fns** | 4.1.0 | Modern date utility library |
| **react-day-picker** | 8.10.1 | Date picker component |

### UI Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| **cmdk** | 1.1.1 | Command menu component |
| **embla-carousel-react** | 8.6.0 | Carousel/slider component |
| **input-otp** | 1.4.2 | OTP input component |
| **react-resizable-panels** | 3.0.1 | Resizable panel layout |
| **sonner** | 2.0.3 | Toast notification system |
| **vaul** | 1.1.2 | Drawer component |

### Development Tools

| Package | Version | Purpose |
|---------|---------|---------|
| **@craco/craco** | 7.1.0 | Create React App Configuration Override |
| **eslint** | 8.57.1 | JavaScript linter |
| **eslint-plugin-react** | 7.37.4 | React-specific linting rules |
| **eslint-plugin-react-hooks** | 5.1.0 | Lint React Hooks rules |
| **eslint-plugin-jsx-a11y** | 6.10.2 | Accessibility linting |
| **prettier** | 3.4.2 | Code formatter |
| **typescript** | 4.9.5 | TypeScript compiler |

---

## 🔄 Updating Dependencies

### Backend (Python)

```bash
# Check for outdated packages
pip list --outdated

# Update all packages
pip install --upgrade -r requirements.txt

# Update specific package
pip install --upgrade package-name

# Freeze updated dependencies
pip freeze > requirements.txt
```

### Frontend (Node.js)

```bash
# Check for outdated packages
yarn outdated

# Update all packages (respecting version ranges)
yarn upgrade

# Update specific package
yarn upgrade package-name

# Update to latest versions (ignoring ranges)
yarn upgrade-interactive --latest

# Update package.json with latest versions
yarn upgrade --latest
```

---

## 🔒 Security Updates

### Check for vulnerabilities

```bash
# Backend
pip check
pip-audit  # Install: pip install pip-audit

# Frontend
yarn audit
yarn audit fix  # Automatically fix vulnerabilities
```

### Regular maintenance

- Check for security advisories weekly
- Update dependencies monthly
- Test thoroughly after updates
- Keep production and development environments in sync

---

## 📝 Version Pinning Strategy

### Backend (requirements.txt)

- **Exact versions** (`==`) for critical packages
- Allows minor and patch updates for most packages
- Lock versions in production

### Frontend (package.json)

- **Caret** (`^`) allows minor and patch updates
- **Tilde** (`~`) allows only patch updates
- **Exact** versions for critical packages

---

## 🚨 Breaking Changes

### Monitor these packages for breaking changes:

**Backend:**
- FastAPI (pre-1.0, minor versions may break)
- Pydantic (v2 had breaking changes from v1)
- Firebase Admin SDK

**Frontend:**
- React (major version updates)
- React Router (v6 was a major rewrite)
- Framer Motion (animation API changes)
- Radix UI components (individual package updates)

---

## 📚 Documentation Links

### Backend

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Pydantic Docs](https://docs.pydantic.dev/)
- [Firebase Admin Python SDK](https://firebase.google.com/docs/admin/setup)
- [Uvicorn Docs](https://www.uvicorn.org/)

### Frontend

- [React Docs](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Radix UI Docs](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

## ✅ Compatibility Matrix

| Component | Minimum Version | Recommended Version |
|-----------|----------------|---------------------|
| **Node.js** | 16.0.0 | 20.x LTS |
| **Python** | 3.10 | 3.11.x |
| **Yarn** | 1.22.0 | 1.22.22 |
| **pip** | 21.0 | Latest |

---

## 🔧 Troubleshooting Dependencies

### Backend dependency conflicts

```bash
# Create fresh virtual environment
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend dependency conflicts

```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn cache clean
yarn install
```

### Platform-specific issues

**macOS M1/M2 (Apple Silicon):**
```bash
# Some packages may need Rosetta
arch -x86_64 pip install package-name
```

**Windows:**
```bash
# May need Microsoft C++ Build Tools for some packages
# Download from: https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

---

Last Updated: October 2025
