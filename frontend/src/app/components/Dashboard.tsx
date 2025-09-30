import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
  Avatar,
} from '@mui/material';
import {
  LocalShipping as DeliveryIcon,
  Assignment as OrderIcon,
  Person as UserIcon,
  TrendingUp as StatsIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Orders',
      value: '24',
      icon: <OrderIcon />,
      color: 'primary',
    },
    {
      title: 'Deliveries Today',
      value: '12',
      icon: <DeliveryIcon />,
      color: 'success',
    },
    {
      title: 'Active Users',
      value: '156',
      icon: <UserIcon />,
      color: 'info',
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      icon: <StatsIcon />,
      color: 'secondary',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to DelBot - Your delivery management system
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: `${stat.color}.main` }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 400px', minWidth: 300 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { action: 'Order #1234', status: 'Delivered', time: '2 min ago' },
                { action: 'Order #1233', status: 'In Transit', time: '15 min ago' },
                { action: 'Order #1232', status: 'Delivered', time: '1 hour ago' },
                { action: 'Order #1231', status: 'Processing', time: '2 hours ago' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: index < 3 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2">{item.action}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={item.status}
                      size="small"
                      color={
                        item.status === 'Delivered'
                          ? 'success'
                          : item.status === 'In Transit'
                          ? 'warning'
                          : 'default'
                      }
                    />
                    <Typography variant="caption" color="text.secondary">
                      {item.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Backend API</Typography>
                <Chip label="Online" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Database</Typography>
                <Chip label="Online" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Message Queue</Typography>
                <Chip label="Online" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">External APIs</Typography>
                <Chip label="Online" size="small" color="success" />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;