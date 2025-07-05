export function ShowcaseSection({ title, children }) {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark-3 dark:text-white sm:px-6 xl:px-7.5">
        {title}
      </h2>

      <div className="p-4 sm:p-6 xl:p-10">{children}</div>
    </div>
  );
}
