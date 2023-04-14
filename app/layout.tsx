import "./globals.css"
import Link from "next/link"
import Image from "next/image"
import {Inter, Dancing_Script} from "next/font/google"
import {BsSearch, BsTwitter, BsFacebook, BsInstagram} from "react-icons/bs"
import logo from "../public/logo.svg"
import SearchBar from "@/components/SearchBar/SearchBar"

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

const dancingFont = Dancing_Script({
    weight: ["400", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
})

const inter = Inter({
    weight: ["400", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
})

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="logo">
                    <Link href="/">
                        <Image
                            className="logo-img"
                            src={logo}
                            alt="Logo TanieZarcie.pl"
                        />
                    </Link>
                </div>
                <nav className={dancingFont.className + " navbar"}>
                    <SearchBar inter={inter} searchIcon={<BsSearch />} />
                </nav>
                <nav
                    style={{
                        fontWeight: 700,
                        fontSize: "clamp(1rem, 1.4vw, 2rem)",
                    }}
                    className={dancingFont.className + " sidebar"}
                >
                    <ul className="sidebar-container">
                        <li>
                            <Link className="side-link Home" href="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                style={{whiteSpace: "nowrap"}}
                                className="side-link"
                                href="/about"
                            >
                                About us
                            </Link>
                        </li>

                        <li>
                            <Link className="side-link" href="/zestawy">
                                Zestawy
                            </Link>
                        </li>
                        <li>
                            <Link className="side-link" href="/food">
                                Food
                            </Link>
                        </li>
                        <li>
                            <Link className="side-link" href="/napoje">
                                Napoje
                            </Link>
                        </li>
                        <div className="socials">
                            <strong
                                className={inter.className}
                                style={{fontSize: 16, fontStyle: "italic"}}
                            >
                                Odwiedź nas:
                            </strong>
                            <div className="socials-icons">
                                <Link href="https://www.facebook.com/retovskej">
                                    <BsFacebook className="fb" role="button" />
                                </Link>
                                <Link href="https://www.facebook.com/retovskej">
                                    <BsInstagram className="ig" role="button" />
                                </Link>
                                <Link href="https://www.facebook.com/retovskej">
                                    <BsTwitter className="tw" role="button" />
                                </Link>
                            </div>
                        </div>
                    </ul>
                </nav>
                <main className="main">{children}</main>
                <footer>test footer fooooter footer</footer>
            </body>
        </html>
    )
}
