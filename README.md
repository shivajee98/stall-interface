# Stall UI Project

## Overview

Stall UI is a Next.js application that provides an interactive exhibition hall experience for showcasing exhibitors. The application features a 3D-like stall room slider with navigation controls, exhibitor information, and integration with a backend API.

## Project Structure

```
src/
├── app/
│   ├── (root)/
│   │   ├── _shop/
│   │   │   ├── Ceiling.tsx
│   │   │   ├── Floor.tsx
│   │   │   ├── Wall.tsx
│   │   │   ├── HangingBoard.tsx
│   │   │   ├── Exhibitor.tsx
│   │   │   ├── exhibition-shop.tsx
│   │   │   └── shop.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── ReduxProvider.tsx
├── hooks/
│   └── useGetExhibitor.ts
├── lib/
│   └── api.ts
├── provider/
│   └── query-provider.tsx
├── types/
│   └── index.ts
└── middleware.ts
```

## Key Features

- **Interactive 3D-like Exhibition Hall**
    - Stall room slider with ceiling, floor, and wall components
    - Touch and keyboard navigation support
    - Auto-play functionality

- **Exhibitor Data Integration**
    - Fetches exhibitor data from a backend API
    - Displays exhibitor information including name, logo, banner, and products
    - Handles loading, error, and empty states

- **State Management**
    - Uses React Query for data fetching and caching
    - Redux integration for global state management

- **Responsive Design**
    - Adapts to different screen sizes
    - Mobile-friendly touch controls

- **Performance Optimizations**
    - Code splitting with dynamic imports
    - Query caching and stale data handling

## Technical Details

- **Framework:** Next.js 15.1.7
- **State Management:** React Query, Redux
- **Styling:** Tailwind CSS
- **API Integration:** Axios
- **Authentication:** Clerk

## Setup Instructions

1. **Install dependencies:**
     ```bash
     npm install
     # or
     yarn install
     # or
     pnpm install
     ```

2. **Create a `.env` file with the following variable:**
     ```env
     NEXT_PUBLIC_BACKEND_URL=<your-api-endpoint>
     ```

3. **Run the development server:**
     ```bash
     npm run dev
     # or
     yarn dev
     # or
     pnpm dev
     ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Use arrow keys to navigate between exhibitors
- Press spacebar to toggle auto-play
- Click "Visit Booth" to view detailed exhibitor information
- Swipe on mobile devices to navigate between exhibitors

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License.
