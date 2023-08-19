interface AuthFormProps {
  children: React.ReactNode;
  purpose: string;
}

export default function AuthForm({ children, purpose }: AuthFormProps) {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">{purpose}</h1>
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
