// const http = require('http');

// const server = http.createServer((req, res) => {

//     if (req.method == 'GET' && req.url == '/hello') {

//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.end(
//             JSON.stringify(
//                 {
//                     "message": "Hello World",
//                     "status": "success"
//                 }
//             )
//         )
//         return;
//     }

//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'application/json');
//     res.end(
//         JSON.stringify(
//             {
//                 "message": "Not Found",
//                 "status": "error"
//             }
//         )
//     )
// });

// server.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });

const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.method == 'GET' && req.url =='/health'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify(
                {
                    "message": "Server is healthy",
                    "status": "success"
                }
            )
        )
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(
        JSON.stringify(
            {
                "message": "Not Found",
                "status": "error"
            }
        )
    )
});

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});