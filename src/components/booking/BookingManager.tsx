
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar, Search, Filter, Clock, User, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BookingCalendar from './BookingCalendar';

interface BookingManagerProps {
  userType: 'customer' | 'provider';
  userId: string;
}

interface Booking {
  id: string;
  service: string;
  customerName: string;
  providerName: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  customerPhone?: string;
  providerPhone?: string;
  notes?: string;
}

const BookingManager = ({ userType, userId }: BookingManagerProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      service: 'House Cleaning',
      customerName: 'John Doe',
      providerName: 'Sarah Johnson',
      date: '2024-01-15',
      time: '14:00',
      duration: '2 hours',
      location: 'Victoria Island, Lagos',
      status: 'confirmed',
      price: 15000,
      customerPhone: '+234 801 234 5678',
      providerPhone: '+234 802 345 6789',
      notes: 'Deep cleaning required for kitchen and bathrooms'
    },
    {
      id: '2',
      service: 'Office Cleaning',
      customerName: 'Jane Smith',
      providerName: 'Michael Adebayo',
      date: '2024-01-16',
      time: '09:00',
      duration: '3 hours',
      location: 'Ikeja, Lagos',
      status: 'pending',
      price: 25000,
      customerPhone: '+234 803 456 7890',
      providerPhone: '+234 804 567 8901'
    },
    {
      id: '3',
      service: 'Deep Cleaning',
      customerName: 'David Wilson',
      providerName: 'Sarah Johnson',
      date: '2024-01-14',
      time: '10:00',
      duration: '4 hours',
      location: 'Lekki, Lagos',
      status: 'completed',
      price: 30000,
      customerPhone: '+234 805 678 9012',
      providerPhone: '+234 802 345 6789'
    },
    {
      id: '4',
      service: 'Apartment Cleaning',
      customerName: 'Mary Johnson',
      providerName: 'David Chen',
      date: '2024-01-17',
      time: '11:00',
      duration: '2 hours',
      location: 'Yaba, Lagos',
      status: 'in-progress',
      price: 18000,
      customerPhone: '+234 806 789 0123',
      providerPhone: '+234 807 890 1234'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Booking status changed to ${newStatus}`,
    });
  };

  const handleContactUser = (booking: Booking) => {
    const contactName = userType === 'customer' ? booking.providerName : booking.customerName;
    toast({
      title: "Contact Initiated",
      description: `Starting conversation with ${contactName}`,
    });
  };

  const getUpcomingBookings = () => {
    return bookings.filter(booking => 
      ['pending', 'confirmed', 'in-progress'].includes(booking.status)
    ).slice(0, 3);
  };

  const getBookingStats = () => {
    const total = bookings.length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const totalEarnings = bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.price, 0);

    return { total, completed, pending, totalEarnings };
  };

  const stats = getBookingStats();

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="bookings">All Bookings</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Bookings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">₦{stats.totalEarnings.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {getUpcomingBookings().length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming bookings</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getUpcomingBookings().map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{new Date(booking.date).toLocaleDateString()}</div>
                          <div className="text-lg font-bold">{booking.time}</div>
                        </div>
                        <div>
                          <h4 className="font-medium">{booking.service}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{userType === 'customer' ? booking.providerName : booking.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <div className="text-sm font-medium">₦{booking.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <BookingCalendar />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{booking.service}</h3>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{userType === 'customer' ? booking.providerName : booking.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{new Date(booking.date).toLocaleDateString()} at {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{booking.duration}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{userType === 'customer' ? booking.providerPhone : booking.customerPhone}</span>
                          </div>
                          <div className="text-lg font-bold">₦{booking.price.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <p className="text-sm text-muted-foreground">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContactUser(booking)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      
                      {userType === 'provider' && booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(booking.id, 'in-progress')}
                        >
                          Start Service
                        </Button>
                      )}
                      
                      {booking.status === 'in-progress' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(booking.id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.filter(b => b.status === 'completed' || b.status === 'cancelled').map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{booking.service}</h4>
                      <p className="text-sm text-muted-foreground">
                        {userType === 'customer' ? booking.providerName : booking.customerName} • {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <div className="text-sm font-medium mt-1">₦{booking.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingManager;
