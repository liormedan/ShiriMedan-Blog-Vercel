import Link from 'next/link';

const links = [
  { href: '/editor', label: 'עורך' },
  { href: '/admin/posts', label: 'פוסטים' },
  { href: '/admin/categories', label: 'קטגוריות' }
];

export default function AdminSidebar() {
  return (
    <aside style={{ width: 200, padding: 16, background: '#f5f5f5' }}>
      <nav>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

