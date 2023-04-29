import Spinner from "@/components/Spinner/Spinner"

const loadingPhrases = [
    "Trwa losowanie pysznego zestawu...",
    "losuje pyszny zestaw...",
    "Burger czy Kanapka?",
    "Mmm...",
]

export default function loading() {
    const randInt = Math.floor(Math.random() * loadingPhrases.length)
    return (
        <div
            style={{
                height: "100dvh",
            }}
        >
            <Spinner>{loadingPhrases[randInt]}</Spinner>
        </div>
    )
}
