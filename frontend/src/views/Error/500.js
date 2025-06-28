import { useDocumentTitle } from 'hooks/useDocumentTitle';
import React from 'react';
import ServerErrorImage from "./500 Internal Server Error-cuate.png"; // Update with your actual image path
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Typography,
    useTheme,
    useMediaQuery
} from '@mui/material';

const InternalServerError = (props) => {
    const { title = "Server Error" } = props;
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useDocumentTitle(title);

    // Function to reload the page
    const handleReload = () => {
        window.location.reload();
    };

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
                    src={ServerErrorImage}
                    alt="500 Internal Server Error"
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
                Oops! Server Error
            </Typography>

            <Typography
                variant={isMobile ? 'body1' : 'h6'}
                sx={{
                    mb: 4,
                    maxWidth: 600,
                    color: 'text.secondary'
                }}
            >
                Something went wrong on our end. Our team has been notified and we're working to fix it.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleReload}
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: isMobile ? '1rem' : '1.125rem'
                    }}
                >
                    Try Again
                </Button>

                <Button
                    variant="outlined"
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
            </Box>
        </Container>
    );
};

export default InternalServerError;