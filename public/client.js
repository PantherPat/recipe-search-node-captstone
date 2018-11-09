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

        //create the payload object (what data we send to the api call)
        const recipeObject = {
            searchInput: searchInput,
            loggedInUserName: loggedInUserName,
        };
        console.log(entryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/edamam/' + searchInput,
                dataType: 'json',
                data: JSON.stringify(entryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $(".sign-in-form").hide();
                $("#searchPage").show();
                $(".signUpForm").hide();
                $("#searchPageWrapper").show();
                //            $('section').hide();
                //            $('.navbar').show();
                //            $('#user-dashboard').show();
                //            $('#loggedInName').text(result.name);
                //            $('#loggedInUserName').val(result.username);
                //            $('#add-entry-container').hide();
                //            //                noEntries();
                //            //Add Entry to page
                //            $('#user-list').prepend(addEntryRenderHTML(result));
                //            $('html, body').animate({
                //                scrollTop: $(`#${result._id}`).offset().top
                //            }, 1000);

                //                $().scrollTop();

                //                updateEditFormValues(result);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };


});
