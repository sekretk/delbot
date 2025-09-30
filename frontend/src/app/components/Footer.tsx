import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { VERSION_INFO, getVersionString } from '../../version';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 3 }}>
          <Stack spacing={4}>
            {/* Main Footer Content */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {/* Company Info */}
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="h6" gutterBottom>
                  DelBot
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Advanced robot delivery management system for modern logistics.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <EmailIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Quick Links */}
              <Box sx={{ minWidth: 150 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Links
                </Typography>
                <Stack spacing={1}>
                  <Link href="/" color="text.secondary" underline="hover">
                    Dashboard
                  </Link>
                  <Link href="/orders" color="text.secondary" underline="hover">
                    Orders
                  </Link>
                  <Link href="/analytics" color="text.secondary" underline="hover">
                    Analytics
                  </Link>
                  <Link href="/settings" color="text.secondary" underline="hover">
                    Settings
                  </Link>
                </Stack>
              </Box>

              {/* Support */}
              <Box sx={{ minWidth: 150 }}>
                <Typography variant="h6" gutterBottom>
                  Support
                </Typography>
                <Stack spacing={1}>
                  <Link href="/help" color="text.secondary" underline="hover">
                    Help Center
                  </Link>
                  <Link href="/docs" color="text.secondary" underline="hover">
                    Documentation
                  </Link>
                  <Link href="/api" color="text.secondary" underline="hover">
                    API Reference
                  </Link>
                  <Link href="/contact" color="text.secondary" underline="hover">
                    Contact Us
                  </Link>
                </Stack>
              </Box>

              {/* System Info */}
              <Box sx={{ minWidth: 150 }}>
                <Typography variant="h6" gutterBottom>
                  System
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Version: {getVersionString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Environment: {VERSION_INFO.environment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release: {VERSION_INFO.releaseDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: <span style={{ color: '#4caf50' }}>●</span> Online
                  </Typography>
                </Stack>
              </Box>
            </Box>

            <Divider />

            {/* Copyright */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © {currentYear} DelBot. All rights reserved.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Link href="/privacy" color="text.secondary" underline="hover">
                  Privacy Policy
                </Link>
                <Link href="/terms" color="text.secondary" underline="hover">
                  Terms of Service
                </Link>
                <Link href="/cookies" color="text.secondary" underline="hover">
                  Cookie Policy
                </Link>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;