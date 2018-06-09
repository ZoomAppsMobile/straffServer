function blockUserFunction(param, check){
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        headers: {
            '_id':param
        },
        url: "http://localhost:3000/api/blockUsers",
        data: {value_block:check},
        success: function(msg) {
          alert(msg)
        }
    });


}