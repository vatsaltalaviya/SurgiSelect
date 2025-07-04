import { useEffect, useImperativeHandle, useRef, useState } from "react";

export default function SearchableDropdown({
  options = [],
  value,
  onChange,
  className,
  placeholder,
  inputRef: parentRef,
}) {
  const inputRef = useRef();
  const dropdownRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState(value?.name || "");
  const [showOptions, setShowOptions] = useState(false);

  // Allow parent to call .focusInput()
  useImperativeHandle(parentRef, () => ({
    focusInput: () => {
      if (inputRef.current) inputRef.current.focus();
    },
  }));

  // Sync internal search term when external value changes
  useEffect(() => {
    const label = typeof value === "string" ? value : value?.name || "";
    setSearchTerm(label);
  }, [value]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = Array.isArray(options)
    ? options.filter((option) => {
        const label = typeof option === "string" ? option : option?.name || "";
        return (
          typeof searchTerm === "string" &&
          label.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  const handleSelect = (option) => {
    const label = typeof option === "string" ? option : option?.name || "";
    setSearchTerm(label);
    setShowOptions(false);
    if (onChange) onChange(option);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <input
        type="text"
        ref={inputRef}
        value={searchTerm}
        placeholder={placeholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowOptions(true);
        }}
        onClick={() => setShowOptions(true)}
        className="w-full px-2 py-1 border rounded outline-none focus:ring-1 focus:ring-blue-400"
        autoComplete="off"
      />

      {showOptions && (
        <ul className="absolute w-full bg-white z-50 border max-h-40 overflow-y-auto shadow">
          {options.length === 0 ? (
            <li className="px-3 py-2 text-gray-400">Select a state first</li>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              >
                {typeof option === "string" ? option : option?.name || ""}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-400">No match found</li>
          )}
        </ul>
      )}
    </div>
  );
}
