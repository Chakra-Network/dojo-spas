export function SectionTitle({ title }: { title: string }) {
  return (
    <span className="text-xl leading-[30px] font-normal bg-gray-100 border border-gray-100 h-[34px] flex items-center text-gray-900 px-3 rounded-lg">
      {title}
    </span>
  );
}

export function SectionLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-4">
      <SectionTitle title={title} />
      <div className="px-[30px] pt-2">{children}</div>
    </div>
  );
}
