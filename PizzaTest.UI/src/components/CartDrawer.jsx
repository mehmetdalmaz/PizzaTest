import React from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { cartService } from "../services/cartService";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router";

export default function CartDrawer({ open, onClose, cart, setCart }) {
  const navigate = useNavigate();

  const adetArttir = async (productId) => {
    try {
      await cartService.addCart({ productId, quantity: 1 });
      const response = await cartService.getCart();
      setCart(response.data.cartItems || []);
    } catch (err) {
      console.error("Sepete eklenemedi:", err);
    }
  };

  const urunSil = async (productId) => {
    try {
      await cartService.removeCart(productId);
      const response = await cartService.getCart();
      setCart(response.data.cartItems || []);
    } catch (err) {
      console.error("Ürün silinemedi:", err);
    }
  };

  const toplamFiyat = cart.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Sepetinizde ürün yok.");
      return;
    } else {
      navigate("/order");
      onClose();
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Sepet</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {cart.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <>
                  <IconButton
                    size="small"
                    onClick={() => adetArttir(item.productID)}
                    sx={{ ml: 1, mr: 2 }}
                  >
                    <AddIcon />
                  </IconButton>

                  <IconButton
                    edge="end"
                    onClick={() => urunSil(item.productID)}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </>
              }
              alignItems="center"
            >
              {/* Ürün resmi */}
              <img
                src={item.productImageUrl}
                alt={item.productName}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  marginRight: 16,
                  borderRadius: 4,
                }}
              />

              <ListItemText
                primary={item.productName}
                secondary={`₺${item.productPrice.toFixed(2)} x ${
                  item.quantity
                }`}
              />
            </ListItem>
          ))}
        </List>

        <Typography fontWeight="bold" mt={2}>
          Toplam: ₺{toplamFiyat.toFixed(2)}
        </Typography>

        <Box mt={2} display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckout}
          >
            Siparişi Ver
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
