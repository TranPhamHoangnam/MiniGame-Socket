var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require('http').Server(app);

var io = require("socket.io")(server);

server.listen( process.env.PORT || 3000);

var mangDS = [];

io.on("connection", function(socket){
    console.log("có người kết nối " + socket.id);

    socket.on("hoc-vien-gui-thong-tin", function(data){

        mangDS.push(
            new HocVien(data.hoten, data.email, data.sdt) // push 1 học viên vào
        )

        console.log(mangDS);
        
        // gửi cho tất cả mọi người
        io.sockets.emit("server-send-danhsach", mangDS);
        
    })
    
})

// tạo hàm học viên
function HocVien(hoten, email, sdt){
    this.HOTEN = hoten;
    this.EMAIL = email;
    this.SDT = sdt;
}

app.get("/", function(req, res){
    res.render("index");
})