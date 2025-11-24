import { ChartAreaInteractive } from "@/components/ChartAreaInteractive"
import { HorizontalBarChart } from "@/components/HorizontalBarChart"
import { PieChartEx } from "@/components/PieChartEx"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { VerticalBarChart } from "@/components/VerticalBarChart"
import { SAMPLE_USERS } from "@/helpers/data"
import { ChevronLeft, ChevronRight, Coins, Mail, Search, User, Users } from "lucide-react"
import { useMemo, useState } from "react"

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState("5")
    const [currentPage, setCurrentPage] = useState(1)

    const filteredUsers = useMemo(() => {
        return SAMPLE_USERS.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [searchTerm])

    const rows = Number.parseInt(rowsPerPage)
    const totalPages = Math.ceil(filteredUsers.length / rows)
    const startIndex = (currentPage - 1) * rows
    const endIndex = startIndex + rows
    const currentUsers = filteredUsers.slice(startIndex, endIndex)

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }

    const handleRowsPerPageChange = (value: string) => {
        setRowsPerPage(value)
        setCurrentPage(1)
    }

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 mb-3 gap-4">
                <div className="flex p-2 shadow flex-col gap-1 rounded dark:bg-[#171717]">
                    <div className="flex gap-2 items-center p-1 rounded w-fit shadow dark:bg-white">
                        <Mail size={15} color="purple" />
                    </div>
                    <p className="text-sm font-semibold">Users Subscribe</p>
                    <p className="font-bold text-2xl">5,989</p>
                </div>

                <div className="flex p-2 shadow flex-col gap-1 rounded dark:bg-[#171717]">
                    <div className="flex gap-2 items-center p-1 rounded w-fit shadow dark:bg-white">
                        <Users size={15} color="red" />
                    </div>
                    <p className="text-sm font-semibold">Total Members</p>
                    <p className="font-bold text-2xl">9k</p>
                </div>

                <div className="flex p-2 shadow flex-col gap-1 rounded dark:bg-[#171717]">
                    <div className="flex gap-2 items-center p-1 rounded w-fit shadow dark:bg-white">
                        <User size={15} color="blue" />
                    </div>
                    <p className="text-sm font-semibold">New Members</p>
                    <p className="font-bold text-2xl">2091</p>
                </div>

                <div className="flex p-2 shadow flex-col gap-1 rounded dark:bg-[#171717]">
                    <div className="flex gap-2 items-center p-1 rounded w-fit shadow dark:bg-white">
                        <Coins size={15} color="orange" />
                    </div>
                    <p className="text-sm font-semibold">Total Revenue</p>
                    <p className="font-bold text-2xl">$10,24,999.75</p>
                </div>
            </div>

            <ChartAreaInteractive />

            <div className="grid mt-5 grid-cols-3 gap-4">
                <div>
                    <PieChartEx />
                </div>
                <div>
                    <HorizontalBarChart />
                </div>
                <div>
                    <VerticalBarChart />
                </div>

            </div>

            <Card className="w-full p-6 mt-5">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">Customers</h2>

                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search by name, email, or role..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Active"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No users found matching your search.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Rows per page:</span>
                        <Select value={rowsPerPage} onValueChange={handleRowsPerPageChange}>
                            <SelectTrigger className="w-16">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages || 1}
                        </span>
                        <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>

        </div>
    )
}

export default Dashboard
