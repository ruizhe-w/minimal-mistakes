function dragFromRight(e){
// var id = e.target.id.substr(e.target.id.length - 1, 1)
   var image = $("#" + e.target.id).prop("background-image");
   $("#column-wrap").append(
         "<div class='drag_item' id='drag_" + e.target.id +
         "'><img src='" + image +"' class='dragImage'><img></div>");
    
   $("#" + id).css("background-image", null);
   

}


function draw_activity() {
    $("#main-wrap").addClass("ab-class");
    $("#main-wrap").append(
        "<div id='activity-B' class='ab-class'></div>");
    $("#activity-B").css("background", "url('./img/Activity/activityPage.png'");
    $("#activity-B").css("background-size", "cover");
    // $("#activity-B").css("top", "100px");
    // $("#activity-B").css("width", "60%");
    // $("#activity-B").css("left", "30%");
    // $("#activity-B").css("height", "60%");
   

    $("#activity-B").append(
        "<div id='activity-1' class='activity ab-class'><img src='./img/Activity/activity1.png'\
        class='activity' id='activity-img-1'></img></div>");
    
    // $("#activity-img-1").css("width", "150px");
    $("#activity-1").css("top", "33%");
    

    $("#activity-B").append(
        "<div id='activity-2' class='activity ab-class'><img src='./img/Activity/activity2.png'\
        class='activity' id='activity-img-2'></img></div>");
    // $("#activity-img-2").css("width", "150px");
    $("#activity-2").css("top", "55%");
       

    $("#activity-B").append(
        "<div id='activity-3' class='activity ab-class'><img src='./img/Activity/activity3.png'\
        class='activity' id='activity-img-3'></img></div>");
    // $("#activity-img-3").css("width", "150px");
    $("#activity-3").css("top", "77%");
}