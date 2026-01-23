
import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    showText?: boolean;
    mainText: string;
    isSubmitting?: boolean;
    onClick?: () => void; 
}

function Button({ type, mainText, showText, isSubmitting, onClick }: ButtonProps) {
  return (<button disabled={isSubmitting} onClick={onClick} type={type} className="rounded-2xl bg-cyan-600 px-12 py-6 text-2xl text-neutral-100 shadow-xl hover:bg-cyan-700 hover:text-neutral-200">
            {showText && isSubmitting ? "Loading..." : mainText}
        </button>);
}

export default Button;