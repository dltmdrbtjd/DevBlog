export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <main className="prose max-w-2xl mx-auto mt-28 mb-14 px-4">{children}</main>
    </div>
  );
}
