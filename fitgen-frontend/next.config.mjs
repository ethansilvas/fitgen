/** @type {import('next').NextConfig} */
const nextConfig = {
    // https://stackoverflow.com/questions/71847778/why-my-nextjs-component-is-rendering-twice
    // disable this to stop rendering components twice, which apparently will only happen in development
    reactStrictMode: false
};

export default nextConfig;
