import http from "http";
const PORT = 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello World</h1>");
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
