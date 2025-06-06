// src/server.ts
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    if (!config.db_url) throw new Error("MongoDB URI not found. Check .env or config.");

    await mongoose.connect(config.db_url);
    console.log('✅ MongoDB connected');

    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });

  } catch (error) {
    console.error('❌ Connection error:', error);
  }
}

main();
