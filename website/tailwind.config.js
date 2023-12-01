/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                // using Plus Jarkarta Sans font
                jarkarta: ["Plus Jakarta Sans", "sans-serif"],
                // Using Inter font
                inter: ["Inter", "sans-serif"],
            },
            colors: {
                "custom-blue": "#24609B",
                "custom-green": "#BEFF9F",
                "custom-black": "#141618",
                "custom-black-shade": "#262a2d",
                "custom-gray": "#8A8A8A",
            },
            bgGradientDeg: {
                75: "75deg",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/container-queries"),
        require("tailwindcss-gradient"),
    ],
};
