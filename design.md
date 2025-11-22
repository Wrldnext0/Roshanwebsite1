# Portfolio Website Design System

## Design Philosophy

### Visual Language
- **Futuristic Minimalism**: Clean, sophisticated design with cutting-edge tech aesthetics
- **Glassmorphism**: Semi-transparent elements with backdrop blur effects
- **Neon Accents**: Strategic use of glowing elements against dark backgrounds
- **Professional Tech**: High-end portfolio feel with AI/tech industry relevance

### Color Palette
- **Primary Dark**: #0a0a0a (Deep black for main background)
- **Secondary Dark**: #1a1a1a (Card backgrounds)
- **Accent Cyan**: #00ffff (Primary neon accent)
- **Accent Purple**: #8b5cf6 (Secondary neon accent)
- **Accent Green**: #00ff88 (Success states)
- **Text Primary**: #ffffff (Main text)
- **Text Secondary**: #b0b0b0 (Secondary text)
- **Glass Overlay**: rgba(255, 255, 255, 0.05) (Glassmorphism base)

### Typography
- **Display Font**: "Orbitron" - Futuristic, tech-focused headings
- **Body Font**: "Inter" - Clean, readable sans-serif for content
- **Code Font**: "JetBrains Mono" - For technical elements
- **Font Sizes**: 
  - Hero Title: 4rem (64px)
  - Section Titles: 2.5rem (40px)
  - Body Text: 1rem (16px)
  - Small Text: 0.875rem (14px)

## Visual Effects

### Background Effects
- **Animated Gradient Mesh**: Subtle moving gradient background
- **Particle System**: Floating particles with mouse interaction
- **Grid Pattern**: Subtle tech grid overlay

### Animation Library Usage
- **Anime.js**: Smooth element animations and transitions
- **Typed.js**: Typewriter effect for hero tagline
- **Splitting.js**: Text reveal animations
- **ECharts.js**: Skills visualization charts
- **Splide**: Project carousel functionality
- **p5.js**: Interactive background particles

### Hover Effects
- **3D Tilt**: Cards lift and rotate on hover
- **Neon Glow**: Buttons and links get glowing borders
- **Color Shift**: Smooth color transitions
- **Scale Transform**: Subtle zoom effects on interactive elements

### Glassmorphism Elements
- **Navigation Bar**: Semi-transparent with backdrop blur
- **Cards**: Glass effect with subtle borders
- **Modal Windows**: Frosted glass appearance
- **Form Elements**: Glass input fields with neon accents

### Scroll Animations
- **Reveal on Scroll**: Elements fade in as they enter viewport
- **Parallax Background**: Subtle background movement
- **Progress Indicators**: Animated skill bars and progress rings
- **Stagger Animations**: Sequential element reveals

## Layout Structure

### Grid System
- **Container**: Max-width 1200px, centered
- **Columns**: CSS Grid with responsive breakpoints
- **Spacing**: Consistent 2rem spacing units
- **Responsive**: Mobile-first approach

### Section Design
- **Hero Section**: Full viewport height with animated background
- **About Section**: Split layout with image and content
- **Skills Section**: Grid layout with animated progress indicators
- **Projects Section**: Masonry grid with hover effects
- **Contact Section**: Glassmorphism form design

### Interactive Elements
- **Buttons**: Neon border with glow effects
- **Cards**: Glass design with 3D hover transforms
- **Form Fields**: Glass inputs with floating labels
- **Navigation**: Smooth transitions with active states

## Component Specifications

### Navigation Bar
- **Glassmorphism**: rgba(255, 255, 255, 0.1) with blur
- **Position**: Fixed top with backdrop filter
- **Height**: 80px
- **Z-index**: 1000

### Hero Section
- **Background**: Animated gradient mesh
- **Content**: Centered with typewriter animation
- **Image**: Circular frame with neon border
- **CTA Buttons**: Neon glow on hover

### Skill Cards
- **Background**: Glassmorphism with border
- **Progress Bars**: Neon fill animation
- **Hover**: 3D tilt with glow
- **Icons**: Tech-themed with color accents

### Project Gallery
- **Layout**: Masonry grid
- **Cards**: Glass design with image overlay
- **Filter**: Animated category buttons
- **Hover**: Zoom with info overlay
