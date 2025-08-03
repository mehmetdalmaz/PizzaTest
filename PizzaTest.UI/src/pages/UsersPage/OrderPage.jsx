import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { addressService } from "../../services/addressService";
import { orderService } from "../../services/orderService";
import { useNavigate } from "react-router";

export default function OrderPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [newAddressExpanded, setNewAddressExpanded] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const res = await addressService.getAddressByUserId();
        setAddresses(res.data || []);
        if (res.data.length > 0)
          setSelectedAddressId(res.data[0].id.toString());
      } catch (err) {
        console.error("Adresler alınamadı", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressChange = (e) => {
    setSelectedAddressId(e.target.value);
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = async () => {
    if (
      !newAddress.addressLine1 ||
      !newAddress.addressLine2 ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.postalCode ||
      !newAddress.country
    ) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    try {
      const addressToSend = { ...newAddress };

      const res = await addressService.addAddress(addressToSend);
      setAddresses((prev) => [...prev, res.data]);
      setSelectedAddressId(res.data.id.toString());
      setNewAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
      setNewAddressExpanded(false);
    } catch (err) {
      console.error("Adres eklenemedi", err.response || err.message || err);
      alert("Adres ekleme başarısız");
    }
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddressId) {
      alert("Lütfen bir adres seçin");
      return;
    }

    try {
      await orderService.addOrder({
        addressID: parseInt(selectedAddressId),
        orderNote: orderNote,
      });

      alert("Sipariş başarıyla oluşturuldu!");
      navigate("/home");
      setOrderNote("");
    } catch (error) {
      console.error("Sipariş oluşturulamadı", error);
      alert("Sipariş oluşturulamadı.");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box maxWidth={600} mx="auto" mt={4} p={2}>
      <Typography variant="h5" gutterBottom>
        Adres Seçimi
      </Typography>

      {addresses.length > 0 ? (
        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={selectedAddressId} onChange={handleAddressChange}>
            {addresses.map((addr) => (
              <Accordion key={addr.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <FormControlLabel
                    value={addr.id.toString()}
                    control={<Radio />}
                    label={`${addr.city} / ${addr.state}`}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{addr.addressLine1}</Typography>
                  <Typography>{addr.addressLine2}</Typography>
                  <Typography>Posta Kodu: {addr.postalCode}</Typography>
                  <Typography>Ülke: {addr.country}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </RadioGroup>
        </FormControl>
      ) : (
        <Typography>Henüz kayıtlı adresiniz yok.</Typography>
      )}

      <Box mt={4}>
        <Accordion
          expanded={newAddressExpanded}
          onChange={() => setNewAddressExpanded(!newAddressExpanded)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Yeni Adres Ekle</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              margin="normal"
              label="Adres Satırı 1"
              name="addressLine1"
              value={newAddress.addressLine1}
              onChange={handleNewAddressChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Adres Satırı 2"
              name="addressLine2"
              value={newAddress.addressLine2}
              onChange={handleNewAddressChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Şehir"
              name="city"
              value={newAddress.city}
              onChange={handleNewAddressChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="İlçe / Bölge"
              name="state"
              value={newAddress.state}
              onChange={handleNewAddressChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Posta Kodu"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={handleNewAddressChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Ülke"
              name="country"
              value={newAddress.country}
              onChange={handleNewAddressChange}
            />
            <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
              <Button
                variant="outlined"
                onClick={() => setNewAddressExpanded(false)}
              >
                İptal
              </Button>
              <Button variant="contained" onClick={handleAddNewAddress}>
                Kaydet
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <TextField
        fullWidth
        margin="normal"
        label="Sipariş Notu"
        value={orderNote}
        onChange={(e) => setOrderNote(e.target.value)}
        multiline
        rows={3}
      />
      <Box mt={4}>
        <Button variant="contained" fullWidth onClick={handleConfirmOrder}>
          Siparişi Onayla
        </Button>
      </Box>
    </Box>
  );
}
