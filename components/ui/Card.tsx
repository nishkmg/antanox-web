import { HTMLAttributes, forwardRef } from "react";

type CardVariant = "default" | "elevated";
type CardInteractive = boolean;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: CardInteractive;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", interactive = false, className = "", children, ...props },
    ref
  ) => {
    const classes = [
      "card",
      variant !== "default" ? `card--${variant}` : "",
      interactive ? "card--interactive" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
