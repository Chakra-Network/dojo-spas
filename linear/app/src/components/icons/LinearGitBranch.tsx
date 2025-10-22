export function LinearGitBranch({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color}
      role="img"
      focusable="false"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ "--icon-color": color } as React.CSSProperties}
    >
      <path d="M9.5 3.25a2.25 2.25 0 0 1 4.315-.894c.164.378.22.795.164 1.203A2.25 2.25 0 0 1 12.5 5.371V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.25 2.25 0 1 1-1.5 0V5.37a2.25 2.25 0 1 1 1.5 0v1.836a2.492 2.492 0 0 1 1-.208h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.499.75.75 0 0 0 0-1.5Zm-7.5 9.499a.75.75 0 1 0 0 1.499.75.75 0 0 0 0-1.5Z"></path>
    </svg>
  );
}
