import Image from "next/image";
import arrow from "../source/arow.png";

export default function Level({ level, callback }: { level: number | null; callback: () => void }) {
    return (
        <div className="absolute h-[10%] w-[100%] bottom-0 z-60 flex justify-center items-center">
            {level != 4 ? <span className="bg-white flex flex-row items-center gap-10 h-0.5 z-40">

                <div className={`h-[2dvh] w-[2dvh] rounded-full bg-white ${level == 1 ? "point" : ""}`}></div>
                <div className={`h-[2dvh] w-[2dvh] rounded-full bg-white ${level == 2 ? "point" : ""}`}></div>
                <div className={`h-[2dvh] w-[2dvh] rounded-full bg-white ${level == 3 ? "point" : ""}`}></div>

            </span>
                :
                <Image
                    src={arrow}
                    className="absolute z-90 arrow bottom-[60%] left-[50%] cursor-pointer"
                    alt="arrow to bottom"
                    priority
                    onClick={() => { callback() }}
                />}
        </div >
    );
}