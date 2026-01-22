
import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    showText?: boolean;
    mainText: string;
    isSubmitting?: boolean;
}

function Button({ type, mainText, showText, isSubmitting }: ButtonProps) {
  return (<button disabled={isSubmitting} type={type} className="rounded-2xl bg-teal-500 px-12 py-6 text-2xl text-neutral-100 shadow-xl hover:bg-cyan-700 hover:text-neutral-200">
            {showText && isSubmitting ? "Loading..." : mainText}
        </button>);
}

export default Button;