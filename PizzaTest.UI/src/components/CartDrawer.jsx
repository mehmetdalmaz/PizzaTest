import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { cartService } from "../services/cartService";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router";

export default function CartDrawer({ open, onClose, cart, setCart }) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

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
      await cartService.removeCart(productId, 1);
      const response = await cartService.getCart();
      setCart(response.data.cartItems || []);
    } catch (err) {
      console.error("Ürün silinemedi:", err);
    }
  };

  const urunKaldir = async (productId, quantity) => {
    try {
      window.confirm(
        "Bu ürünü sepetinizden kaldırmak istediğinize emin misiniz?"
      ) && (await cartService.removeCart(productId, quantity));
      const response = await cartService.getCart();
      setCart(response.data.cartItems || []);
    } catch (err) {
      console.error("Ürün kaldırılamadı:", err);
    }
  };

  const toplamAdet = cart.reduce((acc, item) => acc + item.quantity, 0, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Sepetinizde ürün yok.");
      return;
    } else {
      navigate("/order");
      onClose();
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Sepeti temizlemek istediğinize emin misiniz?")) {
      try {
        await cartService.clearCart();
        setCart([]);
      } catch (err) {
        console.error("Sepet temizlenemedi:", err);
      }
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 420 },
        },
      }}
    >
      <Box
        sx={{
          p: 1,
        }}
      >
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

                  <IconButton onClick={() => urunSil(item.productID)}>
                    <RemoveCircleIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      console.log("Silinecek adet:", item.quantity);
                      urunKaldir(item.productID, item.quantity);
                    }}
                  >
                    <DeleteForeverIcon />
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
              <Stack>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {item.productName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    direction: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Adet:
                  </Typography>
                  <input
                    type="number"
                    min={1}
                    value={quantities[item.productID] ?? item.quantity}
                    onChange={(e) =>
                      setQuantities({
                        ...quantities,
                        [item.productID]: Math.max(
                          1,
                          parseInt(e.target.value) || 1
                        ),
                      })
                    }
                    onBlur={async () => {
                      const yeniAdet = quantities[item.productID];
                      if (yeniAdet && yeniAdet !== item.quantity) {
                        try {
                          await cartService.updateCart(
                            item.productID,
                            yeniAdet
                          );
                          const response = await cartService.getCart();
                          setCart(response.data.cartItems || []);
                        } catch (err) {
                          console.error("Adet güncellenemedi:", err);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    style={{
                      width: "50px",
                      height: "30px",
                      borderRadius: "5px",
                      padding: "0 10px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      fontSize: "1rem",
                    }}
                  />
                </Box>
              </Stack>
            </ListItem>
          ))}
        </List>

        <Typography fontWeight="bold" mt={2}>
          Toplam Ürün Adedi: {toplamAdet}
        </Typography>

        <Box mt={2} display="flex" gap={1}>
          <Stack direction={"row"} spacing={2} width="100%">
            {cart.length > 0 ? (
              <>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={handleClearCart}
                >
                  Sepeti Temizle
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Siparişi Ver
                </Button>
              </>
            ) : (
              <Typography>Sepetiniz Boş</Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}
