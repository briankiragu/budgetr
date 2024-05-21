/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['NYT Imperial', 'Georgia', 'ui-serif'],
        mono: ['Zed Mono', 'Jetbrains Mono', 'ui-mono'],
      },
    },
  },
  plugins: [],
};
