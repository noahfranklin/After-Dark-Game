import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, Database, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,234" icon={<Users className="w-4 h-4 text-primary" />} trend="+12% this week" />
        <StatCard title="Active Rooms" value="42" icon={<Activity className="w-4 h-4 text-emerald-500" />} trend="Current live sessions" />
        <StatCard title="Pending Reports" value="7" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />} trend="Requires review" />
        <StatCard title="Questions in Bank" value="850" icon={<Database className="w-4 h-4 text-indigo-500" />} trend="Across all tiers" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        <Card className="glass border-white/5">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No new reports in the last 24 hours.</p>
          </CardContent>
        </Card>
        
        <Card className="glass border-white/5">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Database</span>
              <span className="text-sm text-emerald-500 font-medium">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Matchmaking Queue</span>
              <span className="text-sm text-emerald-500 font-medium">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Realtime (Ably)</span>
              <span className="text-sm text-emerald-500 font-medium">Operational</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <Card className="glass border-white/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{trend}</p>
      </CardContent>
    </Card>
  );
}
