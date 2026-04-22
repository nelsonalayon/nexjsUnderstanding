import SideNav from "@/app/ui/dashboard/sidenav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>

            <div className="flex-1 p-4">
                {children}
            </div>
        </div>
    );
}   