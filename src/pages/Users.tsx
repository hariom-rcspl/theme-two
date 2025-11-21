"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Card } from "@/components/ui/card"

// Sample user data
const SAMPLE_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active" },
  { id: 6, name: "Diana Lee", email: "diana@example.com", role: "Admin", status: "Active" },
  { id: 7, name: "Eve Martinez", email: "eve@example.com", role: "User", status: "Inactive" },
  { id: 8, name: "Frank Taylor", email: "frank@example.com", role: "Editor", status: "Active" },
  { id: 9, name: "Grace Chen", email: "grace@example.com", role: "User", status: "Active" },
  { id: 10, name: "Henry White", email: "henry@example.com", role: "User", status: "Active" },
  { id: 11, name: "Iris Green", email: "iris@example.com", role: "Editor", status: "Active" },
  { id: 12, name: "Jack Moore", email: "jack@example.com", role: "User", status: "Inactive" },
  { id: 13, name: "Karen Davis", email: "karen@example.com", role: "Admin", status: "Active" },
  { id: 14, name: "Leo Harris", email: "leo@example.com", role: "User", status: "Active" },
  { id: 15, name: "Mia Clark", email: "mia@example.com", role: "Editor", status: "Active" },
]

export default function UsersPage() {
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
    <Card className="w-full p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Users</h1>

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
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
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
  )
}
