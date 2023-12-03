/**
 * Prologue Comments
 *
 * Name of code artifact: Tailwind CSS Configuration
 * Brief description: This code configures Tailwind CSS for a React application using custom fonts and colors.
 * Programmer's name: Thomas Nguyen
 * Date the code was created: 12/01/2023
 * Brief description of each revision & author:
 *     - Initial implementation. (Thomas Nguyen @ 12/01/23)
 * Pre-conditions:
 *     - `tailwindcss`, `@tailwindcss/forms`, `@tailwindcss/typography`, and `@tailwindcss/aspect-ratio` modules must be installed.
 * Post-conditions:
 *     - Configures Tailwind CSS with custom fonts and colors.
 * Error and exception condition values:
 *     - None. Errors would be raised by Tailwind CSS if configuration is incorrect.
 * Side effects:
 *     - Affects the styling of the React application.
 * Invariants: None
 * Any known faults: None
 */

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
