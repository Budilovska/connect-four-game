(function() {

    var column = $(".column");
    var currentPlayer = "Luke";
    var slots = $(".slot");
    console.log(slots);

    var modalContainer = $(".modal-container");
    var starWarsLogo = $(".modal-content");

    column.on("click", function(e) {
        var columnSlots = $(e.currentTarget).children();
        console.log(columnSlots);
        $("#laser")[0].play();
        for (var i = 5; i >= 0; i--) {
            if (
                !columnSlots.eq(i).hasClass("Luke") &&
                !columnSlots.eq(i).hasClass("Stormtrooper")
            ) {
                columnSlots.eq(i).addClass(currentPlayer);
                break;
            }
        }

        if (i == -1) {
            alert("This column is full!");
        }



        if (checkVictory(columnSlots)) {
            $(".win-message").addClass("show-win-message");
            $(document.body).addClass("moveDart");
            $("#end-game-message").append("<h2>" + currentPlayer + ", you are the chosen one!</h2>");//columns win
        } else if (checkVictory($(".row" + i))) {
            $(".win-message").addClass("show-win-message");
            $(document.body).addClass("moveDart");
            $("#end-game-message").append("<h2>" + currentPlayer + ", you are the chosen one!</h2>");//if rows win
        } else if (checkDiagonal()) {
            $(".win-message").addClass("show-win-message");
            $(document.body).addClass("moveDart");
            $("#end-game-message").append("<h2>" + currentPlayer + ", you are the chosen one!</h2>");//diagonal wins
        } else switchPlayers();
    }); //end of click on column eventlistener


    //keeping track of the current player:
    function switchPlayers() {
        if (currentPlayer == "Luke") {
            currentPlayer = "Stormtrooper";
        } else {
            currentPlayer = "Luke";
        }
    } //function switchPlayers ends here


    //checking for a winner:
    function checkVictory(columnSlots) {
        var count = 0;
        for (var i = 0; i < columnSlots.length; i++) {
            if (columnSlots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    // console.log("The winner is " + currentPlayer)
                    return true;
                }
            } else {
                count = 0;
            }
        }
    } //closes the function checkVictory

    var diagonal = [
        [slots.eq(0), slots.eq(7), slots.eq(14), slots.eq(21)],
        [slots.eq(1), slots.eq(8), slots.eq(15), slots.eq(22)],
        [slots.eq(2), slots.eq(9), slots.eq(16), slots.eq(23)],
        [slots.eq(6), slots.eq(13), slots.eq(20), slots.eq(27)],
        [slots.eq(7), slots.eq(14), slots.eq(21), slots.eq(28)],
        [slots.eq(8), slots.eq(15), slots.eq(22), slots.eq(29)],
        [slots.eq(12), slots.eq(19), slots.eq(26), slots.eq(33)],
        [slots.eq(13), slots.eq(20), slots.eq(27), slots.eq(34)],
        [slots.eq(14), slots.eq(21), slots.eq(28), slots.eq(35)],
        [slots.eq(18), slots.eq(25), slots.eq(32), slots.eq(39)],
        [slots.eq(18), slots.eq(13), slots.eq(8), slots.eq(3)],
        [slots.eq(19), slots.eq(26), slots.eq(33), slots.eq(40)],
        [slots.eq(19), slots.eq(14), slots.eq(9), slots.eq(4)],
        [slots.eq(20), slots.eq(27), slots.eq(34), slots.eq(41)],
        [slots.eq(20), slots.eq(15), slots.eq(10), slots.eq(5)],
        [slots.eq(24), slots.eq(19), slots.eq(14), slots.eq(9)],
        [slots.eq(25), slots.eq(20), slots.eq(15), slots.eq(10)],
        [slots.eq(26), slots.eq(21), slots.eq(16), slots.eq(11)],
        [slots.eq(30), slots.eq(25), slots.eq(20), slots.eq(15)],
        [slots.eq(31), slots.eq(26), slots.eq(21), slots.eq(16)],
        [slots.eq(32), slots.eq(27), slots.eq(22), slots.eq(17)],
        [slots.eq(36), slots.eq(31), slots.eq(26), slots.eq(21)],
        [slots.eq(37), slots.eq(32), slots.eq(27), slots.eq(22)],
        [slots.eq(38), slots.eq(33), slots.eq(28), slots.eq(23)]
    ];

    function checkDiagonal() {
        for (var i = 0; i < diagonal.length; i++) {
            var winCombination = 0;
            for (var j = 0; j < diagonal[i].length; j++) {
                if (diagonal[i][j].hasClass(currentPlayer)) {
                    winCombination++;
                    if (winCombination == 4) {
                        return diagonal[i];
                    }
                } else {
                    winCombination = 0;
                }
            }
        }
    } //end of function checkDiagonal


////animation functions:
// function popUp() {
//     modalContainer.removeClass("hidden");
//     };

// setTimeout(popUp, 1500);

$("#yoda").on("click", function() {
    modalContainer.removeClass("hidden");
     $("#mainTheme")[0].play();
});

starWarsLogo.on("click", function() {
    modalContainer.addClass("hidden");
    $(".rules-container").removeClass("hidden");
}); //starWarsLogo.on

$(".rules-container").on("click", function() {
    $(".rules-container").addClass("hidden");
    $("#mainTheme")[0].pause();
    // $("#yoda-says").addClass("hide-yoda-says");
    $("#yoda-says").replaceWith("<h3>Powerful you <br>have become, <br>the dark side <br>I sense in you.</h3>");
});

$(".win-message").on("click", function(e){
    slots.removeClass("Luke");
    slots.removeClass("Stormtrooper");
    $("#dart").hide();
    $(".win-message").removeClass("show-win-message");
    e.stopPropagation();
})

})(); //end of the world
