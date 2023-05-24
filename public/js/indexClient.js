let postContainer = document.querySelector('.postContainer');

let diplayPosts = async () => {
    let 
}

postContainer.addEventListener('click', async (e) => {

    if(e.target.className.includes('whiteHeart')){

        let postID = e.target.id;
        let likesAndComments = e.target.parentElement.parentElement;
        let liked = likesAndComments.querySelector('.liked');
        let unLiked = likesAndComments.querySelector('.unLiked');
        let redHeart = likesAndComments.querySelector('.redHeart');
        let redCount = likesAndComments.querySelector('.redCount');
        let whiteHeart = likesAndComments.querySelector('.whiteHeart');
        let whiteCount = likesAndComments.querySelector('.whiteCount');
        console.log(likesAndComments, 'test');

        let data = {
            postID: postID
        }

        let results = await fetch('/likes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})

        let response = await results.json();

        
        unLiked.style.display = 'none';
        liked.style.display = 'inline-flex';
        
        // whiteHeart.style.display = 'none';
        // whiteCount.style.display = 'none';
        // redHeart.style.display = 'inline';
        // redCount.style.display = 'inline';
        // console.log(redHeart);

        console.log('response',response);
        console.log(response.thisLikeID);
        liked.id = response.thisLikeID;
        console.log('count', Number(redCount.innerText));
        let numberCount = Number(redCount.innerText);
        console.log(numberCount);
        numberCount ++;
        console.log(numberCount);
        redCount.innerText = numberCount;

    }
    if(e.target.className.includes('redHeart')){

        let postID = e.target.id;
        let likesAndComments = e.target.parentElement.parentElement;
        let liked = likesAndComments.querySelector('.liked');
        let unLiked = likesAndComments.querySelector('.unLiked');
        let redHeart = likesAndComments.querySelector('.redHeart');
        let redCount = likesAndComments.querySelector('.redCount');
        let whiteHeart = likesAndComments.querySelector('.whiteHeart');
        let whiteCount = likesAndComments.querySelector('.whiteCount');
        let id = liked.id;
        console.log(likesAndComments, 'test');

        let data = {
            id
        }

        let results = await fetch('/likes', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})

        let response = await results.json();
        console.log('response', response);

        unLiked.style.display = 'inline-flex';
        liked.style.display = 'none';
        let numberCount = Number(redCount.innerText);
        console.log(numberCount);
        console.log(redCount.innerText);
        numberCount --;
        console.log(numberCount);
        console.log(redCount.innerText);

        redCount.innerText = numberCount;
        whiteCount.innerText = numberCount;
        // whiteHeart.style.display = 'inline';
        // whiteCount.style.display = 'inline';
        // redHeart.style.display = 'none';
        // redCount.style.display = 'none';

    }
    
})

