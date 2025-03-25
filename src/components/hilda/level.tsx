export default function Level({ level }: { level: number }) {
    return (
        <div className="absolute h-[10%] w-[100%] bottom-0 z-60 flex justify-center items-center">
            <span className="bg-white flex flex-row items-center gap-10 h-0.5 z-40">

                <div className={`h-[2dvh] w-[2dvh] rounded-full bg-white ${level == 1 ? "point" : ""}`}></div>
                <div className={`h-[2dvh] w-[2dvh] rounded-full bg-white ${level == 2 ? "point" : ""}`}></div>
                <div className={`h-[2dvh] w-[2dvh] rounded-full bg-white ${level == 3 ? "point" : ""}`}></div>

            </span>
        </div>
    );
}