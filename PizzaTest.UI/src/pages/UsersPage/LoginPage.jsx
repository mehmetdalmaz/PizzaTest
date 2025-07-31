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
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz.")
    .required("Email zorunludur."),
  password: yup.string().required("Şifre zorunludur."),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoginError("");
    setIsLoading(true);

    try {
      const response = await authService.login(data);

      const token = response?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        setLoginError("Email veya şifre hatalı.");
      }
    } catch (error) {
      setLoginError(
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
        Giriş Yap
      </Typography>

      {loginError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {loginError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mt={3}>
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
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
