import Spinner from "@/components/Spinner/Spinner"

export default function loading() {
    return (
        <div style={{height: "100vh", overflow: "hidden"}}>
            <Spinner />
        </div>
    )
}
