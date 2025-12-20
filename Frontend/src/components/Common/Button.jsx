import React from "react";
import { ArrowRight } from "lucide-react";

const Button = () => {
  return (
    <div>
      <button className="py-3 px-5 bg-amber-700 text-white rounded-2xl font-bold flex items-center gap-2">
        Find Suitable Schemes <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Button;
