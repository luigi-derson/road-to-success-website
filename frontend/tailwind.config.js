module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  variants: {
    opacity: ['group-hover'],
    translate: ['group-hover'],
    scale: ['group-hover'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans:
          '-apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        display: 'Oswald',
        body: 'Work Sans',
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        primary: '#FF0009',
        whiter: '#f5f5f5',
        'gray-1': '#dbdbdb',
        'gray-2': '#b5b5b5',
        'gray-3': '#4a4a4a',
        'gray-4': '#363636',
      },
      spacing: {
        '28': '7rem',
        'blog-card': '21rem',
        '72': '18rem',
      },
      padding: {
        full: '100%',
      },
      height: {
        section: '600px',
        'mobile-menu': 'calc(100vh - 60px)',
      },
      width: {
        instagram: 'calc(25% - 16px)',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
        '9xl': '7.5rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        primary: '0 0 20px rgba(255, 0, 9, 0.3);',
      },
      opacity: {
        '85': '0.85',
      },
    },
  },
}
