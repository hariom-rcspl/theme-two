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
import { BellDotIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
    const { pathname } = useLocation();
    const paths = pathname.split("/").filter(Boolean);
    let fullPath = "";
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex items-center justify-between h-16 shrink-0 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 shadow sticky top-0 bg-white z-999 px-4">
                    <div className="flex items-center gap-2">
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
                    <div>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" aria-label="Open menu" size="icon-sm">
                                    <BellDotIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-72 z-9999" align="end">
                                <DropdownMenuLabel>Notification 1</DropdownMenuLabel>
                                <DropdownMenuLabel>Notification 2</DropdownMenuLabel>
                                <DropdownMenuLabel>Notification 3</DropdownMenuLabel>
                                <DropdownMenuLabel>Notification 4</DropdownMenuLabel>
                                <DropdownMenuLabel>Notification 5</DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <div className="p-5 flex-1">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}