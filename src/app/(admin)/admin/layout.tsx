// src/app/admin/layout.tsx

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        {children}
      </div>
    );
  }
  