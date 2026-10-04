const pool = require("./db/connection");
const http = require("http");
const env = require("./config/env");

const server = http.createServer(async (req, res) => {

    if (req.method === "GET" && req.url === "/interns") {

        try {

            const query = "SELECT * FROM interns";

            const [rows] = await pool.execute(query);

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            res.end(
                JSON.stringify({
                    status: "okay",
                    data: rows
                })
            );

        } catch (error) {

            console.log("DATA FETCH ERROR");

            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");

            res.end(
                JSON.stringify({
                    status: "error",
                    message: error.message
                })
            );
        }

        return;
    }

    else if (req.method === "GET" && req.url.startsWith("/interns/")) {

        try {

            const id = req.url.split("/")[2];

            const query = "SELECT * FROM interns WHERE id = ?";

            const [rows] = await pool.execute(query, [id]);

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            res.end(
                JSON.stringify({
                    status: "okay",
                    data: rows
                })
            );

        } catch (error) {

            console.log("DATA FETCH ERROR");

            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");

            res.end(
                JSON.stringify({
                    status: "error",
                    message: error.message
                })
            );
        }

        return;
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");

    res.end(
        JSON.stringify({
            status: "error",
            message: "Route not found"
        })
    );
});

server.listen(env.port, () => {

    console.log(
        `Server running at http://localhost:${env.port}/`
    );

});