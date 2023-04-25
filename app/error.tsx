"use client"

export default function error() {
    return (
        <div
            style={{
                height: "100dvh",
                overflow: "hidden",
                color: "var(--text-white)",
            }}
        >
            <h1>Wystąpił nieoczekiwany błąd, spróbuj odświeżyć stronę</h1>
        </div>
    )
}
