import Link from "next/link";
import { LayoutDashboard, Users, MessageSquareWarning, Settings, Database } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 glass flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <span className="font-bold tracking-tight text-gradient">Admin Panel</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <NavLink href="/admin" icon={<LayoutDashboard />} label="Dashboard" />
          <NavLink href="/admin/users" icon={<Users />} label="Users" />
          <NavLink href="/admin/content" icon={<Database />} label="Content Bank" />
          <NavLink href="/admin/reports" icon={<MessageSquareWarning />} label="Reports" />
          <NavLink href="/admin/settings" icon={<Settings />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-white/5 glass flex items-center px-6">
          <div className="ml-auto flex gap-4">
            <span className="text-sm text-muted-foreground flex items-center">Logged in as Super Admin</span>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
      <span className="w-4 h-4">{icon}</span>
      {label}
    </Link>
  );
}
