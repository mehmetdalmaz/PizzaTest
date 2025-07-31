import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { categoryService } from "../../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Yeni state: hangi kategorilerin ürün detaylarının açık olduğunu tutar
  const [openCategoryIds, setOpenCategoryIds] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      setError("Kategoriler alınırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Kategori adı zorunlu");
      return;
    }

    try {
      if (editingId !== null) {
        await categoryService.updateCategory(editingId, {
          id: editingId,
          ...form,
        });
        alert("Kategori güncellendi.");
      } else {
        await categoryService.addCategory(form);
        alert("Kategori eklendi.");
      }
      setForm({ name: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("İşlem başarısız oldu.");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await categoryService.deleteCategory(deleteId);
      alert("Kategori silindi.");
      fetchCategories();
    } catch {
      alert("Silme işlemi başarısız.");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (category) => {
    setForm({ name: category.name, description: category.description });
    setEditingId(category.id);
  };

  const handleCancel = () => {
    setForm({ name: "", description: "" });
    setEditingId(null);
  };

  // Kategori satırına tıklayınca ürün detaylarını aç/kapa
  const toggleCategoryOpen = (categoryId) => {
    setOpenCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Kategoriler
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Paper sx={{ mb: 3 }}>
        <List>
          {categories.map((cat) => (
            <React.Fragment key={cat.id}>
              <ListItem
                button
                onClick={() => toggleCategoryOpen(cat.id)}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(cat);
                      }}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(cat.id);
                      }}
                    >
                      Sil
                    </Button>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategoryOpen(cat.id);
                      }}
                      size="small"
                    >
                      {openCategoryIds.includes(cat.id) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={<strong>{cat.name}</strong>}
                  secondary={cat.description}
                />
              </ListItem>

              {/* Ürün Detaylarını açılır olarak göster */}
              <Collapse
                in={openCategoryIds.includes(cat.id)}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ pl: 4, pb: 2 }}>
                  {cat.products && cat.products.length > 0 ? (
                    <Table size="small" aria-label="products table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Ürün Adı</TableCell>
                          <TableCell>Fiyat (₺)</TableCell>
                          <TableCell>Stok Adedi</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cat.products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stockQuantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Bu kategoriye ait ürün bulunmamaktadır.
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Typography variant="h5" gutterBottom>
        {editingId !== null ? "Kategori Güncelle" : "Yeni Kategori Ekle"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <TextField
            label="İsim"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Açıklama"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              {editingId !== null ? "Güncelle" : "Ekle"}
            </Button>
            {editingId !== null && (
              <Button variant="outlined" onClick={handleCancel}>
                İptal
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Silme Onayı</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu kategoriyi silmek istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>İptal</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
