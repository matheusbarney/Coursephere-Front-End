


interface ButtonProps {
    type?: "button" | "submit" | "reset";
    showText?: boolean;
    icon?: React.ReactNode;
    mainText: string;
    isSubmitting?: boolean;
    onClick?: () => void; 
}

function Button({ type, icon, mainText, showText, isSubmitting, onClick }: ButtonProps) {
  return (<button disabled={isSubmitting} onClick={onClick} type={type} className="rounded-2xl bg-cyan-600 px-12 py-6 text-2xl text-neutral-100 shadow-xl hover:bg-cyan-700 hover:text-neutral-200">
            {showText && isSubmitting ? "Loading..." : <div className="flex">{icon}{mainText}</div>}
        </button>);
}

export default Button;