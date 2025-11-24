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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

export default function DashboardLayout() {
    const { pathname } = useLocation();
    const paths = pathname.split("/").filter(Boolean);
    let fullPath = "";
    const notifications = [
        { msg: "New user registered", time: "2 min ago" },
        { msg: "Server restarted successfully", time: "10 min ago" },
        { msg: "Password changed", time: "1 hour ago" },
        { msg: "New order received", time: "3 hours ago" },
        { msg: "System maintenance scheduled", time: "Yesterday" },
    ];
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex items-center justify-between h-16 shrink-0 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 shadow sticky top-0 dark:bg-black bg-white z-999 px-4">
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
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" aria-label="Open menu" size="icon-sm">
                                    <BellDotIcon className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-80 max-h-80 overflow-y-auto p-0 z-9999"
                                align="end"
                            >
                                {/* Header */}
                                <div className="px-4 py-2 border-b">
                                    <h2 className="font-semibold text-sm">Notifications</h2>
                                </div>

                                {/* Notification items */}
                                {notifications.map((item, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        className="flex flex-col items-start gap-0.5 px-4 py-3 cursor-pointer hover:bg-accent"
                                    >
                                        <span className="text-sm font-medium">{item.msg}</span>
                                        <span className="text-xs text-muted-foreground">{item.time}</span>
                                    </DropdownMenuItem>
                                ))}

                                <DropdownMenuSeparator />

                                {/* Footer */}
                                <DropdownMenuItem
                                    className="text-center justify-center text-sm font-medium cursor-pointer hover:bg-accent py-2"
                                >
                                    View All Notifications
                                </DropdownMenuItem>
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