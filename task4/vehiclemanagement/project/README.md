# Vehicle CRUD API

A comprehensive RESTful API for managing vehicle inventory with full CRUD operations, built with Express.js and EJS templating.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete vehicles
- ✅ **RESTful API**: JSON endpoints for programmatic access
- ✅ **Web Interface**: User-friendly HTML forms and views
- ✅ **Vehicle Model**: vehicleName, price, image, description, brand
- ✅ **Responsive Design**: Bootstrap-powered UI that works on all devices
- ✅ **Form Validation**: Client and server-side validation
- ✅ **Error Handling**: Proper 404 and 500 error pages
- ✅ **Professional Styling**: Modern, clean interface with hover effects

## Vehicle Model Schema

```javascript
{
  id: Number,           // Auto-generated unique identifier
  vehicleName: String,  // Name/model of the vehicle (required)
  price: Number,        // Vehicle price (required)
  image: String,        // URL to vehicle image (optional, default provided)
  desc: String,         // Vehicle description (optional)
  brand: String         // Vehicle brand (required)
}
```

## API Endpoints

### JSON API Routes
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get single vehicle
- `POST /api/vehicles` - Create new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Web Interface Routes
- `GET /` - Homepage
- `GET /vehicles` - List all vehicles
- `GET /vehicles/new` - New vehicle form
- `GET /vehicles/:id` - View single vehicle
- `GET /vehicles/:id/edit` - Edit vehicle form
- `POST /vehicles` - Create vehicle (form)
- `PUT /vehicles/:id` - Update vehicle (form)
- `DELETE /vehicles/:id` - Delete vehicle (form)

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

3. **Access the application:**
   - Web Interface: http://localhost:3000
   - API Endpoints: http://localhost:3000/api/vehicles

## Usage Examples

### API Usage (JSON)

**Create a new vehicle:**
```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleName": "Model 3",
    "price": 35000,
    "brand": "Tesla",
    "desc": "Affordable electric sedan",
    "image": "https://example.com/model3.jpg"
  }'
```

**Get all vehicles:**
```bash
curl http://localhost:3000/api/vehicles
```

**Update a vehicle:**
```bash
curl -X PUT http://localhost:3000/api/vehicles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 37000
  }'
```

**Delete a vehicle:**
```bash
curl -X DELETE http://localhost:3000/api/vehicles/1
```

### Web Interface

1. Visit http://localhost:3000 for the homepage
2. Click "View All Vehicles" to see the inventory
3. Use "Add New Vehicle" to create vehicles via web form
4. Click vehicle cards to view, edit, or delete individual vehicles

## Project Structure

```
vehicle-crud-api/
├── server.js                 # Main server file with all routes
├── package.json              # Dependencies and scripts
├── public/
│   └── css/
│       └── style.css         # Custom styles
├── views/
│   ├── index.ejs            # Homepage
│   ├── 404.ejs              # Not found page
│   ├── 500.ejs              # Server error page
│   ├── partials/
│   │   ├── header.ejs       # Header template
│   │   └── footer.ejs       # Footer template
│   └── vehicles/
│       ├── index.ejs        # List all vehicles
│       ├── show.ejs         # Show single vehicle
│       ├── new.ejs          # Create vehicle form
│       └── edit.ejs         # Edit vehicle form
└── README.md                # This file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Bootstrap 5, Font Awesome, Custom CSS
- **HTTP Methods**: GET, POST, PUT, DELETE (with method-override)
- **Data Storage**: In-memory (easily replaceable with database)

## Features in Detail

### Data Validation
- Required fields: vehicleName, price, brand
- Price validation (must be positive number)
- URL validation for image field
- Form validation with user feedback

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Responsive navigation
- Optimized for all screen sizes

### User Experience
- Hover effects on cards
- Smooth transitions
- Loading states
- Confirmation dialogs for destructive actions
- Success/error feedback

### Developer Experience
- Clean, modular code structure
- Comprehensive error handling
- RESTful API design
- Easy to extend and customize

## Sample Data

The application comes with 3 sample vehicles:
1. Tesla Model S - $79,999
2. Ford Mustang GT - $55,999
3. Honda Civic Type R - $37,995

## Customization

### Adding Database Support
Replace the in-memory `vehicles` array with your preferred database:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- MySQL with Sequelize
- SQLite with better-sqlite3

### Styling Customization
- Edit `public/css/style.css` for custom styles
- Modify Bootstrap theme in header template
- Add your own images and branding

### Feature Extensions
- User authentication
- Image upload functionality
- Search and filtering
- Pagination
- Data export/import
- Admin dashboard

## License

This project is open source and available under the MIT License.