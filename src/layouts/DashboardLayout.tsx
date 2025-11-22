import { AppSidebar } from "@/components/app-sidebar"
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout() {
    const { pathname } = useLocation();
    const paths = pathname.split("/").filter(Boolean);
    let fullPath = "";
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 shadow sticky top-0 bg-white z-999">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {paths.length === 0 ? (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                    </BreadcrumbItem>
                                ) : (
                                    <>
                                        {/* First breadcrumb - Dashboard */}
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link to="/">Dashboard</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>

                                        <BreadcrumbSeparator />

                                        {paths.map((item, index) => {
                                            fullPath += `/${item}`;
                                            const isLast = index === paths.length - 1;

                                            return (
                                                <div key={index} className="flex items-center gap-1.5">
                                                    <BreadcrumbItem>
                                                        {isLast ? (
                                                            <BreadcrumbPage className="capitalize">
                                                                {item.replaceAll("-", " ")}
                                                            </BreadcrumbPage>
                                                        ) : (
                                                            <BreadcrumbLink asChild>
                                                                <Link to={fullPath} className="capitalize">
                                                                    {item.replaceAll("-", " ")}
                                                                </Link>
                                                            </BreadcrumbLink>
                                                        )}
                                                    </BreadcrumbItem>

                                                    {!isLast && <BreadcrumbSeparator />}
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>

                    </div>
                </header>
                <div className="p-5 flex-1">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}