$(document).ready(function(){
    //click to add new project
    $("#submit").on("click", function(e){
        e.preventDefault();
        let newProject = {
            headline : $("#addHeadline").val().trim(),
            desc : $("#addDesc").val().trim(),
            githubLink : $("#addGithub").val().trim(),
            herokuLink : $("#addHeroku").val().trim()
        }
        //check for empty entries
        if (newProject.headline && newProject.desc){
            console.log(newProject)
            $.post("/api/addProject", newProject, function(data){
                console.log(data)
            })
        }
    })
    
})