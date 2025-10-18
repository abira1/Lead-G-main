# 🔧 Maintenance Guide - Lead G

Guide for maintaining, updating, and troubleshooting the Lead G application.

---

## 📅 Regular Maintenance Tasks

### Weekly Tasks

- [ ] Check application logs for errors
- [ ] Monitor API response times
- [ ] Review database usage and performance
- [ ] Check for security advisories

### Monthly Tasks

- [ ] Update dependencies (see [Updating Dependencies](#updating-dependencies))
- [ ] Review and optimize database queries
- [ ] Clean up old logs and temporary files
- [ ] Backup Firebase database
- [ ] Review and update documentation

### Quarterly Tasks

- [ ] Security audit
- [ ] Performance optimization review
- [ ] Update Node.js and Python versions
- [ ] Review and update SSL certificates (production)
- [ ] Database optimization and cleanup

---

## 📦 Updating Dependencies

### Backend (Python)

```bash
# 1. Activate virtual environment
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2. Check for outdated packages
pip list --outdated

# 3. Update specific package
pip install --upgrade package-name

# 4. Test the application
python server.py
pytest

# 5. Update requirements.txt
pip freeze > requirements.txt

# 6. Commit changes
git add requirements.txt
git commit -m "Update Python dependencies"
```

### Frontend (Node.js)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Check for outdated packages
yarn outdated

# 3. Update interactively (recommended)
yarn upgrade-interactive --latest

# 4. Or update all packages
yarn upgrade --latest

# 5. Test the application
yarn start
yarn test
yarn build

# 6. Commit changes
git add package.json yarn.lock
git commit -m "Update Node.js dependencies"
```

### Security Updates

```bash
# Backend security check
pip install pip-audit
pip-audit

# Frontend security check
yarn audit
yarn audit fix  # Auto-fix vulnerabilities
```

---

## 🔍 Monitoring & Logs

### Backend Logs

**Location:**
```
/var/log/supervisor/backend.err.log  # Error logs
/var/log/supervisor/backend.out.log  # Output logs
```

**View logs:**
```bash
# View last 100 lines
tail -n 100 /var/log/supervisor/backend.err.log

# Follow logs in real-time
tail -f /var/log/supervisor/backend.err.log

# Search for errors
grep "ERROR" /var/log/supervisor/backend.err.log

# View logs from specific date
grep "2025-10-07" /var/log/supervisor/backend.err.log
```

### Frontend Logs

**Browser Console:**
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for API failures

**Build logs:**
```bash
cd frontend
yarn start > frontend.log 2>&1
tail -f frontend.log
```

### Application Monitoring

```bash
# Check service status
sudo supervisorctl status

# Check system resources
top
htop  # if installed

# Check disk usage
df -h

# Check memory usage
free -h

# Check network connections
netstat -tuln
```

---

## 🐛 Common Issues & Solutions

### Issue: Backend Not Starting

**Symptoms:**
- Backend shows as FATAL in supervisorctl
- Cannot access http://localhost:8001

**Solutions:**
```bash
# 1. Check error logs
tail -n 50 /var/log/supervisor/backend.err.log

# 2. Check if port is in use
lsof -i :8001
kill -9 <PID>  # If needed

# 3. Check Firebase credentials
cat backend/.env | grep FIREBASE

# 4. Test manually
cd backend
source venv/bin/activate
python server.py

# 5. Restart service
sudo supervisorctl restart backend
```

### Issue: Frontend Not Loading

**Symptoms:**
- Blank page at http://localhost:3000
- Build errors

**Solutions:**
```bash
# 1. Check for build errors
cd frontend
yarn build

# 2. Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn cache clean
yarn install

# 3. Check environment variables
cat frontend/.env

# 4. Restart service
sudo supervisorctl restart frontend
```

### Issue: Database Connection Failed

**Symptoms:**
- API returns 500 errors
- "Firebase connection failed" in logs

**Solutions:**
```bash
# 1. Verify Firebase credentials
cat backend/firebase-credentials.json

# 2. Check environment variables
cd backend
cat .env | grep FIREBASE

# 3. Test Firebase connection
python -c "import firebase_admin; print('OK')"

# 4. Verify project ID matches
# Compare .env FIREBASE_PROJECT_ID with Firebase Console
```

### Issue: CORS Errors

**Symptoms:**
- "Access to XMLHttpRequest blocked by CORS policy"
- API calls fail in browser

**Solutions:**
```bash
# 1. Check CORS configuration
cat backend/.env | grep CORS

# 2. Add frontend URL to CORS_ORIGINS
echo "CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000" >> backend/.env

# 3. Restart backend
sudo supervisorctl restart backend

# 4. Clear browser cache
# Open DevTools > Application > Clear Storage
```

### Issue: Port Already in Use

**macOS/Linux:**
```bash
# Find process
lsof -i :8001  # Backend
lsof -i :3000  # Frontend

# Kill process
kill -9 <PID>
```

**Windows:**
```bash
# Find process
netstat -ano | findstr :8001

# Kill process
taskkill /PID <PID> /F
```

---

## 🔄 Backup & Recovery

### Backup Firebase Database

```bash
# Using Firebase CLI
firebase firestore:export gs://[BUCKET_NAME]/[EXPORT_PREFIX]

# Or use Firebase Console:
# 1. Go to Firestore Database
# 2. Click "Import/Export"
# 3. Export to Cloud Storage
```

### Backup Environment Files

```bash
# Create backup directory
mkdir -p backups/$(date +%Y%m%d)

# Backup .env files (remove sensitive data first!)
cp backend/.env backups/$(date +%Y%m%d)/backend.env
cp frontend/.env backups/$(date +%Y%m%d)/frontend.env

# Backup Firebase credentials (encrypted)
tar -czf backups/$(date +%Y%m%d)/firebase-backup.tar.gz backend/firebase-credentials.json
```

### Recovery Process

```bash
# 1. Stop services
sudo supervisorctl stop all

# 2. Restore .env files
cp backups/YYYYMMDD/backend.env backend/.env
cp backups/YYYYMMDD/frontend.env frontend/.env

# 3. Restore Firebase credentials
tar -xzf backups/YYYYMMDD/firebase-backup.tar.gz -C backend/

# 4. Reinstall dependencies if needed
cd backend && pip install -r requirements.txt
cd ../frontend && yarn install

# 5. Restart services
sudo supervisorctl start all
```

---

## 🚀 Performance Optimization

### Backend Optimization

```bash
# 1. Enable production mode
# In backend/.env:
ENVIRONMENT=production
DEBUG=False

# 2. Use multiple workers
uvicorn server:app --workers 4 --host 0.0.0.0 --port 8001

# 3. Enable caching
# Add Redis for caching if needed

# 4. Optimize database queries
# Add indexes in Firestore Console
```

### Frontend Optimization

```bash
# 1. Build for production
cd frontend
yarn build

# 2. Analyze bundle size
yarn build --stats
npx webpack-bundle-analyzer build/bundle-stats.json

# 3. Enable compression
# Configure nginx or hosting provider for gzip/brotli

# 4. Use CDN for static assets
# Configure in hosting provider
```

### Database Optimization

```firebase
// Add indexes for frequently queried fields
// In Firestore Console > Indexes

// Collections:
- appointments: index on (date, status)
- contacts: index on (created_at)
- status_checks: index on (timestamp)
```

---

## 🔐 Security Maintenance

### Regular Security Checks

```bash
# 1. Check for vulnerabilities
cd backend
pip-audit  # Install: pip install pip-audit

cd ../frontend
yarn audit

# 2. Update security patches
pip install --upgrade pip setuptools
yarn upgrade

# 3. Review access logs
tail -n 1000 /var/log/supervisor/backend.out.log | grep "401\|403\|404\|500"

# 4. Check Firebase security rules
# Review in Firebase Console > Firestore > Rules
```

### Environment Security

```bash
# 1. Verify .env files are not in git
git ls-files | grep .env
# Should return nothing

# 2. Check file permissions
ls -la backend/.env frontend/.env
# Should show: -rw------- (600)

# 3. Rotate secrets periodically
# Update JWT_SECRET_KEY, API keys, etc.

# 4. Review CORS origins
cat backend/.env | grep CORS_ORIGINS
# Should only include your domains
```

---

## 📊 Database Maintenance

### Firestore Maintenance

```bash
# 1. Monitor usage
# Check Firebase Console > Usage & Billing

# 2. Clean up old data
# Write cleanup script for old records

# 3. Optimize collections
# Review and optimize document structure

# 4. Backup regularly
# Schedule automated backups
```

### Example Cleanup Script

```python
# backend/cleanup.py
from firebase_admin import firestore
from datetime import datetime, timedelta

db = firestore.client()

# Delete old status checks (older than 30 days)
cutoff = datetime.now() - timedelta(days=30)
old_docs = db.collection('status_checks').where('timestamp', '<', cutoff).stream()

for doc in old_docs:
    doc.reference.delete()
    print(f"Deleted: {doc.id}")
```

---

## 🔄 Version Control

### Git Best Practices

```bash
# 1. Always work on feature branches
git checkout -b feature/my-feature

# 2. Commit frequently with clear messages
git commit -m "feat: add new pricing feature"
git commit -m "fix: resolve CORS issue"
git commit -m "docs: update deployment guide"

# 3. Keep main branch stable
git checkout main
git merge feature/my-feature --no-ff

# 4. Tag releases
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### .gitignore Essentials

```gitignore
# Environment
.env
.env.local
.env.*.local

# Credentials
*credentials*.json
*.key
*.pem

# Dependencies
node_modules/
venv/
__pycache__/

# Build
build/
dist/
*.pyc

# Logs
*.log
logs/

# OS
.DS_Store
Thumbs.db
```

---

## 📞 Emergency Procedures

### Service Completely Down

```bash
# 1. Check all services
sudo supervisorctl status

# 2. Check system resources
df -h
free -h
top

# 3. Restart all services
sudo supervisorctl restart all

# 4. If still down, check logs
tail -n 100 /var/log/supervisor/*.err.log

# 5. Restore from backup if needed
# See Backup & Recovery section
```

### Database Connection Lost

```bash
# 1. Check Firebase status
# Visit: https://status.firebase.google.com/

# 2. Verify credentials
ls -la backend/firebase-credentials.json

# 3. Test connection manually
cd backend
source venv/bin/activate
python -c "import firebase_admin; from firebase_admin import credentials, firestore; cred = credentials.Certificate('firebase-credentials.json'); firebase_admin.initialize_app(cred); db = firestore.client(); print('Connected!')"

# 4. Restart backend
sudo supervisorctl restart backend
```

---

## 📝 Maintenance Checklist

### Daily
- [ ] Check service status
- [ ] Review error logs
- [ ] Monitor API response times

### Weekly
- [ ] Review security logs
- [ ] Check disk space
- [ ] Update documentation

### Monthly
- [ ] Update dependencies
- [ ] Database backup
- [ ] Performance review
- [ ] Security audit

### Quarterly
- [ ] Major version updates
- [ ] Infrastructure review
- [ ] Disaster recovery test
- [ ] Documentation update

---

## 📚 Additional Resources

- [FastAPI Best Practices](https://fastapi.tiangolo.com/deployment/best-practices/)
- [React Performance](https://react.dev/reference/react/memo)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Supervisor Documentation](http://supervisord.org/)

---

Last Updated: October 2025
