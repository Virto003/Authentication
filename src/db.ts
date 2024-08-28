import { Pool } from "pg"

const connectionString = 'postgresql://postgres.aakiibccbwbrjwcfxzbq:EKEyIy5T7VOYP0jh@aws-0-sa-east-1.pooler.supabase.com:6543/postgres';

const db = new Pool({
    connectionString
})

export default db;