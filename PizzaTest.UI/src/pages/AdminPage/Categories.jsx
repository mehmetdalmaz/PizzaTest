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
} from "@mui/material";
import { categoryService } from "../../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
        // id'yi body'ye ekliyoruz
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

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
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
            <ListItem
              key={cat.id}
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(cat)}
                  >
                    Düzenle
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => confirmDelete(cat.id)}
                  >
                    Sil
                  </Button>
                </Stack>
              }
            >
              <ListItemText
                primary={<strong>{cat.name}</strong>}
                secondary={cat.description}
              />
            </ListItem>
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

      {/* Silme Onay Diyaloğu */}
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
