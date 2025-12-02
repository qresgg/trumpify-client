export function ExtraButton({ hidden, className, onClick, ...props }) {
    return (
        <div  className={`${className} ${hidden ? "hidden" : ""}`} {...props}>
            <div onClick={onClick}></div>
        </div>
    );
}
