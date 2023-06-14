import Link from "next/link";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Dancing_Script } from "next/font/google";
import s from "@/app/about/about.module.css";

const dancingFont = Dancing_Script({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function Socials() {
  return (
    <div className={s.socialsWrapper}>
      <h2 className={`${dancingFont.className} ${s.socialsHeader}`}>
        Nasze Media Społecznościowe:
      </h2>

      <div className={s.socials}>
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.facebook.com/retovskej"
        >
          Facebook: <BsFacebook className="fb" role="button" />
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.instagram.com/retolicious"
        >
          Instagram: <BsInstagram className="ig" role="button" />
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.twitter.com/retovskej"
        >
          Twitter: <BsTwitter className="tw" role="button" />
        </Link>
      </div>
      <label className={s.label}>Odwiedź nas!</label>
    </div>
  );
}
