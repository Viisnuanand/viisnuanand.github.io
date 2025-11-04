# Design Guidelines for Viisnu Anand S Portfolio

## Design Approach
**Reference-Based Preservation with Modern Enhancements**
- Maintain exact visual fidelity to the original GitHub Pages portfolio
- Add contemporary features (dark/light theme, animations, mobile menu) without disrupting the established design language
- Ensure seamless integration of new features with existing aesthetic

## Layout System

### Spacing Primitives
Use Tailwind-equivalent spacing units: **4, 8, 12, 16, 24, 32, 48, 64**
- Section padding: py-16 on mobile, py-24 on desktop
- Component spacing: gap-8 for grids, gap-4 for smaller elements
- Container max-width: 1200px (max-w-6xl)

### Section Structure
1. **Navigation Bar**: Fixed/sticky header with logo/name, navigation links (Home, About, Projects, Contact), and theme toggle button
2. **Hero Section**: Full-viewport or near-full-viewport introduction with name, tagline, and CTA button
3. **About Section**: Two-column layout (profile image + bio/skills) on desktop, stacked on mobile
4. **Projects Section**: Grid layout showcasing 3 projects with equal-height cards
5. **Contact Section**: Social media links and contact information, centered layout

## Typography

### Font Families
- Primary: Use the exact font from the original site (likely a modern sans-serif like Inter, Roboto, or system font stack)
- Maintain original font weights and sizes for each heading level
- Preserve original line heights and letter spacing

### Hierarchy
- H1 (Hero name): 3rem - 4rem (text-5xl to text-6xl)
- H2 (Section titles): 2rem - 2.5rem (text-3xl to text-4xl)
- H3 (Project titles, subsections): 1.5rem - 1.75rem (text-2xl to text-3xl)
- Body text: 1rem - 1.125rem (text-base to text-lg)
- Subtitle/tagline: 1.125rem - 1.25rem (text-lg to text-xl)

## Component Library

### Navigation
- Horizontal desktop navigation with smooth hover transitions
- Mobile hamburger menu with slide-in/fade-in animation from right or top
- Active section indicator (underline or color change)
- Theme toggle icon/button with smooth transition

### Buttons
- Primary CTA: Preserve original button style (padding, border-radius, font weight)
- Maintain original hover states (likely color shifts or subtle scale)
- For buttons on images: Add backdrop-blur-md with semi-transparent background

### Project Cards
- Equal-height cards with consistent padding (p-6 to p-8)
- Preserve original card styling (borders, shadows, background)
- Hover effect: Maintain original (likely subtle lift or shadow increase)
- Card content: Project title, description, technology tags if present

### About Section
- Profile image: Circular or rounded with consistent sizing (200-300px diameter)
- Skills grid: 3-4 columns on desktop, 2 columns on tablet, 1-2 on mobile
- Skill items: Icon or bullet + text, consistent spacing

### Social Links
- Icon-based links (maintain original icon style)
- Horizontal layout with even spacing
- Hover effects: Original style (color change or scale)

## Theme System

### Dark/Light Toggle Implementation
- Toggle button in navigation bar (moon/sun icon)
- Smooth color transition (transition-colors duration-300)
- Store preference in localStorage
- Ensure all text maintains readability contrast in both modes
- Preserve original light mode colors, create appropriate dark mode palette

### Color Preservation
- Extract and maintain exact colors from original site for light mode
- Create harmonious dark mode variants with proper contrast ratios (WCAG AA minimum)

## Animations & Interactions

### Scroll Animations
- Fade-in on scroll for major sections (opacity 0 to 1, translateY slight movement)
- Stagger animation for project cards (sequential appearance)
- Trigger point: When element is 15-20% in viewport
- Duration: 600-800ms with ease-out timing

### Navigation Animations
- Hamburger menu: Slide-in from right with overlay fade-in (300ms)
- Smooth scroll behavior for anchor links (scroll-behavior: smooth)
- Active section highlighting with smooth transition

### Micro-interactions
- Button hover: Preserve original (likely color/shadow change)
- Card hover: Preserve original elevation/shadow change
- Theme toggle: Icon rotation or fade transition (200ms)

## Responsive Behavior

### Breakpoints
- Mobile: < 640px (single column, hamburger menu)
- Tablet: 640px - 1024px (adjusted spacing, possible 2-column grids)
- Desktop: > 1024px (full multi-column layouts, horizontal navigation)

### Mobile Optimizations
- Hero section: Reduce font sizes by 20-30%
- About section: Stack image above content
- Projects grid: Single column with full-width cards
- Skills grid: 2 columns maximum
- Navigation: Hamburger menu with slide-in drawer

## Images

### Hero Section
**Large Hero Image**: Yes, if original site has background image or visual element
- Full-width background with overlay if text is on top
- Maintain aspect ratio and quality
- Optimize for web (compressed but sharp)

### Profile Image
- Location: About section, left side on desktop
- Style: Match original (circular with border or drop shadow)
- Size: 250-300px diameter on desktop, 200px on mobile
- Format: JPG or WebP for optimization

### Project Images (if present in original)
- Thumbnail images for each project card
- Aspect ratio: 16:9 or 4:3 depending on original
- Placement: Top of card or background with overlay

## Accessibility
- Maintain semantic HTML structure (nav, main, section, article tags)
- ARIA labels for hamburger menu toggle and theme toggle
- Keyboard navigation support for all interactive elements
- Focus indicators matching theme colors
- Alt text for all images
- Color contrast ratios meeting WCAG AA standards in both themes

## File Structure & Offline Compatibility
- All assets (images, icons) stored in /assets/ directory
- Self-contained CSS and JavaScript (no CDN dependencies unless original uses them)
- Inline SVG icons for theme toggle and hamburger menu
- Web fonts loaded from local files or system font stack fallback

## Performance Considerations
- Lazy load project images below the fold
- Minimize animation JavaScript (use CSS transitions where possible)
- Intersection Observer for scroll animations
- Debounce scroll listeners
- Optimize image sizes for web delivery