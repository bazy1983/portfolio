var currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

let contactForm = document.getElementById("contact");

contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    let data = {
        [e.target[0].name]:e.target[0].value,
        [e.target[1].name]:e.target[1].value,
        [e.target[2].name]:e.target[2].value
    }

    fetch("/api/contact", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then((response) => {
        console.log(response)
        let responseBox = document.getElementById("response");
        responseBox.textContent = "Thank you for your message.. I'll get back to you soon"
        responseBox.classList.add("text-success")
    });
})