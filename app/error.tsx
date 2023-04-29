"use client"

export default function error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100dvh",
                gap: "2rem",
                overflow: "hidden",
                color: "var(--text-white)",
            }}
        >
            <h1>Wystąpił nieoczekiwany błąd</h1>
            <button onClick={reset}>Spróbuj jeszcze raz</button>
        </div>
    )
}
