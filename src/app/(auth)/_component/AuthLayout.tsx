interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10">
      <div className="w-full max-w-lg rounded-2xl border-2 border-gray-100 bg-white px-4 py-12 drop-shadow-[0px_0px_10px_rgba(0,0,0,0.1)] sm:px-12">
        {children}
      </div>
    </div>
  );
}
