let tweets = [];
if (localStorage.getItem('tweets')) {
    tweets = JSON.parse(localStorage.getItem('tweets'));
}
setInterval(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}, 3000);

tweets.concat().forEach(tweet => {
    post_tweet_feed(tweet);
})

function createTweet() {
    const tweet = {
        tweet: document.querySelector('#tweet').value.trim(),
        rt: 0,
        like: 0,
        id: tweets.length,
        liked: false,
    };
    if ( tweet.tweet.length > 0) {
        let div = document.createElement("div");
        div.innerHTML = tweet_body(tweet);
        document.querySelector('#news_feed').prepend(div);
        document.querySelector('#tweet').classList.remove('border-danger');
        tweets.push(tweet);
        document.querySelector('#tweet').value = '';

    } else {
        if (tweet.tweet.length < 1) {
            document.querySelector('#tweet').classList.add('border-danger');
        } else {
            document.querySelector('#tweet').classList.remove('border-danger');
        }
    }
}

function re_tweet(id) {
    const tweet = {
        tweet: tweets[id].tweet,
        rt: tweets[id].rt,
        like: tweets[id].like,
        id: tweets.length
    };
    if ( tweet.tweet.length > 0) {
        let div = document.createElement("div");
        div.innerHTML = tweet_body(tweet);
        document.querySelector('#news_feed').prepend(div);
        document.querySelector('#tweet').classList.remove('border-danger');
        tweets.push(tweet);
        document.querySelector('#tweet').value = '';

    } else {
        if (tweet.tweet.length < 1) {
            document.querySelector('#tweet').classList.add('border-danger');
        } else {
            document.querySelector('#tweet').classList.remove('border-danger');
        }
    }
}

function tweet_body(tweet) {
    return `
          <div class="w-100 shadow p-3 mb-2 tweet_ani overflow-hidden">
                 <hr class="w-100 border">
                <p class="w-100 text-break">${tweet.tweet}</p>
                  <hr class="w-100 border">
                <div class="w-100 d-flex justify-content-around">
                    <button id="${tweet.id}" onclick="like_tweet(this.id,this)"
                     class="btn btn-link">${tweet.like} like</button>
                    <button  onclick="re_tweet(${tweet.id})" class="btn btn-info">Retweet</button>
                </div>
                    <div id="id_${tweet.id}" class="d-none">
                    <hr class="w-100 border">
                        <div class="w-100 d-flex justify-content-between align-items-center">
                        </div>
                                <hr class="w-100 border">
                           <div id="cmt_bx_${tweet.id}" class="w-100">
                           </div>
                    </div>
            </div>`
}

function like_tweet(tweet_id, ele) {

    if (!tweets[tweet_id].liked) {
        tweets[tweet_id].like += 1;
        tweets[tweet_id].liked = true;
        ele.classList.add('text-info');
        ele.classList.remove('text-dark');
    } else {
        tweets[tweet_id].like -= 1;
        tweets[tweet_id].liked = false;
        ele.classList.add('text-dark');
        ele.classList.remove('text-info');
    }

    ele.innerHTML = `${tweets[tweet_id].like} like`;
    ele.classList.add('text-info');

}
