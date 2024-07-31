/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // JSX 파일들을 스캔
    "./node_modules/@shadcn/ui/dist/*.{js,jsx,ts,tsx}", // shadcn-ui 컴포넌트 스캔
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
