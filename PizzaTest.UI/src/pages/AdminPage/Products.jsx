import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { productService } from "../../services/productsService";

function ProductRow({ product, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{product.id}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.price.toFixed(2)} ₺</TableCell>
        <TableCell align="right">
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="outlined"
              size="small"
              onClick={() => onEdit(product)}
            >
              Düzenle
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => onDelete(product.id)}
            >
              Sil
            </Button>
          </Stack>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle2">Açıklama:</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description || "-"}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError("Ürünler alınırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Ürün adı zorunlu");
      return;
    }

    if (!form.price || isNaN(form.price) || Number(form.price) < 0) {
      alert("Geçerli bir fiyat giriniz");
      return;
    }

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
      };

      if (editingId !== null) {
        await productService.updateProduct(editingId, {
          id: editingId,
          ...payload,
        });
        alert("Ürün güncellendi.");
      } else {
        await productService.addProduct(payload);
        alert("Ürün eklendi.");
      }
      setForm({ name: "", description: "", price: "" });
      setEditingId(null);
      fetchProducts();
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
      await productService.deleteProduct(deleteId);
      alert("Ürün silindi.");
      fetchProducts();
    } catch {
      alert("Silme işlemi başarısız.");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ? product.price.toString() : "",
    });
    setEditingId(product.id);
  };

  const handleCancel = () => {
    setForm({ name: "", description: "", price: "" });
    setEditingId(null);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Ürünler
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

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Ürün bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={confirmDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        {editingId !== null ? "Ürün Güncelle" : "Yeni Ürün Ekle"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <TextField
            label="Ürün Adı"
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
          <TextField
            label="Fiyat (₺)"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            inputProps={{ step: "0.01", min: "0" }}
            required
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
            Bu ürünü silmek istediğinize emin misiniz?
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
