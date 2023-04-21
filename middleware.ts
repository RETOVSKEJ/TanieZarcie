import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"
import {headers} from "next/headers"

export const config = {
    matcher: "/api/:function*", // regex, tylko dla sciezek zaczynajacych sie od /api
}

export function middleware(request: NextRequest) {
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
    const date = new Date()
    const logInfo = `${request.method}\t ${request.ip}\t ${
        request.url
    }\t ${date.toISOString()}`
    console.log(logInfo)
    return NextResponse.next({
        status: 200,
    })
}
