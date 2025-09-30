import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalShipping as DeliveryIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Assignment as OrderIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface OrderDetails {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number };
  };
  robotId?: string;
  createdAt: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  totalAmount: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    description?: string;
  }>;
  trackingHistory: Array<{
    timestamp: string;
    status: string;
    location?: string;
    description: string;
  }>;
  notes?: string;
}

const OrderDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Mock data - replace with API call
  useEffect(() => {
    const mockOrder: OrderDetails = {
      id: id || '1',
      orderNumber: 'ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
      },
      status: 'in-transit',
      priority: 'high',
      deliveryAddress: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        coordinates: { lat: 40.7128, lng: -74.0060 },
      },
      robotId: 'ROBOT-001',
      createdAt: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-15T14:30:00Z',
      totalAmount: 45.99,
      items: [
        {
          id: '1',
          name: 'Fresh Groceries Package',
          quantity: 1,
          price: 35.99,
          description: 'Organic vegetables and fruits',
        },
        {
          id: '2',
          name: 'Delivery Fee',
          quantity: 1,
          price: 10.00,
          description: 'Standard delivery service',
        },
      ],
      trackingHistory: [
        {
          timestamp: '2024-01-15T10:30:00Z',
          status: 'pending',
          description: 'Order placed successfully',
        },
        {
          timestamp: '2024-01-15T11:00:00Z',
          status: 'processing',
          description: 'Order confirmed and being prepared',
        },
        {
          timestamp: '2024-01-15T12:30:00Z',
          status: 'in-transit',
          location: 'Warehouse',
          description: 'Order picked up by robot ROBOT-001',
        },
        {
          timestamp: '2024-01-15T13:45:00Z',
          status: 'in-transit',
          location: '123 Main Street, New York',
          description: 'Robot is on the way to delivery address',
        },
      ],
      notes: 'Please deliver to the front door. Customer prefers contactless delivery.',
    };

    setTimeout(() => {
      setOrder(mockOrder);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'in-transit':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <WarningIcon />;
      case 'processing':
        return <ScheduleIcon />;
      case 'in-transit':
        return <DeliveryIcon />;
      case 'delivered':
        return <CheckIcon />;
      case 'cancelled':
        return <ErrorIcon />;
      default:
        return <OrderIcon />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Loading order details...</Typography>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box>
        <Alert severity="error">Order not found</Alert>
        <Button onClick={() => navigate('/orders')} startIcon={<ArrowBackIcon />}>
          Back to Orders
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/orders')}
          sx={{ mr: 2 }}
        >
          Back to Orders
        </Button>
        <Typography variant="h4" component="h1">
          Order Details - {order.orderNumber}
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditDialogOpen(true)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Order Status and Tracking */}
        <Box sx={{ flex: '1 1 400px', minWidth: 300 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Status & Tracking
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                icon={getStatusIcon(order.status)}
                label={order.status.replace('-', ' ').toUpperCase()}
                color={getStatusColor(order.status) as any}
                sx={{ mr: 2 }}
              />
              <Chip
                label={`${order.priority.toUpperCase()} PRIORITY`}
                color={getPriorityColor(order.priority) as any}
                variant="outlined"
              />
            </Box>

            <Stepper orientation="vertical">
              {order.trackingHistory.map((step, index) => (
                <Step key={index} active={index <= order.trackingHistory.length - 1}>
                  <StepLabel>
                    <Typography variant="body2" fontWeight="medium">
                      {step.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(step.timestamp)}
                    </Typography>
                    {step.location && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        • {step.location}
                      </Typography>
                    )}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Items */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <List>
              {order.items.map((item) => (
                <ListItem key={item.id} divider>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <OrderIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={item.description}
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2">
                      Qty: {item.quantity}
                    </Typography>
                    <Typography variant="h6">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Total Amount:</Typography>
              <Typography variant="h6" color="primary">
                ${order.totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Customer and Delivery Info */}
        <Box sx={{ flex: '1 1 300px', minWidth: 250 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={order.customer.name}
                  secondary={order.customer.email}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText secondary={order.customer.phone} />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LocationIcon />
                </ListItemIcon>
                <ListItemText
                  primary={order.deliveryAddress.street}
                  secondary={`${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.zipCode}`}
                />
              </ListItem>
              {order.robotId && (
                <ListItem>
                  <ListItemIcon>
                    <DeliveryIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Assigned Robot"
                    secondary={order.robotId}
                  />
                </ListItem>
              )}
              <ListItem>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Estimated Delivery"
                  secondary={formatDate(order.estimatedDelivery)}
                />
              </ListItem>
            </List>
          </Paper>

          {order.notes && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Special Notes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.notes}
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          <Typography>Edit functionality would be implemented here...</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetails;