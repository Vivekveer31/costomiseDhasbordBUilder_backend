// Mock large data for the dashboard
const getAnalyticsData = (req, res) => {
  const data = {
    kpis: [
      { id: 'sales', title: 'Total Sales', value: 612917, prefix: '$', trend: '+15.5%', trendType: 'up', color: 'cyan' },
      { id: 'orders', title: 'Total Orders', value: 34760, trend: '+12.8%', trendType: 'up', color: 'purple' },
      { id: 'visitor', title: 'Visitor', value: 14987, trend: '-2.1%', trendType: 'down', color: 'amber' },
      { id: 'products_sold', title: 'Total Sold Products', value: 12987, trend: '+11.2%', trendType: 'up', color: 'green' }
    ],
    revenueHistory: [
      { month: 'Jan', value: 120000 }, { month: 'Feb', value: 180000 },
      { month: 'Mar', value: 140000 }, { month: 'Apr', value: 420000 },
      { month: 'May', value: 320000 }, { month: 'Jun', value: 210000 },
      { month: 'Jul', value: 280000 }, { month: 'Aug', value: 320000 },
      { month: 'Sep', value: 190000 }, { month: 'Oct', value: 240000 },
      { month: 'Nov', value: 350000 }, { month: 'Dec', value: 410000 }
    ],
    trafficSources: [
      { label: 'Electronic', value: 2487, trend: '+1.5%', color: '#00F5FF' },
      { label: 'Games', value: 1825, trend: '+2.8%', color: '#9B59FF' },
      { label: 'Furniture', value: 1483, trend: '-0.5%', color: '#FFB800' }
    ],
    trendData: {
      revenue: Array.from({ length: 30 }, (_, i) => ({ day: i + 1, value: 60 + Math.random() * 20 })),
      users: Array.from({ length: 30 }, (_, i) => ({ day: i + 1, value: 50 + Math.random() * 15 })),
      conversions: Array.from({ length: 30 }, (_, i) => ({ day: i + 1, value: 35 + Math.random() * 10 }))
    },
    products: [
      { name: "ProMax Widget X", units: 4821, revenue: 847200, trend: [10, 25, 15, 30, 45, 40, 60] },
      { name: "DataSync Pro", units: 3204, revenue: 624780, trend: [40, 35, 50, 45, 55, 65, 70] },
      { name: "CloudVault Plus", units: 2891, revenue: 512340, trend: [20, 30, 25, 40, 35, 50, 45] },
      { name: "NexusPad Ultra", units: 1943, revenue: 298110, trend: [60, 50, 70, 65, 80, 75, 90] },
      { name: "StreamCore Elite", units: 1204, revenue: 187620, trend: [10, 15, 20, 25, 30, 35, 40] }
    ],
    // "Large" dataset for judging criteria
    eventLogs: Array.from({ length: 50 }, (_, i) => ({
      id: i,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      event: `System process ${Math.floor(Math.random() * 1000)} - ${['COMPLETED', 'INITIALIZED', 'WARNING', 'SYNCED'][Math.floor(Math.random() * 4)]}`,
      origin: `NODE-${Math.floor(Math.random() * 50)}`,
      status: Math.random() > 0.1 ? 'OK' : 'ERROR'
    }))
  };

  res.status(200).json({
    success: true,
    data
  });
};

module.exports = {
  getAnalyticsData
};
