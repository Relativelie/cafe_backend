const Pool = require('pg').Pool
const pool = new Pool({
    user: "home",
    password: '',
    host: "localhost",
    port: 5432,
    database: "cafe"
});

export default pool;