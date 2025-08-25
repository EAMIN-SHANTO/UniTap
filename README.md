# Student Balance Portal - Setup Guide

## Overview
This React application allows students to check their RFID card balance and view transaction history from your Google Sheets backend.

## Features
- ✅ **Read-only access** - Students can only view their data
- ✅ **Real-time balance** - Shows current balance from Google Sheets
- ✅ **Transaction history** - Displays recharge, bus, cafe, and attendance records
- ✅ **Mobile-friendly** - Responsive design works on all devices
- ✅ **Secure** - No write permissions, only data viewing

## Setup Instructions

### Step 1: Update Google Apps Script
1. Open your Google Apps Script project
2. Replace your existing `Google_Sheet.js` with the extended version that includes:
   - `get_student_data` endpoint
   - `get_all_students` endpoint
   - `get_student_transactions` endpoint
3. Deploy the script as a web app with the same permissions

### Step 2: Install React Application
```bash
# Navigate to the student-portal directory
cd /Users/eamin/Downloads/360project/student-portal

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Step 3: Update Google Apps Script URL
In `src/App.js`, update the `GOOGLE_SCRIPT_URL` variable with your actual Web App URL:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_ACTUAL_GOOGLE_SCRIPT_WEB_APP_URL';
```

### Step 4: Test the Application
1. Start the React app: `npm start`
2. Enter a valid Card UID (e.g., from your Google Sheets)
3. Click "Check Balance"
4. Verify that student data and transactions display correctly

## Deployment Options

### Option 1: GitHub Pages (Free)
```bash
# Build for production
npm run build

# Deploy to GitHub Pages (if you have gh-pages package)
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d build"
npm run deploy
```

### Option 2: Netlify (Free)
1. Create account at netlify.com
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy automatically

### Option 3: Vercel (Free)
1. Create account at vercel.com
2. Import your GitHub repository
3. Deploy with one click

### Option 4: Firebase Hosting (Free)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## Google Apps Script CORS Setup

To allow your React app to access the Google Apps Script, you may need to handle CORS. Add this to your Google Apps Script:

```javascript
function doGet(e) {
  // Your existing code...
  
  // Set CORS headers
  var output = ContentService.createTextOutput(JSON.stringify(responseData));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers
  output.setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  
  return output;
}
```

## Security Considerations

### ✅ What's Secure:
- **Read-only access** - Students can only view data
- **No authentication bypass** - Can only see data for entered Card UID
- **No write permissions** - Cannot modify any Google Sheets data
- **Input validation** - Card UID is validated before requests

### ⚠️ Additional Security (Optional):
- **Rate limiting** - Add request limits in Google Apps Script
- **Card UID validation** - Verify format before processing
- **Student authentication** - Add login system if needed

## Usage Examples

### Valid Card UIDs from your system:
- Check your Google Sheets "students" tab for existing Card UIDs
- Example format: `AB12CD34EF`, `1234567890`, etc.

### Testing Data:
1. Enter a Card UID from your students sheet
2. Should display:
   - Current balance
   - Student ID
   - Registration date
   - Recent transactions (recharge, bus, cafe, attendance)

## Troubleshooting

### Common Issues:

1. **"Failed to fetch data"**
   - Check Google Apps Script URL
   - Verify script is deployed as web app
   - Check browser console for CORS errors

2. **"Student not found"**
   - Verify Card UID exists in Google Sheets
   - Check for typos in Card UID

3. **Empty transaction history**
   - Normal if student hasn't made transactions
   - Check if balance, bus, cafe, attendance sheets exist

4. **CORS errors**
   - Add CORS headers to Google Apps Script
   - Deploy script with proper permissions

## Customization

### Styling:
- Modify styled-components in `App.js`
- Change colors, fonts, layout as needed
- Add your school/company branding

### Features:
- Add more transaction types
- Include charts/graphs for spending
- Add balance alerts/notifications
- Implement student authentication

## API Endpoints Used

### Student Data:
```
GET ?action=get_student_data&card_uid=YOUR_CARD_UID
Response: {
  "success": true,
  "studentId": "STU001",
  "cardUid": "AB12CD34EF",
  "balance": 125.50,
  "registrationDate": "2024-01-01",
  "status": "Active"
}
```

### Transaction History:
```
GET ?action=get_student_transactions&card_uid=YOUR_CARD_UID
Response: {
  "success": true,
  "transactions": [
    {
      "date": "2024-01-15T10:30:00",
      "type": "Recharge",
      "amount": 100,
      "balance": 125.50,
      "description": "Account recharge"
    }
  ]
}
```

## Next Steps

1. **Deploy the React app** to your preferred hosting platform
2. **Share the URL** with students
3. **Add to your project documentation**
4. **Consider adding features** like:
   - QR code scanning for easy Card UID entry
   - Push notifications for low balance
   - Monthly spending reports
   - Integration with student information systems

Your students will now have a modern, user-friendly way to check their RFID card balance and transaction history! 🎓💳