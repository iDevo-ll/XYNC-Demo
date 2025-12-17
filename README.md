# xynginc-demo

> **Test Environment for XyNginC Plugin**

This project is created in order to test the xynginc plugin in a real environment. You may need to buy a VPS and host this into your VPS. Clone it from my GitHub: https://github.com/iDevo-ll/XYNC-Demo.git

This demonstration project showcases the XyNginC plugin in a realistic production-like environment, perfect for testing its features on a live VPS setup with Nginx reverse proxy and SSL certificate management.

[![Deploy to VPS](https://img.shields.io/badge/Deploy-VPS-blue?style=for-the-badge)](https://github.com/iDevo-ll/XYNC-Demo.git)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://github.com/iDevo-ll/XYNC-Demo.git)

## 🎯 Purpose

This test project demonstrates:

- **Production Environment Testing**: Real-world deployment scenarios with Nginx and SSL
- **VPS Hosting**: Optimized for virtual private server deployments
- **XyNginC Integration**: Full integration with the XyNginC plugin for automated reverse proxy setup
- **SSL Management**: Automatic Let's Encrypt certificate generation and renewal

## 🚀 Quick Start

### For VPS Deployment

1. **Clone the repository on your VPS**:

   ```bash
   git clone https://github.com/iDevo-ll/XYNC-Demo.git
   cd XYNC-Demo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure your domain**:

   - Update domain configuration in `src/configs/xypriss.config.ts`
   - Set up DNS A record pointing to your VPS IP address

4. **Start with XyNginC**:
   ```bash
   sudo npm start
   ```

The XyNginC plugin will automatically:

- Configure Nginx reverse proxy
- Set up SSL certificates via Let's Encrypt
- Enable automatic HTTPS
- Manage domain routing

### For Development

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev
```

The server will start on `http://localhost:9837` with hot reload and TypeScript compilation enabled.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── src/
│   ├── server.ts          # Main server entry point
│   ├── _sys/              # System configuration
│   ├── configs/           # Server configuration
│   ├── middleware/        # Custom middleware
│   ├── routes/            # API routes
│   └── schema/            # Validation schemas
├── package.json           # Dependencies and scripts
├── quickdev.config.json   # Development server config
├── xypriss.config.json    # XyPriss framework config
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Features

- 🔐 **Authentication** - JWT-based authentication
- 📁 **File Upload** - Support for file uploads
- **Type Safety**: Full TypeScript support with strict type checking
- **High Performance**: Built on XyPriss framework with optimized performance
- **Hot Reload**: Development server with automatic reloading and TypeScript compilation
- **Security**: Built-in security middleware and protections
- **Validation**: Request validation with Fortify Schema and TypeScript types
- **File Upload**: Support for multipart file uploads with type safety
- **Caching**: Memory-based caching for improved performance
- **🌐 Nginx Integration**: Automatic reverse proxy configuration via XyNginC plugin
- **🔒 SSL/HTTPS**: Automatic SSL certificate management with Let's Encrypt

## > XyNginC Integration

This demo project showcases the XyNginC plugin in action. The server configuration includes:

```typescript
import { createServer } from "xypriss";
import XNCP from "xynginc";

const app = createServer({
  plugins: {
    register: [
      XNCP({
        domains: [
          {
            domain: "your-domain.com", // Replace with your domain
            port: 9837,
            ssl: true,
            email: "admin@your-domain.com", // Replace with your email
          },
        ],
      }),
    ],
  },
});
```

### VPS Requirements

To run this demo on a VPS, ensure you have:

- **Linux VPS** (Ubuntu/Debian recommended)
- **Root access** or sudo privileges
- **Domain name** with DNS pointing to your VPS IP
- **Ports 80 and 443** open for HTTP/HTTPS traffic

### Prerequisites Installation

On your VPS, install the required software:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

## 📚 API Endpoints

### Health Check

- `GET /health` - Server health status
- `GET /api/status` - API status information

### User Management (Example)

- `GET /api/users` - List users
- `POST /api/users` - Create user

### File Upload (Example)

- `POST /api/upload` - Upload files

### Validation (Example)

- `POST /api/validate` - Validate input data

## > Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=9837
NODE_ENV=production
DOMAIN=your-domain.com
SSL_EMAIL=admin@your-domain.com
```

### Server Configuration

Edit `src/configs/xypriss.config.ts` to customize:

- Server port and host
- Security settings
- Performance options
- File upload limits
- Caching configuration
- **XyNginC domain settings** for production deployment

### 🌐 Domain Configuration

**Important**: This demo uses test domains provided by the Nehonix team. You **must** replace these with your own domains for production deployment:

```typescript
/**
 * These domains are test domains provided by nehonix team
 * You would need to replace it with your own domain
 */
{
  id: "server.nehonix.xyz",      // ← Replace with your domain
  port: 9283,
  routePrefix: "/api/v1",
  allowedRoutes: ["/api/v1/*"],
  server: {
    host: "localhost",
    jsonLimit: "20mb",
  },
},
{
  id: "admin.nehonix.xyz",       // ← Replace with your domain
  port: 9383,
  routePrefix: "/admin",
  allowedRoutes: ["/admin/*"],
},
```

**Replace**:

- `server.nehonix.xyz` → `api.yourdomain.com` or your preferred API subdomain
- `admin.nehonix.xyz` → `admin.yourdomain.com` or your admin subdomain

**Important Notes**:

- These .xyz domains are for **testing purposes only**
- Set up DNS A records pointing to your VPS IP address
- Ensure your domains are properly configured before running the XyNginC plugin

## 🧪 Development

### Adding Routes

Edit `src/routes/index.ts`:

```typescript
// Add new routes with type safety
router.get("/api/new-endpoint", (req: Request, res: Response) => {
  res.json({ message: "New endpoint" });
});
```

### Adding Middleware

Edit `src/middleware/index.ts`:

```typescript
// Add custom middleware with proper typing
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### Validation

Use Fortify Schema for request validation with TypeScript:

```typescript
import { Interface } from "fortify-schema";

const userSchema = Interface({
  username: "username",
  email: "email",
  password: "password",
});

// Use in routes with type safety
router.post(
  "/api/users",
  validateBody(userSchema),
  (req: Request, res: Response) => {
    // Request is validated and typed
    const userData = req.body; // Fully typed
    res.json({ success: true, user: userData });
  }
);
```

## 🚀 Production Deployment

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build
EXPOSE 9837

CMD ["npm", "start"]
```

### PM2 Deployment

```bash
npm install -g pm2
pm2 start dist/server.js --name "xynginc-demo" --watch
pm2 startup
pm2 save
```

### Nginx Configuration

The XyNginC plugin automatically generates optimal Nginx configuration:

- Reverse proxy setup
- SSL certificate integration
- Security headers
- Gzip compression
- Rate limiting

## 📦 Dependencies

### Runtime Dependencies

- `xypriss` - Main framework
- `xypriss-security` - Security utilities
- `fortify-schema` - Validation library
- `nehonix-uri-processor` - URI processing
- `nquickdev` - Development server
- `xynginc` - Nginx and SSL management plugin

### Development Dependencies

- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions
- `bun` - Fast JavaScript runtime
- `prisma` - Database toolkit

## 🛡️ Security Features

- **HTTPS Redirect**: Automatic redirect from HTTP to HTTPS
- **Security Headers**: Comprehensive security headers (HSTS, CSP, etc.)
- **Rate Limiting**: Built-in request rate limiting
- **Input Validation**: Schema-based request validation
- **JWT Authentication**: Secure token-based authentication
- **File Upload Security**: Secure file upload handling

## 🔍 Monitoring

### Health Checks

The application provides comprehensive health monitoring:

- `GET /health` - Basic health status
- `GET /api/status` - Detailed application status
- Automatic service restart on failure (with PM2)

### Logs

Application logs are available through:

- PM2 logs: `pm2 logs xynginc-demo`
- Nginx logs: `/var/log/nginx/`
- System logs: `journalctl -u nginx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Test thoroughly on a VPS environment
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- [XyPriss Documentation](https://github.com/Nehonix-Team/XyPriss)
- [XyNginC Plugin Documentation](https://github.com/Nehonix-Team/xynginc.git)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [GitHub Issues](https://github.com/iDevo-ll/XYNC-Demo/issues)

## 🎉 Acknowledgments

- Built with ❤️ using [XyPriss Framework](https://github.com/Nehonix-Team/XyPriss)
- Powered by [XyNginC Plugin](https://github.com/iDevo-ll/XYNC-Demo) for seamless Nginx integration
- SSL certificates provided by [Let's Encrypt](https://letsencrypt.org/)

---

**Ready to test XyNginC in production? Clone and deploy this demo on your VPS today!**
