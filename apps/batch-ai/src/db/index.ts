import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/myapp',
});

export default pool;
