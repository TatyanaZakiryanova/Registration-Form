import { Button, Card, Typography } from "@mui/material";
import { RegistrationFormEng } from "./components/RegistrationFormEng";
import { useState } from "react";
import { RegistrationFormRu } from "./components/RegistrationFormRu";

const App = () => {
  const [language, setLanguage] = useState<"en" | "ru">("ru");
  return (
    <Typography>
      <Card
        sx={{
          maxWidth: 400,
          padding: 5,
          margin: 5,
          boxShadow: 3,
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1">
          Registration Form
        </Typography>
        <Button
          onClick={() => setLanguage("en")}
          variant="outlined"
          color="primary"
          sx={{ margin: "10px", fontSize: "10px" }}
        >
          English
        </Button>
        <Button
          onClick={() => setLanguage("ru")}
          variant="outlined"
          color="primary"
          sx={{ fontSize: "10px" }}
        >
          Русский
        </Button>
        {language === "en" ? <RegistrationFormEng /> : <RegistrationFormRu />}
      </Card>
    </Typography>
  );
};

export default App;
