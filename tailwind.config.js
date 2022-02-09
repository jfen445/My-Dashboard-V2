module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary-blue": {
                    100: "#259FDE",
                    50: "#259BDD",
                    15: "#E4EDF8",
                    10: "#ECF2F9",
                },
            },
            backgroundImage: {
                mountain: "url('/images/mountain.jpg')",
            },
        },
    },
    plugins: [],
};