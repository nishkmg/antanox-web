import { InputHTMLAttributes, forwardRef } from "react";

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className = "", id, ...props }, ref) => {
    const toggleId = id || `toggle-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <label htmlFor={toggleId} className={`toggle ${className}`}>
        <input ref={ref} id={toggleId} type="checkbox" {...props} />
        <span className="toggle__track">
          <span className="toggle__thumb" />
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
