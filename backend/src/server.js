import dotenv from 'dotenv';
import app from './app.js';
import { connectDb } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDb();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});


