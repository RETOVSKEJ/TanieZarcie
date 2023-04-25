/** @type {import('next').NextConfig} */

const dns = require("dns")
dns.setDefaultResultOrder("ipv4first")

const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "origin-when-cross-origin",
    },
]

const nextConfig = {
    experimental: {
        appDir: true,
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: "/:path*",
                headers: securityHeaders,
            },
        ]
    },
}

module.exports = nextConfig
