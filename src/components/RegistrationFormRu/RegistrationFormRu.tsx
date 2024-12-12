import { ChangeEvent, FormEvent, useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Snackbar,
  TextField,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";

import { FormData } from "../types";

export const RegistrationFormRu = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    dob: dayjs(dayjs()),
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Имя пользователя обязательно";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Электронная почта обязательна";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Неверный формат электронной почты";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Номер телефона обязателен";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = "Неверный формат номера телефона";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(formData.password)) {
      newErrors.password =
        "Пароль должен быть от 6 до 20 символов и содержать хотя бы одну заглавную букву и цифру";
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //вернёт true, если валидация прошла
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setFormData((prev) => ({ ...prev, dob: newValue }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setOpenSnackbar(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Имя пользователя"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Номер телефона"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <DatePicker label="Дата рождения" value={formData.dob} onChange={handleDateChange} />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Пароль"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Подтвердите пароль"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.terms}
                onChange={handleChange}
                name="terms"
                color="primary"
                required
              />
            }
            label="Я согласен с условиями"
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" disabled={!formData.terms}>
          Зарегистрироваться
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Форма успешно отправлена!
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};
