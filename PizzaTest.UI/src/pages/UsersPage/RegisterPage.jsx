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
    useTheme,
    useMediaQuery,
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

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // 600px altı

    const onSubmit = async (data) => {
        setRegisterError("");
        setIsLoading(true);

        try {
            const response = await authService.register(data);

            if (response?.data === "Kayıt işlemi başarılı.") {
                navigate("/auth/login");
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
            textAlign="center"
            sx={{
                width: { xs: "90%", sm: "70%", md: "50%", lg: "36%" },
                backgroundColor: "white",
                padding: { xs: 3, sm: 4, md: 5 },
                borderRadius: 5,
                boxShadow: "rgba(0, 0, 0, 1) 0px 10px 25px",
                mt: 5,
                mx: "auto",
            }}
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

                <Box mt={3} mx="auto" sx={{ width: { xs: "100%", sm: "80%", md: "50%" } }}>
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        sx={{ backgroundColor: "#092635" }}
                    >
                        {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
                    </Button>

                    <Typography mt={2} fontSize={{ xs: "0.9rem", sm: "1rem" }}>
                        Hesabınız var mı?
                        <Button
                            size="small"
                            sx={{ ml: 1 }}
                            onClick={() => navigate("/auth/login")}
                        >
                            Giriş yap
                        </Button>
                    </Typography>
                </Box>
            </form>
        </Box>
    );
}
