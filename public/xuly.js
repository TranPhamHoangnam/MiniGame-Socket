var socket = io("https://hoangnamit.herokuapp.com");

socket.on("server-send-danhsach", function(data){
    $(".hocvien").html("");

    data.map((phantu, key) => {

        $(".hocvien").append(`<div class="hang1">id: ${key} || <span> ${phantu.HOTEN} </span></div> 
                            <div class="hang2"> ${phantu.EMAIL} - ${phantu.SDT}</div>
                            `);
    })

})

$(document).ready(function(){
    
    // bắt sự kiển gửi
    $("#btnRegister").click(function(){
        socket.emit("hoc-vien-gui-thong-tin", { 
            hoten: $("#txtHoTen").val(), 
            email: $("#txtEmail").val(), 
            sdt: $("#txtSoDT").val() 
        });

    })


})