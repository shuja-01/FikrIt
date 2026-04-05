const { Pool } = require('pg');

async function elevate() {
    const connectionString = "postgresql://neondb_owner:npg_dHLoSc6sZT0z@ep-rough-voice-a1q90kie-pooler.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
    const pool = new Pool({ connectionString });

    try {
        await pool.query('UPDATE "User" SET role = $1, "isApproved" = true WHERE email = $2', ['ADMIN', 'itssahilllk@gmail.com']);
        const res = await pool.query('SELECT name, email, role, "isApproved" FROM "User" WHERE email = $1', ['itssahilllk@gmail.com']);
        console.log("SUCCESS!", JSON.stringify(res.rows[0]));
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await pool.end();
    }
}
elevate();
