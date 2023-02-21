const getRandomUser = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const randomUser = await response.json(); //extract JSON from the http response
    console.log(randomUser)
    return randomUser
}

document.addEventListener("DOMContentLoaded", function(){
    //getRandomUser()
});
