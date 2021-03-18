function update_square_img(type) {

    type = current_location;
    var imgList;
    if (type == 0) { // home
        imgList = [
            "./img/home/colorIcon.png",
            "./img/home/roomIcon.png",
            "./img/home/shoesIcon.png",
            "./img/home/clothIcon.png",
            "./img/home/decorationIcon.png",
            "./img/home/transportationIcon.png"
        ];
    } else if (type == 1) { // background
        imgList = [
            "./img/background/background_luxuryHotel.png", 
            "./img/background/background_nature.png",
            "./img/background/background_rural.png", 
            "./img/background/background_urban.png",
            "./img/home/resetIcon.png",
            "./img/home/homeIcon.png"
        ];
    } else if (type == 2) { // transportation
        imgList = [
            "./img/transportation/1.png",
            "./img/transportation/2.png",
            "./img/transportation/3.png",
            "./img/transportation/4.png",
            "./img/transportation/5.png",
            "./img/transportation/6.png",
            "./img/home/resetIcon.png",
            "./img/home/homeIcon.png"
        ];

    } else if (type == 3) { // hat
        imgList = [
            "./img/Decoration/flag.png",
            "./img/Decoration/flowe.png",
            "./img/Decoration/football.png",
            "./img/Decoration/hat.png",
            "./img/Decoration/hat2.png",
            "./img/Decoration/pikachu.png",
            "./img/home/resetIcon.png",
            "./img/home/homeIcon.png"
        ];

    } else if (type == 4) { // cloth
        imgList = [
            "./img/outfit/cloth1Icon.png",
            "./img/outfit/cloth2Icon.png",
            "./img/outfit/cloth3Icon.png",
            "./img/outfit/cloth4Icon.png",
            "./img/home/resetIcon.png",
            "./img/home/homeIcon.png"
        ];
    } else if (type == 5) { // shoes
        imgList = [
            "./img/shoes/shoe1.png",
            "./img/shoes/shoe2.png",
            "./img/shoes/shoe3.png",
            "./img/shoes/shoe4.png",
            "./img/home/resetIcon.png",
            "./img/home/homeIcon.png"
        ];
    } else if (type == 6) { // skin
        imgList = [
            "./img/bucky/IconBlack.png",
            "./img/bucky/IconBrown.png",
            "./img/bucky/IconYellow.png",
            "./img/bucky/IconRed.png",
            "./img/home/resetIcon.png",
            "./img/home/homeIcon.png"
        ];
    }

    if (type == 0) {
        $("#btn-done").show();
    } else {
        $("#btn-done").hide();
    }

    if (imgList.length == 6) {
        $("#square-6").hide();
        $("#square-7").hide();
    } else if (imgList.length == 8) {
        $("#square-6").toggle();
        $("#square-7").toggle();
    }
    for (var i = imgList.length; i < 8; i++) {
        imgList.push(null);
    } // repair

    for (var i = 0; i < 8; i++) {
        $("#square-" + i).css("background-image", "url('" + imgList[i] + "')");
    }
}

function draw_decoration() {
    $("#column-left").append(
        "<div id='dec-1' class='ab-class'><img src='./img/Decoration/flag.png'\
        class = 'dec' id='dec-img-1'></img></div>");
    $("#dec-img-1").css("width", "300px");
    $("#dec-1").css("margin-top", "-100px");
    $("#dec-1").css("margin-left", "0px");

    $("#column-left").append(
        "<div id='dec-2' class='ab-class'><img src='./img/Decoration/flowe.png'\
        class = 'dec' id='dec-img-2'></img></div>");
    $("#dec-img-2").css("width", "200px");
    $("#dec-2").css("margin-top", "240px");
    $("#dec-2").css("margin-left", "329px");

    $("#column-left").append(
        "<div id='dec-3' class='ab-class'><img src='./img/Decoration/football.png'\
        class = 'dec' id='dec-img-3'></img></div>");
    $("#dec-img-3").css("width", "150px");
    $("#dec-3").css("margin-top", "310px");
    $("#dec-3").css("margin-left", "330px");

    $("#column-left").append(
        "<div id='dec-4' class='ab-class'><img src='./img/Decoration/hat.png'\
        class = 'dec' id='dec-img-4'></img></div>");
    $("#dec-img-4").css("width", "250px");
    $("#dec-4").css("margin-top", "-46px");
    $("#dec-4").css("margin-left", "92px");

    $("#column-left").append(
        "<div id='dec-5' class='ab-class'><img src='./img/Decoration/hat2.png'\
        class = 'dec' id='dec-img-5'></img></div>");
    $("#dec-img-5").css("width", "200px");
    $("#dec-5").css("margin-top", "-60px");
    $("#dec-5").css("margin-left", "230px");

    $("#column-left").append(
        "<div id='dec-6' class='ab-class'><img src='./img/Decoration/pikachu.png'\
        class = 'dec' id='dec-img-6'></img></div>");
    $("#dec-img-6").css("width", "200px");
    $("#dec-6").css("margin-top", "358px");
    $("#dec-6").css("margin-left", "55px");

    $(".dec").hide();
    // $("#dec-img-6").toggle();
}

function draw_car() {
    $("#column-left").append(
        "<div id='car-1' class='ab-class'><img src='./img/transportation/1.png'\
        class = 'car' id='car-img-1'></img></div>");
    $("#car-img-1").css("width", "400px");
    $("#car-1").css("margin-top", "230px");
    $("#car-1").css("margin-left", "255px");

    $("#column-left").append(
        "<div id='car-2' class='ab-class'><img src='./img/transportation/2.png'\
        class = 'car' id='car-img-2'></img></div>");
    $("#car-img-2").css("width", "300px");
    $("#car-2").css("margin-top", "283px");
    $("#car-2").css("margin-left", "283px");

    $("#column-left").append(
        "<div id='car-3' class='ab-class'><img src='./img/transportation/3.png'\
        class = 'car' id='car-img-3'></img></div>");
    $("#car-img-3").css("width", "400px");
    $("#car-3").css("margin-top", "243px");
    $("#car-3").css("margin-left", "269px");

    $("#column-left").append(
        "<div id='car-4' class='ab-class'><img src='./img/transportation/4.png'\
        class = 'car' id='car-img-4'></img></div>");
    $("#car-img-4").css("width", "400px");
    $("#car-4").css("margin-top", "213px");
    $("#car-4").css("margin-left", "269px");

    $("#column-left").append(
        "<div id='car-5' class='ab-class'><img src='./img/transportation/5.png'\
        class = 'car' id='car-img-5'></img></div>");
    $("#car-img-5").css("width", "400px");
    $("#car-5").css("margin-top", "243px");
    $("#car-5").css("margin-left", "269px");

    $("#column-left").append(
        "<div id='car-6' class='ab-class'><img src='./img/transportation/6.png'\
        class = 'car' id='car-img-6'></img></div>");
    $("#car-img-6").css("width", "400px");
    $("#car-6").css("margin-top", "263px");
    $("#car-6").css("margin-left", "269px");

    $(".car").hide();
}

function draw_shoes() {
    $("#column-left").append(
        "<div id='shoes-1' class='ab-class'><img src='./img/shoes/shoe1.png'\
        class = 'shoes' id='shoes-img-1'></img></div>");
    $("#shoes-img-1").css("width", "200px");
    $("#shoes-1").css("margin-top", "462px");
    $("#shoes-1").css("margin-left", "186px");

    $("#column-left").append(
        "<div id='shoes-2' class='ab-class'><img src='./img/shoes/shoe2.png'\
        class = 'shoes' id='shoes-img-2'></img></div>");
    $("#shoes-img-2").css("width", "250px");
    $("#shoes-2").css("margin-top", "446px");
    $("#shoes-2").css("margin-left", "160px");

    $("#column-left").append(
        "<div id='shoes-3' class='ab-class'><img src='./img/shoes/shoe3.png'\
        class = 'shoes' id='shoes-img-3'></img></div>");
    $("#shoes-img-3").css("width", "250px");
    $("#shoes-3").css("margin-top", "447px");
    $("#shoes-3").css("margin-left", "157px");

    $("#column-left").append(
        "<div id='shoes-4' class='ab-class'><img src='./img/shoes/shoe4.png'\
        class = 'shoes' id='shoes-img-4'></img></div>");
    $("#shoes-img-4").css("width", "250px");
    $("#shoes-4").css("margin-top", "458px");
    $("#shoes-4").css("margin-left", "161px");

    $(".shoes").hide();
}

function draw_clothing() {
    $("#column-left").append(
        "<div id='cloth-1' class='ab-class'><img src='./img/outfit/cloth1.png'\
         class='cloth' id='cloth-img-1'></img></div>");
    $("#cloth-1").css("margin-top", "161px");
    $("#cloth-1").css("margin-left", "-48px");
    $("#cloth-img-1").css("width", "600px");

    $("#column-left").append(
        "<div id='cloth-2' class='ab-class'><img src='./img/outfit/cloth2.png'\
         class='cloth' id='cloth-img-2'></img></div>");
    $("#cloth-2").css("margin-top", "-5px");
    $("#cloth-2").css("margin-left", "-101px");
    $("#cloth-img-2").css("width", "800px");

    $("#column-left").append(
        "<div id='cloth-3' class='ab-class'><img src='./img/outfit/cloth3.png'\
         class='cloth' id='cloth-img-3'></img></div>");
    $("#cloth-3").css("margin-top", "0px");
    $("#cloth-3").css("margin-left", "-101px");
    $("#cloth-img-3").css("width", "800px");

    $("#column-left").append(
        "<div id='cloth-4' class='ab-class'><img src='./img/outfit/cloth4.png'\
         class='cloth' id='cloth-img-4'></img></div>");
    $("#cloth-4").css("margin-top", "0px");
    $("#cloth-4").css("margin-left", "-101px");
    $("#cloth-img-4").css("width", "800px");
    
    $(".cloth").hide();
}


function begin_right() {
    // $("#column-right").html("<div class=\"content\" id=\"clothing-type\"></div>");
    // $("#clothing-type").html("<p>Hat</p>");
    // console.log("df");

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            $("#column-right").append("<div class='square' id='square-" + (i * 2 + j) + "'></div>");
        }
        $("#column-right").append("<span class=\"svg-span\"></span>");
    }

    $("#column-right").append("<div class='done' id='btn-done'></div>");
    $("#btn-done").click(show_activity);

    update_square_img(0); // 0->type
    $(".square").click(select_cloth);
}

function begin_draw() {
    $("#column-left").html(
        "<img class=\"bucky\" id=\"bucky-1\"src=\"./img/bucky/buckyBlack.png\"></img>\
        <img class=\"bucky\" id=\"bucky-2\"src=\"./img/bucky/buckyBrown.png\"></img>\
        <img class=\"bucky\" id=\"bucky-3\"src=\"./img/bucky/buckyYellow.png\"></img>\
        <img class=\"bucky\" id=\"bucky-4\"src=\"./img/bucky/buckyRed.png\"></img>"
        );
    $(".bucky").attr("width", "600px");
    $(".bucky").hide();
    $("#bucky-1").show();
    
    begin_right();
    draw_shoes();
    draw_clothing();
    draw_car();
    draw_decoration();
    update_square_img();
}

