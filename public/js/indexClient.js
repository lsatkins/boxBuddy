let postContainer = document.querySelector('.postContainer');
let userID = postContainer.id;
let whiteHeart = document.querySelector('.whiteHeart');
let redHeart = document.querySelector('.redHeart');

postContainer.addEventListener('click', async (e) => {

    if(e.target.className.includes('whiteHeart')){

        let postID = e.target.id;
        console.log(postID);

        let data = {
            userID,
            postID
        }
        console.log(data);

        let results = await fetch('/likes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})

    }
    
})

