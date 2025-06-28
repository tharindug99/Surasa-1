import { useDocumentTitle } from 'hooks/useDocumentTitle';
import React from 'react';
import ErrorGif404 from "./404 error with a landscape-cuate.png";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

const NotFound = (props) => {
  const { title = "Page Not Found" } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useDocumentTitle(title);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        py: 4,
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          mb: 4,
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          src={ErrorGif404}
          alt="404 Error - Page Not Found"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: isMobile ? '40vh' : '60vh',
            display: 'block'
          }}
        />
      </Box>

      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        component="h1"
        sx={{
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Oops! Page Not Found
      </Typography>

      <Typography
        variant={isMobile ? 'body1' : 'h6'}
        sx={{
          mb: 4,
          maxWidth: 600,
          color: 'text.secondary'
        }}
      >
        The page you're looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: isMobile ? '1rem' : '1.125rem'
        }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;