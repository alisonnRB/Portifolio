export default function HildaText({ title, text }: { title: String; text: String }) {
    return (
        <div className="absolute z-50 h-[75dvh] w-[45dvw] font-luck left-[5%] top-[10%] text-white hilda-title-content portrait:left-[2%] portrait:top-[20%] portrait:w-[65dvw]">
            <h1 className="hilda-title">{title}</h1>
            <p className="opacity-75">{text}</p>
        </div>
    );
}