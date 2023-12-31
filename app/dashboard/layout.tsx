import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-48">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:pr-12 md:pb-12 md:pl-12 md:pt-0">
        {children}
      </div>
    </div>
  );
}
