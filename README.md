# NXSYS Website

Official website for NXSYS - Premier SAP Systems Integrator in UAE

## Overview

This is a professional corporate website for NXSYS, built with modern HTML5, CSS3, and JavaScript. The website showcases NXSYS's SAP consulting services, solutions, and industry expertise.

## Features

- Responsive design that works on all devices
- Modern and professional UI following NXSYS brand guidelines
- Service and solution showcases
- Industry verticals display
- Case studies section
- Contact form
- Smooth scrolling and animations
- Mobile-friendly navigation

## Color Scheme

The website strictly follows the NXSYS brand colors:
- **Primary Color**: Crimson Red (#C8102E)
- **Secondary Color**: Black (#1a1a1a)
- **Accent Color**: White (#ffffff)

## File Structure

```
NXSYS/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with NXSYS theme
├── script.js           # JavaScript for interactivity
├── NXSYS Logo.png      # Company logo
└── README.md           # This file
```

## Local Development

To run the website locally:

1. Simply open `index.html` in your web browser
2. No build process or dependencies required

## Deployment to Render

### Option 1: Deploy as Static Site

1. **Create a GitHub Repository**
   - Create a new repository on GitHub
   - Push your website files to the repository:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin <your-repo-url>
     git push -u origin main
     ```

2. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" and select "Static Site"
   - Connect your GitHub repository
   - Configure the following:
     - **Name**: nxsys-website
     - **Branch**: main
     - **Build Command**: (leave empty)
     - **Publish Directory**: `.` (current directory)
   - Click "Create Static Site"

3. **Custom Domain Setup**
   - Once deployed, go to your service settings
   - Click "Custom Domain"
   - Add `nxsys.com` and `www.nxsys.com`
   - Update your DNS records with the provided values:
     - Add CNAME record for `www` pointing to your Render URL
     - Add A record for root domain pointing to Render's IP

### Option 2: Using render.yaml

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: nxsys-website
    env: static
    buildCommand: ""
    staticPublishPath: .
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

Then deploy:
1. Push the `render.yaml` to your repository
2. Go to Render Dashboard
3. Click "New +" and select "Blueprint"
4. Connect your repository
5. Render will automatically detect and deploy your site

## Customization

### Update Contact Information

Edit `index.html` and replace placeholder contact details:
- Phone: `+971-4-XXX-XXXX`
- Email: `info@nxsys.com`
- Address details in the contact section

### Update Content

All content can be edited directly in `index.html`:
- Services descriptions
- Company information
- Case studies
- Industries served
- Statistics

### Modify Colors

To adjust colors, edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #C8102E;
    --secondary-color: #1a1a1a;
    /* ... other variables */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

The website is optimized for performance:
- Minimal dependencies
- Optimized CSS and JavaScript
- Responsive images
- Lazy loading for animations

## Future Enhancements

Potential improvements:
- Add backend for contact form processing
- Integrate analytics (Google Analytics)
- Add blog section
- Client portal integration
- Multi-language support (Arabic/English)

## Support

For technical support or questions:
- Email: info@nxsys.com
- Website: https://nxsys.com

## License

Copyright © 2024 NXSYS. All rights reserved.
