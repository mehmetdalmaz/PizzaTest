import { authService } from "../../services/authService";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("İsim zorunludur."),
  surname: yup.string().required("Soyisim zorunludur."),
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz.")
    .required("Email zorunludur."),
  password: yup.string().required("Şifre zorunludur."),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setRegisterError("");
    setIsLoading(true);

    try {
      const response = await authService.register(data);

      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        setRegisterError("Kayıt işlemi başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setRegisterError(
        error?.toString() || "Sunucu hatası. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      textAlign={"center"}
      sx={{
        width: "36%",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 1) 0px 10px 25px",
      }}
      marginTop={5}
      marginX={"auto"}
    >
      <Typography color="#092635" variant="h4">
        Kayıt Ol
      </Typography>

      {registerError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {registerError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mt={3}>
          <TextField
            label="İsim"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Soyisim"
            fullWidth
            {...register("surname")}
            error={!!errors.surname}
            helperText={errors.surname?.message}
          />
          <TextField
            label="Email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Şifre"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Stack>

        <Box mt={2} width={"50%"} marginX={"auto"}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{ backgroundColor: "#092635" }}
          >
            {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
          </Button>
          <Typography>
            {" "}
            Hesabınız var mı ?{" "}
            <Button
              size="small"
              sx={{ m: 1 }}
              onClick={() => navigate("/web/auth/login")}
            >
              giriş yap
            </Button>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
