const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

/*disables button while joke is playing*/
function toggleButton() {
    button.disabled = !button.disabled;
}

/*passing joke to voiceRSS API*/
function tellMe(joke) {
    VoiceRSS.speech({
        key: '616016e223294e8896a94a5615869097',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

/*get jokes from jokes api*/
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        /*text-to-speech*/
        tellMe(joke);
        /*disables joke button*/
        toggleButton();
    } catch (error) {
        /*catch errors*/
        console.log('this is error', error);
    }
}

/*event listeners*/
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);