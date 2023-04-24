import React from "react"
import Link from "next/link"
import {BsTwitter, BsFacebook, BsInstagram} from "react-icons/bs"
import {NextFont} from "next/dist/compiled/@next/font"

export default function Sidebar({inter}: {inter: NextFont}) {
    return (
        <ul className="sidebar-container">
            <li>
                <Link className="side-link Home" href="/">
                    Home
                </Link>
            </li>
            <hr />
            <li>
                <Link
                    style={{whiteSpace: "nowrap"}}
                    className="side-link"
                    href="/about"
                >
                    About us
                </Link>
            </li>
            <hr />
            <li>
                <Link className="side-link" href="/zestawy">
                    Zestawy
                </Link>
            </li>
            <hr />
            <li>
                <Link className="side-link" href="/zarcie">
                    Żarcie
                </Link>
            </li>
            <hr />
            <li>
                <Link className="side-link" href="/napoje">
                    Napoje
                </Link>
            </li>
            <hr />
            <li style={{textAlign: "center", alignSelf: "center"}}>
                <Link className="side-link" href="/random">
                    Wylosuj zestaw
                </Link>
            </li>
            <hr />
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
    )
}
