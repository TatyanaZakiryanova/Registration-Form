import { Card, Typography } from '@mui/material';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  return (
    <Typography>
      <Card
        sx={{
          maxWidth: 400,
          padding: 5,
          margin: 5,
          boxShadow: 3,
          borderRadius: '15px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="h1">
          Registration Form
        </Typography>
        <RegistrationForm />
      </Card>
    </Typography>
  );
};

export default App;
