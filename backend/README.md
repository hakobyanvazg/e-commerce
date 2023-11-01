It includes the following:

- Backend API with Express & MongoDB
- JWT authentication
- Cloudinary
- Stripe
- Protected routes and endpoints
- Custom middleware to check JSON web token
- Custom isAdmin and isUser middleware

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a Stripe account and obtain your `STRIPE_KEY` - (https://stripe.com/)
- Create a Cloudinary account and obtain your `CLOUDINARY_NAME`,`CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` - (https://cloudinary.com/users/register_free)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
DB_URI = your mongodb uri
STRIPE_KEY = your stripe key
CLIENT_URL = http://localhost:3000
PORT = 5000
JWT_SECRET_KEY = 'abc123'
CLOUDINARY_NAME = yor cloudinary name
CLOUDINARY_API_KEY = your cloudinary api key
CLOUDINARY_API_SECRET = your cloudinary api secret
```

### Install Dependencies

```
cd backend
npm install

```

### Run

```
npm run server
```
