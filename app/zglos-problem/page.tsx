import React from "react";
import s from "./zglosProblem.module.css";
import { Dancing_Script } from "next/font/google";

const dancingFont = Dancing_Script({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function ZnalazlesBlad() {
  return (
    <div className={s.bladWrapper}>
      <h2
        className={`${s.bladHeader} ${dancingFont.className}`}
        style={{ fontSize: 32 }}
      >
        Znalazles bład na stronie?
      </h2>
      <form className={s.form}>
        <label
          style={{
            display: "block",
            marginTop: "0.6rem",
            marginBottom: "0.25rem",
          }}
          htmlFor="problem"
        >
          Podziel się nim z nami!
        </label>
        <input
          className={s.input}
          type="email"
          placeholder="Twoj e-mail (opcjonalnie)"
        />
        <textarea
          name="problem"
          id="problem"
          className={s.textarea}
          placeholder="Opisz problem..."
        ></textarea>
        <button disabled className={s.submit} type="submit">
          Wyslij
        </button>
      </form>
    </div>
  );
}
