import { useEffect, useState } from "react";
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
  Box,
  Collapse,
  IconButton,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { orderService } from "../../services/orderService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Row({ order }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={cellStyle}>{order.id}</TableCell>
        <TableCell sx={cellStyle}>{order.userID}</TableCell>
        <TableCell sx={cellStyle}>
          {order.userName} {order.userSurname}
        </TableCell>
        <TableCell sx={cellStyle}>
          {order.addressLine1}, {order.city}
        </TableCell>
        <TableCell sx={cellStyle}>{new Date(order.orderDate).toLocaleString()}</TableCell>
        <TableCell sx={cellStyle}>{new Date(order.deliveryDate).toLocaleString()}</TableCell>
        <TableCell sx={cellStyle}>{order.totalPrice.toFixed(2)} ₺</TableCell>
        <TableCell sx={cellStyle}>{order.orderNote || "-"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={9} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle1" gutterBottom>
                Adres Detayları
              </Typography>
              <Typography variant="body2" gutterBottom>
                {order.addressLine1}, {order.addressLine2}, {order.city}, {order.state}, {order.postalCode}, {order.country}
              </Typography>

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Sipariş Ürünleri
              </Typography>
              <Table size="small" aria-label="order-details">
                <TableHead>
                  <TableRow>
                    <TableCell sx={cellStyle}>\u00dcrün Adı</TableCell>
                    <TableCell sx={cellStyle}>Adet</TableCell>
                    <TableCell sx={cellStyle}>Birim Fiyatı</TableCell>
                    <TableCell sx={cellStyle}>Toplam Fiyat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderDetails.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={cellStyle}>{item.productName}</TableCell>
                      <TableCell sx={cellStyle}>{item.quantity}</TableCell>
                      <TableCell sx={cellStyle}>{item.productPrice.toFixed(2)} ₺</TableCell>
                      <TableCell sx={cellStyle}>{item.totalPrice.toFixed(2)} ₺</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const cellStyle = {
  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
  px: { xs: 0.5, sm: 1.5, md: 2 },
  py: { xs: 0.5, sm: 1 },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await orderService.getOrders();
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        setError("Siparişler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilter = () => {
    if (!startDate && !endDate) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);

      if (startDate && !endDate) {
        const start = new Date(startDate);
        return orderDate >= start;
      }

      if (!startDate && endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return orderDate <= end;
      }

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return orderDate >= start && orderDate <= end;
      }

      return true;
    });

    setFilteredOrders(filtered);
  };

  const exportToExcel = () => {
    const excelData = [];

    filteredOrders.forEach((order) => {
      order.orderDetails.forEach((item) => {
        excelData.push({
          "Sipariş ID": order.id,
          "Kullanıcı ID": order.userID,
          "Ad Soyad": `${order.userName} ${order.userSurname}`,
          Adres: `${order.addressLine1}, ${order.city}`,
          "Sipariş Tarihi": new Date(order.orderDate).toLocaleString(),
          "Teslim Tarihi": new Date(order.deliveryDate).toLocaleString(),
          "Toplam Tutar (₺)": order.totalPrice,
          Not: order.orderNote || "-",
          "\u00dcr\u00fcn Adı": item.productName,
          Adet: item.quantity,
          "Birim Fiyatı (₺)": item.productPrice.toFixed(2),
          "Toplam Fiyat (₺)": item.totalPrice.toFixed(2),
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Siparişler Detaylı");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "SiparisListesi_Detayli.xlsx");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={2}
        mt={2}
        px={{ xs: 1, md: 0 }}
      >
        <TextField
          label="Başlangıç Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ width: { xs: "100%", sm: "auto" }, fontSize: { xs: "0.8rem" } }}
        />
        <TextField
          label="Bitiş Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          inputProps={{ min: startDate || undefined }}
          sx={{ width: { xs: "100%", sm: "auto" }, fontSize: { xs: "0.8rem" } }}
        />
        <Button variant="contained" onClick={handleFilter} sx={{ fontSize: { xs: "0.75rem" } }}>
          Filtrele
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setStartDate("");
            setEndDate("");
            setFilteredOrders(orders);
          }}
          sx={{ fontSize: { xs: "0.75rem" } }}
        >
          Temizle
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1200, margin: "auto", marginTop: 2, px: { xs: 1, md: 0 } }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}
        >
          Sipariş Listesi
        </Typography>
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={cellStyle}>Sipariş ID</TableCell>
              <TableCell sx={cellStyle}>Kullanıcı ID</TableCell>
              <TableCell sx={cellStyle}>Ad Soyad</TableCell>
              <TableCell sx={cellStyle}>Adres</TableCell>
              <TableCell sx={cellStyle}>Sipariş Tarihi</TableCell>
              <TableCell sx={cellStyle}>Teslim Tarihi</TableCell>
              <TableCell sx={cellStyle}>Toplam Tutar</TableCell>
              <TableCell sx={cellStyle}>Not</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Sipariş bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => <Row key={order.id} order={order} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2} px={{ xs: 1, md: 0 }}>
        <Button variant="contained" color="success" onClick={exportToExcel} sx={{ fontSize: { xs: "0.75rem" } }}>
          Excel'e Aktar
        </Button>
      </Box>
    </>
  );
}