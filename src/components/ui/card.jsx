import React from "react";
import classNames from "classnames";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={classNames(
        "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={classNames("px-4 py-2 border-b border-gray-200 dark:border-gray-700", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={classNames("px-4 py-2", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={classNames("px-4 py-2 border-t border-gray-200 dark:border-gray-700", className)}
      {...props}
    >
      {children}
    </div>
  );
}
