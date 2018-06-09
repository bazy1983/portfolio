$(document).ready(function () {

    $("#project").on("submit", function (e) {
        e.preventDefault();
        let headline = $("#addHeadline").val().trim(),
            desc = $("#addDesc").val().trim(),
            githubLink = $("#addGithub").val().trim(),
            herokuLink = $("#addHeroku").val().trim();
        console.log(headline, desc, githubLink, herokuLink)
        let method = $(this).attr("method");
        let url = $(this).attr("action");
        let data = new FormData(this);
        data.append("headline", headline);
        data.append("desc", desc);
        data.append("githubLink", githubLink);
        data.append("herokuLink", herokuLink);
        $.ajax({
            url: url,
            type: method,
            data: data,
            contentType: false,
            cache: false,
            processData: false
        })
            .done(function () {
                console.log("all good!")
            })
    })



})