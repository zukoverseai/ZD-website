# Zoftware Development Website

A cyberpunk-inspired, neon-themed portfolio and contact site for Zoftware Development, built with Next.js 13 (App Router), React, and Tailwind CSS.

## Features

- Vibrant cyberpunk/neon aesthetic with blue and green accents
- Interactive hero section with particle and 3D hover effects
- Typing text animation in the main headline
- Fade-in and staggered entrance animations via Framer Motion
- Customizable calendar and time picker for scheduling consultations
- Responsive layout, optimized for mobile to desktop
- Social links section (Facebook, X, GitHub, LinkedIn, Instagram) in the footer
- Light and dark mode support using CSS variables and Tailwind

## Tech Stack

- Next.js 13 (App Router)
- React (with Client and Server components)
- Tailwind CSS for utility-first styling
- Framer Motion for animations
- react-day-picker for native date selection
- Google Fonts via Next.js `next/font` (Inter & Audiowide)
- Lucide icons
- Custom React components for UI elements

## Prerequisites

- Node.js >= 16.8
- npm, yarn, or pnpm

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/zd-website.git
   cd zd-website
   ```

2. Install dependencies (using npm):

   ```bash
   npm install
   # or yarn install
   # or pnpm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or yarn dev
   # or pnpm dev
   ```

4. Open http://localhost:3000 in your browser.

## Available Scripts

- `dev`: Runs the Next.js development server
- `build`: Builds the production app
- `start`: Starts the production server
- `lint`: Runs ESLint (if configured)

## Project Structure

```
├── app/                   # Next.js App Router pages & layouts
│   ├── fonts.ts           # Central font exports (Inter & Audiowide)
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Main layout (Server component) with metadata
│   └── page.tsx           # Home page (Client component)
├── components/            # Shared React UI components
│   ├── ui/                # Design-system components (Button, Calendar, etc.)
│   ├── cyber-calendar.tsx # Custom stateful calendar/time picker
│   └── ...
├── public/                # Static assets (images, svg icons)
└── tailwind.config.ts     # Tailwind CSS configuration
```

## Fonts

- `app/fonts.ts` exports two fonts:

  - `inter`: Base sans-serif for body and readable text
  - `audiowide`: Futuristic headline font for primary headers

- In `layout.tsx`, only `inter` is applied globally (server component).
- In pages or components, import and apply `audiowide` where needed (e.g., `<h1>` / `<h2>`).

## Customization

### Calendar & Time Picker

- Located in `components/ui/cyber-calendar.tsx`
- Date grid built in React, time slots are generated hourly by default.
- Adjust `generateTimeSlots` logic for different intervals or booking buffers.

### Social Links

- Footer social icons in `app/page.tsx` (within `<footer>`).
- Each link commented and labeled: Facebook, X, GitHub, LinkedIn, Instagram.
- To reorder or update icons, search for `{/* Facebook */}` and modify accordingly.
- All links open in a new tab (`target="_blank"`, `rel="noopener noreferrer"`).

### Theme & Colors

- Extend Tailwind theme under `theme.extend.colors.cyber` in `tailwind.config.ts`.
- Dark mode toggles CSS variables under `.dark` class in `globals.css`.

## Deployment

1. Build the app:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```
3. Optionally, deploy to Vercel or Netlify by connecting the Git repo.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/name`
3. Commit your changes: `git commit -m "feat: description"`
4. Push to the branch: `git push origin feature/name`
5. Open a pull request

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

> Built with ❤️ by Zoftware Development. Anything is possible with Zoftware.
