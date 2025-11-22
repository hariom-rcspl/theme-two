import { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { getUserList } from "../redux/userApi"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Eye, Pencil, Search, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const UserListPage = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState("10")
    const [currentPage, setCurrentPage] = useState(1)

    const { userList, totalUsers, userLoading } = useSelector((state: any) => state.user, shallowEqual)

    const fetchUsers = () => {
        const skip = (currentPage - 1) * Number(rowsPerPage)
        dispatch(getUserList({ limit: Number(rowsPerPage), skip }) as any)
    }

    useEffect(() => {
        fetchUsers()
    }, [currentPage, rowsPerPage])

    const totalPages = Math.ceil(totalUsers / Number(rowsPerPage))

    return (
        <Card className="w-full p-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Users</h1>

                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                    />
                </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sr. No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userLoading ? (
                            [...Array(Number(rowsPerPage))].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-44" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                                </TableRow>
                            ))
                        ) : userList.length > 0 ? (
                            userList
                                .filter((user: any) =>
                                    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((user: any, index: number) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{(currentPage - 1) * Number(rowsPerPage) + index + 1}</TableCell>
                                        <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.gender}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Button size="sm" variant="outline"><Eye /></Button>
                                                <Button size="sm" variant="default"><Pencil /></Button>
                                                <Button size="sm" variant="destructive"><Trash /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No users found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rows per page:</span>
                    <Select value={rowsPerPage} onValueChange={(value) => setRowsPerPage(value)}>
                        <SelectTrigger className="w-16">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * Number(rowsPerPage) + 1} to{" "}
                    {Math.min(currentPage * Number(rowsPerPage), totalUsers)} of {totalUsers} users
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default UserListPage
