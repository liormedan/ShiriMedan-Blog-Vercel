import AdminSidebar from '@/src/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 16 }}>
        {children}
      </main>
    </div>
  );
}

