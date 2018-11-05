//define global functions, objects, and variables



//use global functions, objects, and variables (triggers)

//when the page loads...
$(document).ready(function () {
    $("main").hide();
    $(".signUpForm").hide();
    $("#signInPageWrapper").show();


});

//button triggers
$(document).on('click', '.showRegister', function (event) {
    event.preventDefault();
    $("main").hide();
    $(".signUpForm").show();
    $("#signInPageWrapper").show();
    $("#signInPage").hide();
});

$(document).on('click', '.showSignIn', function (event) {
    event.preventDefault();
    $("main").hide();
    $(".signUpForm").hide();
    $("#signInPageWrapper").show();
    $("#signInPage").show();
});


//form trigger
$(document).submit('.sign-in-form', function (event) {
    event.preventDefault();
    $("main").hide();
    $(".signUpForm").hide();
    $("#searchPage").show();

});

$(document).submit('.signUpForm', function (event) {
    event.preventDefault();
    $("main").hide();
    $(".sign-in-form").hide();
    $(".signUpForm").show();
});
