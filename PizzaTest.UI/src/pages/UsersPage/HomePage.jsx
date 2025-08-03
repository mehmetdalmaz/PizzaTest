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
  Typography,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { cartService } from "../../services/cartService";
import CartDrawer from "../../components/CartDrawer";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [quantities, setQuantities] = useState({});
  const [visibleQuantityInputs, setVisibleQuantityInputs] = useState({});

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

      setSnackbarMessage("1 adet ürün sepete eklendi!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setVisibleQuantityInputs((prev) => ({
        ...prev,
        [productId]: true,
      }));
      setQuantities((prev) => ({
        ...prev,
        [productId]: 1,
      }));
    } catch (err) {
      console.error("Sepete eklenemedi:", err);
      setSnackbarMessage("Ürün sepete eklenemedi!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const urunuOnayla = async (productId) => {
    const quantity = quantities[productId] || 1;

    try {
      await cartService.addCart({ productId, quantity });
      const response = await cartService.getCart();
      setCart(response.data.cartItems || []);
      setSnackbarMessage("Ürün sepete eklendi!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setVisibleQuantityInputs((prev) => ({
        ...prev,
        [productId]: false,
      }));
    } catch (err) {
      console.error("Sepete eklenemedi:", err);
      setSnackbarMessage("Ürün sepete eklenemedi!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
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

        <Box sx={{ mb: 4 }}>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="h4" mb={3}>
              Ürünler
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleLogout}
              >
                Çıkış Yap
              </Button>
              <Button onClick={() => setDrawerOpen(true)}>
                <Badge
                  badgeContent={cart.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )}
                  color="primary"
                >
                  <ShoppingCartIcon sx={{ color: "black", fontSize: 35 }} />
                </Badge>
              </Button>
            </Stack>
          </Stack>
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
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                    px: 2,
                    pb: 2,
                  }}
                >
                  {visibleQuantityInputs[product.id] ? (
                    <>
                      <input
                        type="number"
                        min={1}
                        value={quantities[product.id] || 1}
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            [product.id]: Math.max(
                              1,
                              parseInt(e.target.value) || 1
                            ),
                          })
                        }
                        style={{
                          width: "60px",
                          height: "34px",
                          borderRadius: "5px",
                          padding: "0 10px",
                          border: "1px solid #ccc",
                          textAlign: "center",
                          fontSize: "1rem",
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => urunuOnayla(product.id)}
                        size="small"
                      >
                        Sepete Ekle
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => sepeteEkle(product.id)}
                      size="small"
                    >
                      Sepete Ekle
                    </Button>
                  )}
                </Box>
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
