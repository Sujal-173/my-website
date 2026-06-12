# EmailJS Setup Guide

Your contact form is now configured to send emails using EmailJS. Follow these steps to get it working:

## Step 1: Create EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com)
2. Click "Sign Up Free" and create an account
3. Verify your email

## Step 2: Get Your Public Key

1. In EmailJS dashboard, click **Account** (top-right menu)
2. Go to **API Keys** tab
3. Copy your **Public Key**
4. Paste it in `.env` file: `VITE_EMAILJS_PUBLIC_KEY=your_public_key`

## Step 3: Create Email Service

1. In EmailJS dashboard, click **Email Services** (left sidebar)
2. Click **Add Service**
3. Choose your email provider (Gmail recommended):
   - **For Gmail**: Select "Gmail" → Connect your Gmail account → Authorize
   - **For other providers**: Select the provider and follow prompts
4. Copy the **Service ID** (format: `service_xxxxxxxxxxxxx`)
5. Paste it in `.env` file: `VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxxx`

## Step 4: Create Email Template

1. In EmailJS dashboard, click **Email Templates** (left sidebar)
2. Click **Create New Template**
3. Fill in the template with these variables (copy-paste the template below):

**Template Name:** Contact Form Submission

**Subject:** New Contact from {{from_name}}

**Content:**

```
Hello,

You have a new contact form submission:

Name: {{from_name}}
Phone/WhatsApp: {{from_email}}
Business: {{business_name}}
Service Needed: {{service_needed}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. Click **Save**
5. Copy the **Template ID** (format: `template_xxxxxxxxxxxxx`)
6. Paste it in `.env` file: `VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxxxxx`

## Step 5: Update .env File

Your `.env` file should now look like:

```
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_EMAILJS_SERVICE_ID=service_abc123def456
VITE_EMAILJS_TEMPLATE_ID=template_xyz789abc123
```

## Step 6: Test the Form

1. Run `npm run dev` in your terminal
2. Open the Contact section of your portfolio
3. Fill in the form and click "Send Message"
4. Check your email inbox for the submission

## Troubleshooting

**Form not sending?**

- Make sure all three credentials are correctly pasted in `.env`
- Check browser console (F12 > Console) for error messages
- Verify EmailJS template variables match the names in Contact.tsx

**Not receiving emails?**

- Check spam/junk folder
- Verify email service is properly connected in EmailJS
- Make sure template content includes `{{message}}` variable

**Environment variables not loading?**

- Restart dev server after changing `.env`
- Make sure `.env` file is in the root directory (same level as `package.json`)

## Email Received! What Now?

When you receive a form submission email, you can:

1. Reply directly to the email (reply_to field is auto-populated)
2. Contact them via WhatsApp using their phone number
3. Follow up from your own email

---

Need help? Visit [EmailJS Documentation](https://www.emailjs.com/docs/)
