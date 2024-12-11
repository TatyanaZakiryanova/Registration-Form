import { Card } from '@mui/material';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        padding: 5,
        boxShadow: 3,
        borderRadius: '15px',
      }}
    >
      <RegistrationForm />
    </Card>
  );
};

export default App;
