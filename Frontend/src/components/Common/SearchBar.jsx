import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Enter scheme name to search..", className = "" }) => {
  const [value, setValue] = useState("");

  return (
    <div className={`px-5 py-4 ${className}`}>
      <div className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-2">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-xl outline-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar;
