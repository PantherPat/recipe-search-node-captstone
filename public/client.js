//define global functions, objects, and variables



//use global functions, objects, and variables (triggers)

//when the page loads...
$(document).ready(function () {
    $("main").hide();
    $(".signUpForm").hide();
    $("#signInPageWrapper").show();
    $("#searchPage").hide();


});

//button triggers
$(document).on('click', '.showRegister', function (event) {
    event.preventDefault();
    $("main").hide();
    $(".signUpForm").show();
    $("#signInPageWrapper").show();
    $("#signInPage").hide();
    $("#searchPage").hide();
});

$(document).on('click', '.showSignIn', function (event) {
    event.preventDefault();
    $("main").hide();
    $(".signUpForm").hide();
    $("#signInPageWrapper").show();
    $("#signInPage").show();
    $("#searchPage").hide();

});


//form trigger
$("#signInButton").click(function (event) {
    event.preventDefault();


    //take the input from the user
    const username = $("#signInPageUserName").val();
    const password = $("#signInPagePassword").val();

    //validate the input
    if (username == "") {
        alert('Please input user name');
    } else if (password == "") {
        alert('Please input password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const loginUserObject = {
            username: username,
            password: password
        };
        console.log(loginUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $(".sign-in-form").hide();
                $("#searchPage").show();
                $(".signUpForm").hide();
                $('#loggedInUserName').val(result.username);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$("#signUpButton").click(function (event) {
    event.preventDefault();

    //take the input from the user
    const name = $("#signUpPageFullName").val();
    const username = $("#signUpPageUserName").val();
    const password = $("#signUpPagePassword").val();
    const confirmPassword = $("#signUpPageConfirmPassword").val();

    //validate the input
    if (name == "") {
        alert('Please add a name');
    } else if (username == "") {
        alert('Please add an user name');
    } else if (password == "") {
        alert('Please add a password');
    } else if (confirmPassword != password) {
        alert("Passwords do not match")
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newUserObject = {
            name: name,
            username: username,
            password: password
        };
        //console.log(newUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $(".sign-in-form").hide();
                $("#searchPage").show();
                $(".signUpForm").hide();
                $('#loggedInUserName').val(result.username);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

function displayEdamamRecipes(result) {
    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";

    $.each(result.hits, function (resultKey, resultValue) {
        //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
        buildTheHtmlOutput +='<li class="result-items">';
        buildTheHtmlOutput +='<div class="result-item-image">';
        buildTheHtmlOutput +='<img src="images/blur-bowl-cherry-tomatoes-416537.jpg" alt="">';
        buildTheHtmlOutput +='</div>';
        buildTheHtmlOutput +='<div class="result-item-description">';
        buildTheHtmlOutput +='<h3>' + resultValue.recipe.label + '</h3>';//insert api information
        buildTheHtmlOutput +='<p class="recipe-description">';
        buildTheHtmlOutput +='Cherry tomatoe soup with garlic and sprouts. Excellent for a cold</p>';
        buildTheHtmlOutput +='<ul class="recipe-ingredients">';
        buildTheHtmlOutput +='<li>Tomato</li>';
        buildTheHtmlOutput +='<li>cherry</li>';
        buildTheHtmlOutput +='<li>Sprouts</li>';
        buildTheHtmlOutput +='</ul>';
        buildTheHtmlOutput +='<button class="details-button">Details</button>';
        buildTheHtmlOutput +='</div>';
        buildTheHtmlOutput +='</li>;';
    });

    //use the HTML output to show it in the index.html
    $(".results-page-wrapper").html(buildTheHtmlOutput);
}
$("#searchButton").click(function (event) {
    event.preventDefault();
    //take the input from the user
    const searchInput = $("#searchInput").val();
    const loggedInUserName = $("#loggedInUserName").val();

    //validate the input
    if (searchInput == "") {
        alert('Search by ingredients');
    }
    //if the input is valid
    else {


        //make the api call using the payload above
        $.ajax({
                type: 'GET',
                url: '/edamam/' + searchInput,
                dataType: 'json',
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $(".sign-in-form").hide();
                $("#searchPage").show();
                $(".signUpForm").hide();
                $("#searchPageWrapper").show();


                //                $().scrollTop();

                displayEdamamRecipes(result);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };


});
