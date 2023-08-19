export default function AppointmentsWrapper({
  children,
  purpose,
}: {
  children: React.ReactNode;
  purpose: string;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative mx-auto w-full max-w-3xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-semibold text-gray-900">{purpose}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
