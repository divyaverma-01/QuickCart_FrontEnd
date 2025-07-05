export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-100 dark:bg-dark-2 ${className}`}
      {...props}
    />
  );
}
