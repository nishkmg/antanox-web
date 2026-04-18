import { HTMLAttributes, forwardRef } from "react";

type BadgeVariant =
  | "default"
  | "cobalt"
  | "nominal"
  | "low"
  | "medium"
  | "high"
  | "critical";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  showDot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "default", showDot = false, className = "", children, ...props },
    ref
  ) => {
    const classes = [
      "badge",
      showDot ? "badge--dot" : "",
      variant !== "default" ? `badge--${variant}` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
