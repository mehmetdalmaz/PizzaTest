import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { userService } from "../../services/userService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError("Kullanıcılar alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 900,
        margin: "20px auto",
        width: "95%", // Mobilde sayfaya taşmadan sığması için
        overflowX: "auto", // Taşma olursa scroll yerine sığmaya çalışır
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Kullanıcı Listesi
      </Typography>
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Ad</TableCell>
            <TableCell>Soyad</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Kullanıcı bulunamadı.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName || user.name || "-"}</TableCell>
                <TableCell>{user.surname || "-"}</TableCell>
                <TableCell>{user.email || "-"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
