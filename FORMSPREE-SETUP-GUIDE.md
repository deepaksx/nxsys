# Formspree Contact Form Setup Guide

## What is Formspree?

Formspree is a free service that allows your contact form to send emails without needing a backend server. When someone submits the form, Formspree sends the data to your email address.

## Setup Instructions

### Step 1: Create a Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Click "Get Started" or "Sign Up"
3. Create a free account using your email (info@nxsys.com recommended)
4. Verify your email address

### Step 2: Create a New Form

1. Once logged in, click "New Form" or "+ New Project"
2. Give your form a name: "NXSYS Contact Form"
3. Formspree will generate a unique Form ID (looks like: `xpznabcd`)

### Step 3: Get Your Form Endpoint

After creating the form, you'll see an endpoint URL that looks like:
```
https://formspree.io/f/xpznabcd
```

Copy this URL - you'll need it in the next step.

### Step 4: Update contact.html

1. Open `contact.html` in your code editor
2. Find line 152 which currently says:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID:
   ```html
   <form id="contactForm" action="https://formspree.io/f/xpznabcd" method="POST">
   ```
4. Save the file

### Step 5: Test the Form

1. Open `contact.html` in your browser
2. Fill out all required fields
3. Click "Send Message"
4. You should see a loading spinner, then a success message
5. Check the email address you used for Formspree - you should receive the form submission

### Step 6: Configure Formspree Settings (Optional)

In your Formspree dashboard, you can configure:

1. **Email Notifications**
   - Add multiple email addresses to receive notifications
   - Customize the email template

2. **Auto-Reply**
   - Set up automatic confirmation emails to customers
   - Customize the auto-reply message

3. **Spam Protection**
   - Enable reCAPTCHA (already has honeypot field)
   - Block submissions from specific domains

4. **Export Data**
   - Download all form submissions as CSV
   - View submission history

## Features Already Implemented

✅ **Form Fields:**
- Name (required)
- Email (required)
- Phone (optional)
- Company Name (optional)
- Service of Interest (required)
- Industry (optional)
- Message (required)

✅ **User Experience:**
- Loading spinner during submission
- Success message after submission
- Error message if submission fails
- Form automatically resets after success
- Smooth scroll to status message

✅ **Security:**
- Honeypot field (`_gotcha`) to prevent spam bots
- Client-side form validation
- HTTPS submission to Formspree

## Formspree Free Plan Limits

- **50 submissions per month** (free tier)
- Unlimited forms
- Email notifications
- Spam filtering
- File uploads (if needed)

If you need more than 50 submissions per month, upgrade to:
- **Gold Plan**: $10/month - 1,000 submissions
- **Platinum Plan**: $40/month - Unlimited submissions

## Email Notification Format

When someone submits the form, you'll receive an email with:

**Subject:** New submission from NXSYS Contact Form

**Body:**
```
Name: John Doe
Email: john@example.com
Phone: +971-50-1234567
Company: ABC Corporation
Service: SAP S/4HANA
Industry: Manufacturing
Message: We are interested in SAP S/4HANA implementation for our manufacturing facility in Dubai...
```

## Troubleshooting

### Form doesn't submit
- Check that you replaced `YOUR_FORM_ID` with your actual Form ID
- Ensure you're connected to the internet
- Check browser console for errors (F12 → Console)

### Not receiving emails
- Check spam/junk folder
- Verify email address in Formspree dashboard
- Confirm form is active in Formspree dashboard

### Success message doesn't show
- Check that all required fields are filled
- Ensure JavaScript is enabled in browser
- Check browser console for errors

## Alternative: Using Your Own Email Directly

If you prefer not to use Formspree, you can also set up:
1. A PHP backend script
2. SendGrid/Mailgun API
3. AWS SES
4. Google Forms integration

But Formspree is the easiest and requires no backend code!

## Support

- Formspree Documentation: https://help.formspree.io
- Formspree Support: support@formspree.io
- NXSYS Technical Contact: Check your email for form submissions

---

**Last Updated:** 2024
**Status:** Ready to activate (just need to add Form ID)
