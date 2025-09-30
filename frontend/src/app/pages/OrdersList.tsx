import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  LocalShipping as DeliveryIcon,
  Assignment as OrderIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  status: 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  deliveryAddress: string;
  robotId?: string;
  createdAt: string;
  estimatedDelivery: string;
  totalAmount: number;
}

const OrdersList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data - replace with API call
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      status: 'in-transit',
      priority: 'high',
      deliveryAddress: '123 Main St, City',
      robotId: 'ROBOT-001',
      createdAt: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-15T14:30:00Z',
      totalAmount: 45.99,
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      status: 'processing',
      priority: 'medium',
      deliveryAddress: '456 Oak Ave, City',
      createdAt: '2024-01-15T11:15:00Z',
      estimatedDelivery: '2024-01-15T16:15:00Z',
      totalAmount: 32.50,
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customer: 'Bob Johnson',
      status: 'delivered',
      priority: 'low',
      deliveryAddress: '789 Pine St, City',
      robotId: 'ROBOT-002',
      createdAt: '2024-01-15T09:00:00Z',
      estimatedDelivery: '2024-01-15T13:00:00Z',
      totalAmount: 28.75,
    },
    {
      id: '4',
      orderNumber: 'ORD-004',
      customer: 'Alice Brown',
      status: 'pending',
      priority: 'high',
      deliveryAddress: '321 Elm St, City',
      createdAt: '2024-01-15T12:00:00Z',
      estimatedDelivery: '2024-01-15T17:00:00Z',
      totalAmount: 67.25,
    },
  ];

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
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

  const getPriorityColor = (priority: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, order: Order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleViewOrder = () => {
    if (selectedOrder) {
      navigate(`/orders/${selectedOrder.id}`);
    }
    handleMenuClose();
  };

  const handleEditOrder = () => {
    if (selectedOrder) {
      navigate(`/orders/${selectedOrder.id}/edit`);
    }
    handleMenuClose();
  };

  const handleDeleteOrder = () => {
    // Add delete logic here
    console.log('Delete order:', selectedOrder?.id);
    handleMenuClose();
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Orders Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/orders/new')}
        >
          New Order
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <OrderIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{orders.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Orders
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <ScheduleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{statusCounts.processing || 0}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Processing
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <DeliveryIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{statusCounts['in-transit'] || 0}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Transit
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <DeliveryIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{statusCounts.delivered || 0}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Delivered
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <TextField
              select
              fullWidth
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </TextField>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
            >
              More Filters
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Delivery Address</TableCell>
              <TableCell>Robot ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {order.orderNumber}
                  </Typography>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status.replace('-', ' ').toUpperCase()}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.priority.toUpperCase()}
                    color={getPriorityColor(order.priority)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{order.deliveryAddress}</TableCell>
                <TableCell>
                  {order.robotId ? (
                    <Chip label={order.robotId} size="small" />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Not assigned
                    </Typography>
                  )}
                </TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, order)}
                    size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewOrder}>
          <ViewIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEditOrder}>
          <EditIcon sx={{ mr: 1 }} />
          Edit Order
        </MenuItem>
        <MenuItem onClick={handleDeleteOrder} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Order
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default OrdersList;