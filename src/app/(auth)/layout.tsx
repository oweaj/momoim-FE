export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10">
      <div className="w-full max-w-lg rounded-2xl border-2 border-gray-100 bg-white px-4 py-12 drop-shadow-base sm:px-12">
        {children}
      </div>
    </div>
  );
}
