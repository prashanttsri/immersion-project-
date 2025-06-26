const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();
const PORT =3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// In-memory database (replace with actual database in production)
let vehicles = [
  {
    id: 1,
    vehicleName: 'Model S',
    price: 79999,
    image: 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=500',
    desc: 'Luxury electric sedan with autopilot capabilities',
    brand: 'Tesla'
  },
  {
    id: 2,
    vehicleName: 'Mustang GT',
    price: 55999,
    image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=500',
    desc: 'High-performance sports car with V8 engine',
    brand: 'Ford'
  },
  {
    id: 3,
    vehicleName: 'Civic Type R',
    price: 37995,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=500',
    desc: 'Sport compact car with turbocharged engine',
    brand: 'Honda'
  }
];

let nextId = 4;

// Routes

// Home route - Display all vehicles
app.get('/', (req, res) => {
  res.render('index', { vehicles });
});

// API Routes

// GET all vehicles (JSON API)
app.get('/api/vehicles', (req, res) => {
  res.json({
    success: true,
    data: vehicles,
    count: vehicles.length
  });
});

// GET single vehicle (JSON API)
app.get('/api/vehicles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: 'Vehicle not found'
    });
  }
  
  res.json({
    success: true,
    data: vehicle
  });
});

// POST new vehicle (JSON API)
app.post('/api/vehicles', (req, res) => {
  const { vehicleName, price, image, desc, brand } = req.body;
  
  if (!vehicleName || !price || !brand) {
    return res.status(400).json({
      success: false,
      message: 'Vehicle name, price, and brand are required'
    });
  }
  
  const newVehicle = {
    id: nextId++,
    vehicleName,
    price: parseFloat(price),
    image: image || 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=500',
    desc: desc || '',
    brand
  };
  
  vehicles.push(newVehicle);
  
  res.status(201).json({
    success: true,
    data: newVehicle,
    message: 'Vehicle created successfully'
  });
});

// PUT update vehicle (JSON API)
app.put('/api/vehicles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(v => v.id === id);
  
  if (vehicleIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Vehicle not found'
    });
  }
  
  const { vehicleName, price, image, desc, brand } = req.body;
  
  vehicles[vehicleIndex] = {
    ...vehicles[vehicleIndex],
    vehicleName: vehicleName || vehicles[vehicleIndex].vehicleName,
    price: price ? parseFloat(price) : vehicles[vehicleIndex].price,
    image: image || vehicles[vehicleIndex].image,
    desc: desc !== undefined ? desc : vehicles[vehicleIndex].desc,
    brand: brand || vehicles[vehicleIndex].brand
  };
  
  res.json({
    success: true,
    data: vehicles[vehicleIndex],
    message: 'Vehicle updated successfully'
  });
});

// DELETE vehicle (JSON API)
app.delete('/api/vehicles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(v => v.id === id);
  
  if (vehicleIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Vehicle not found'
    });
  }
  
  const deletedVehicle = vehicles.splice(vehicleIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedVehicle,
    message: 'Vehicle deleted successfully'
  });
});

// Web Routes (HTML Forms)

// Show all vehicles
app.get('/vehicles', (req, res) => {
  res.render('vehicles/index', { vehicles });
});

// Show form to create new vehicle
app.get('/vehicles/new', (req, res) => {
  res.render('vehicles/new');
});

// Show single vehicle
app.get('/vehicles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return res.status(404).render('404');
  }
  
  res.render('vehicles/show', { vehicle });
});

// Show form to edit vehicle
app.get('/vehicles/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return res.status(404).render('404');
  }
  
  res.render('vehicles/edit', { vehicle });
});

// Create vehicle from form
app.post('/vehicles', (req, res) => {
  const { vehicleName, price, image, desc, brand } = req.body;
  
  const newVehicle = {
    id: nextId++,
    vehicleName,
    price: parseFloat(price),
    image: image || 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=500',
    desc: desc || '',
    brand
  };
  
  vehicles.push(newVehicle);
  res.redirect('/vehicles');
});

// Update vehicle from form
app.put('/vehicles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(v => v.id === id);
  
  if (vehicleIndex === -1) {
    return res.status(404).render('404');
  }
  
  const { vehicleName, price, image, desc, brand } = req.body;
  
  vehicles[vehicleIndex] = {
    ...vehicles[vehicleIndex],
    vehicleName,
    price: parseFloat(price),
    image,
    desc,
    brand
  };
  
  res.redirect(`/vehicles/${id}`);
});

// Delete vehicle from form
app.delete('/vehicles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(v => v.id === id);
  
  if (vehicleIndex !== -1) {
    vehicles.splice(vehicleIndex, 1);
  }
  
  res.redirect('/vehicles');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

app.listen(PORT, () => {
  console.log(`🚗 Vehicle CRUD API Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/vehicles`);
  console.log(`🌐 Web interface available at http://localhost:${PORT}/vehicles`);
});