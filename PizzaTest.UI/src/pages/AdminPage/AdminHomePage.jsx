import { useEffect, useState } from "react";
import { Grid, Paper, Typography, CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import { orderService } from "../../services/orderService";
import { productService } from "../../services/productsService";
import { categoryService } from "../../services/categoryService";

export default function AdminHomePage() {
  const [data, setData] = useState({
    orders: 0,
    products: 0,
    categories: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes, categoriesRes] = await Promise.all([
          orderService.getOrders(),
          productService.getAllProducts(),
          categoryService.getAllCategories(),
        ]);

        setData({
          orders: ordersRes.data.length,
          products: productsRes.data.length,
          categories: categoriesRes.data.length,
        });
      } catch (err) {
        console.error("İstatistik verileri alınırken hata oluştu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Toplam Sipariş",
      value: data.orders,
      icon: <ShoppingCartIcon fontSize="large" color="primary" />,
    },
    {
      title: "Toplam Ürün",
      value: data.products,
      icon: <InventoryIcon fontSize="large" color="success" />,
    },
    {
      title: "Toplam Kategori",
      value: data.categories,
      icon: <CategoryIcon fontSize="large" color="warning" />,
    },
  ];

  if (loading) {
    return (
      <Grid container justifyContent="center" mt={5}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {stats.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            {item.icon}
            <Typography variant="h6" fontWeight={600}>
              {item.title}
            </Typography>
            <Typography variant="h4" color="primary">
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
