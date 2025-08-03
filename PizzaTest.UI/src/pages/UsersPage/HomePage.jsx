import React, { useEffect, useState } from "react";
import { productService } from "../../services/productsService";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { cartService } from "../../services/cartService";
import CartDrawer from "../../components/CartDrawer";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        setProducts(response.data);
      } catch (err) {
        setError(err.toString());
      }
    };

    const fetchCart = async () => {
      try {
        const response = await cartService.getCart();
        setCart(response.data.cartItems || []);
      } catch (err) {
        console.error("Sepet alınamadı:", err);
      }
    };

    fetchProducts();
    fetchCart();
  }, []);

  const sepeteEkle = async (productId) => {
    try {
      await cartService.addCart({ productId, quantity: 1 });
      const response = await cartService.getCart();
      setCart(response.data.cartItems || []);
      setSnackbarMessage("Ürün sepete eklendi!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Sepete eklenemedi:", err);
      setSnackbarMessage("Ürün sepete eklenemedi!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Box
          display={"flex"}
          justifyContent="space-between"
          mb={4}
          alignItems={"center"}
        >
          <Typography variant="h4" mb={3}>
            Ürünler
          </Typography>
          <Button onClick={() => setDrawerOpen(true)}>
            <Badge
              badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)}
              color="primary"
            >
              <ShoppingCartIcon sx={{ color: "black", fontSize: 35 }} />
            </Badge>
          </Button>
        </Box>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        {products.length === 0 ? (
          <Typography>Yükleniyor...</Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 3,
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  maxWidth: 345,
                  borderRadius: 3,
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {product.imageUrl && (
                  <CardMedia
                    component="img"
                    height="250"
                    sx={{ objectFit: "cover" }}
                    image={product.imageUrl}
                    alt={product.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{ mb: 1 }}
                  >
                    {product.description}
                  </Typography>

                  <Box display={"flex"} justifyContent="flex-end" mt={2}>
                    <Button
                      variant="contained"
                      onClick={() => sepeteEkle(product.id)}
                    >
                      Sepete Ekle
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
}
