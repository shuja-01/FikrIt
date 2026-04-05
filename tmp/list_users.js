const { Pool } = require('pg');

async function listUsers() {
    const connectionString = "postgresql://neondb_owner:npg_dHLoSc6sZT0z@ep-rough-voice-a1q90kie-pooler.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
    const pool = new Pool({ connectionString });

    try {
        const res = await pool.query('SELECT id, name, email, role FROM "User"');
        console.log("USERS_LIST_START");
        console.log(JSON.stringify(res.rows, null, 2));
        console.log("USERS_LIST_END");
    } catch (err) {
        console.error("Database Error:", err.message);
    } finally {
        await pool.end();
    }
}

listUsers();
