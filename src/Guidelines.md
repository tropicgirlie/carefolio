# Carefolio Design System Guidelines
*Stark-Inspired Professional Polish with Care-Focused Identity*

## Overview
Carefolio maintains its unique care-focused green color system and maternal design language while achieving Stark-level professional polish through systematic design principles, consistent spacing, and enhanced visual hierarchy.

---

## 🎨 **Visual Design Principles**

### **1. Systematic 8px Grid Spacing**
All spacing must follow the 8px grid system for visual harmony:

```css
--space-1: 8px    /* Minimal gaps */
--space-2: 16px   /* Component spacing */
--space-3: 24px   /* Section spacing */
--space-4: 32px   /* Large spacing */
--space-5: 40px   /* Hero spacing */
--space-6: 48px   /* Major sections */
--space-8: 64px   /* Page sections */
--space-10: 80px  /* Large sections */
--space-12: 96px  /* Hero areas */
--space-16: 128px /* Maximum spacing */
```

**Implementation:**
- Use `space-3` (24px) minimum between major UI sections
- Use `space-6` (48px) around hero content
- Use `space-2` (16px) for component internal spacing
- Use `space-1` (8px) for minimal gaps between related elements

### **2. Container Width System**
Consistent container widths for different content types:

```css
.container-sm  { max-width: 640px; }   /* Forms, modals */
.container-md  { max-width: 768px; }   /* Article content */
.container-lg  { max-width: 1024px; }  /* Dashboard sections */
.container-xl  { max-width: 1280px; }  /* Main layouts */
.container-full{ max-width: 1440px; }  /* Landing pages */
```

### **3. Enhanced Typography Hierarchy**
Strong visual contrast between content levels:

#### **Headlines (Figtree SemiBold)**
- `.headline-h1`: 40px - Landing hero headlines
- `.headline-h2`: 32px - Section headers  
- `.headline-h3`: 22px - Sub-headers

#### **Body Text (Inter Regular/Medium)**
- `.body-large`: 18px - Large body text
- `.body-medium`: 16px - Standard body text
- `.body-small`: 14px - Small body text

#### **Data Typography (IBM Plex Mono)**
- `.data-large`: 18px - Key metrics (ENHANCED visibility)
- `.data-medium`: 16px - Standard data (ENHANCED visibility)
- `.data-small`: 14px - Data labels (ENHANCED visibility)

---

## 🔧 **Component Standards**

### **1. Button System**
Unified button heights and styling:

```css
.btn-sm { height: 32px; padding: 0 12px; }  /* Compact actions */
.btn-md { height: 40px; padding: 0 16px; }  /* Standard buttons */
.btn-lg { height: 48px; padding: 0 24px; }  /* Primary CTAs */
.btn-xl { height: 56px; padding: 0 32px; }  /* Hero buttons */
```

#### **Button Variants:**
- **Primary (Orange)**: `bg-[#F25C05]` for main CTAs
- **Secondary (Green Outlined)**: `border-primary text-primary` for secondary actions
- **Text (Green)**: `text-primary` for tertiary actions

### **2. Corner Radius System**
Consistent rounding for visual cohesion:

```css
--radius-xs: 4px;   /* Small elements */
--radius-sm: 8px;   /* Buttons, badges */
--radius-md: 12px;  /* Cards, inputs */
--radius-lg: 16px;  /* Large cards */
--radius-xl: 24px;  /* Hero elements */
```

### **3. Elevation System**
Professional shadow hierarchy:

```css
--elevation-1: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
--elevation-2: 0 2px 4px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.08);
--elevation-3: 0 4px 6px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.1);
--elevation-4: 0 6px 8px rgba(0,0,0,0.09), 0 6px 12px rgba(0,0,0,0.12);
--elevation-5: 0 8px 10px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.15);
```

---

## 🎯 **Interaction Standards**

### **1. State Layer System**
All interactive elements must include state layers:

```css
.state-layer::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: currentColor;
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.state-layer:hover::before { opacity: 0.08; }
.state-layer:focus::before { opacity: 0.12; }
.state-layer:active::before { opacity: 0.16; }
```

### **2. Transition Standards**
Consistent timing for all animations:

- **Micro-interactions**: `duration: 0.2s`
- **Component transitions**: `duration: 0.3s`
- **Page transitions**: `duration: 0.4s`
- **Easing**: `cubic-bezier(0.2, 0, 0, 1)` for all animations

### **3. Loading States**
Professional loading indicators:

- **Skeleton screens** for content loading
- **Pulse animations** for loading indicators
- **Backdrop blur** for overlay states
- **Progress indicators** for multi-step processes

---

## 🌱 **Carefolio-Specific Guidelines**

### **1. Color Usage**
Maintain Carefolio's green identity:

- **Primary Green**: `#2BAE66` (Emerald) for main actions and data
- **Secondary Green**: `#00C896` (Vibrant Mint) for accents and hover states
- **Tertiary Green**: `#009688` (Teal) for variety and alternative states
- **Orange CTAs**: `#F25C05` exclusively for primary call-to-actions
- **Notification Surface**: `#E9F7EF` (Green Muted) for status displays

### **2. Data Visualization**
Enhanced visibility for financial data:

- **Care Scores**: Use `data-large` or `data-medium` classes
- **Metric Numbers**: Always use IBM Plex Mono with `font-feature-settings: 'tnum' 1`
- **Color Coding**: Green for positive, coral for attention needed
- **Contrast**: Ensure WCAG AAA compliance for all data displays

### **3. Maternal Design Language**
Preserve care-focused identity:

- **Heart-leaf icons** for navigation and accents
- **Nurturing language** in copy and labels
- **Garden metaphors** for company health states
- **Systemic thinking** in information architecture

---

## 📱 **Responsive Design Standards**

### **1. Breakpoint System**
```css
/* Mobile First Approach */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### **2. Touch Targets**
- **Minimum**: 44px x 44px for all interactive elements
- **Recommended**: 48px x 48px for primary actions
- **Spacing**: Minimum 8px between touch targets

### **3. Mobile Optimizations**
- **Compact headers** with collapsible navigation
- **Card layouts** instead of tables on small screens
- **Bottom navigation** for primary actions
- **Swipe gestures** for secondary interactions

---

## ⚡ **Performance Guidelines**

### **1. Animation Performance**
- Use `transform` and `opacity` for animations
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly and remove after animation
- Prefer `motion/react` for complex animations

### **2. Image Optimization**
- Use `ImageWithFallback` component for all images
- Implement lazy loading for below-fold content
- Provide appropriate alt text for accessibility
- Use modern formats (WebP, AVIF) with fallbacks

### **3. Bundle Size**
- Import components individually from UI libraries
- Use dynamic imports for large components
- Avoid importing entire icon libraries
- Implement code splitting for routes

---

## 🔍 **Accessibility Standards**

### **1. Color Contrast**
- **AA compliance** minimum for all text
- **AAA compliance** preferred for data and metrics
- **Color-blind friendly** palette choices
- **Never rely on color alone** for information

### **2. Keyboard Navigation**
- **Tab order** must be logical and complete
- **Focus indicators** clearly visible on all interactive elements
- **Skip links** for main content areas
- **Escape key** closes all modals and overlays

### **3. Screen Reader Support**
- **Semantic HTML** structure throughout
- **ARIA labels** for complex interactions
- **Live regions** for dynamic content updates
- **Alternative text** for all informational images

---

## 🚀 **Implementation Checklist**

### **Before Publishing Any Component:**
- [ ] Uses systematic 8px grid spacing
- [ ] Follows typography hierarchy correctly
- [ ] Implements proper state layers
- [ ] Has consistent corner radius
- [ ] Uses appropriate elevation
- [ ] Includes loading states
- [ ] Passes accessibility audit
- [ ] Works on mobile devices
- [ ] Has proper keyboard navigation
- [ ] Maintains Carefolio brand identity

### **Code Quality Standards:**
- [ ] TypeScript interfaces defined
- [ ] Props properly documented
- [ ] Error boundaries implemented
- [ ] Loading states handled
- [ ] Responsive behavior tested
- [ ] Animation performance optimized
- [ ] Bundle size impact assessed

---

## 📚 **Resources**

### **Design References:**
- **Stark.co**: Professional polish and micro-interactions
- **Material Design 3**: Elevation, state layers, color roles
- **Carefolio Brand**: Green color system, maternal language

### **Development Tools:**
- **Motion/React**: For smooth animations
- **Tailwind CSS**: For systematic spacing
- **TypeScript**: For type safety
- **shadcn/ui**: For base component library

### **Testing:**
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Performance and accessibility audits
- **Color Oracle**: Color-blind simulation
- **Device testing**: Real device validation

---

*Last updated: December 2024*
*Carefolio Design System v2.0 - Stark-Inspired Professional Polish*