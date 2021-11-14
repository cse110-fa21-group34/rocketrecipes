window.addEventListener("DOMContentLoaded", init);

function init(){
    let testUrl = "https://google.com";
    let btn = document.getElementById('btn1')


    btn.addEventListener('click', () => {
        console.log("It's working");
        window.open("../html/generalAccount.html");
    })
}
