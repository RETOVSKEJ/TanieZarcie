import {NextResponse, NextRequest} from "next/server"
import rateLimit from "@/utils/rate-limit"
import log from "@/utils/log"

export const config = {
    matcher: "/api/:path*", // regex, tylko dla sciezek zaczynajacych sie od /api
}

export const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

function noApiKey(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const KEY = searchParams.get("KEY")
    const k = searchParams.get("k")
    if (KEY != process.env.API_KEY && k != process.env.API_KEY) {
        return true
    }
}

export async function middleware(request: NextRequest) {
    log(request)
    if (noApiKey(request)) {
        return NextResponse.json("Forbidden", {status: 403})
    }

    const response = NextResponse.next({status: 200})
    return response
    // const remaining = request.headers.get("X-RateLimit-Remaining")
}

// // Clone the request headers and set a new header
// // that will be sent to the server `header-for-the-server`
// const requestHeaders = new Headers(request.headers)
// requestHeaders.set("header-for-the-server", "hello server")

// // You can also set request headers in NextResponse.rewrite
//     const response = NextResponse.next({
//         request: {
//             // New request headers
//             headers: req,
//         },
//     })
// }

// // Set a new response header that you can inspect in the browser
// // `header-for-the-client`
// response.headers.set("header-for-the-client", "hello client")
// return response

//req.nextURL
// {
//   href: 'http://localhost:3000/api/napoje/sprite-duzy',
//   origin: 'http://localhost:3000',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'localhost:3000',
//   hostname: 'localhost',
//   port: '3000',
//   pathname: '/api/napoje/sprite-duzy',
//   search: '',
//   searchParams: URLSearchParams {  },
//   hash: ''
// }
// same-origin         // req.credentials
// {}               // req.geo
// default          // req.cache
// http://localhost:3000/api/napoje/sprite-duzy  // req.url
