// Saving value to the key in local storage
const saveKey = (key, value) => {
    try {
        const filmId = JSON.stringify(value);
        localStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
};
// Getting key and his value from local storage
const getKey = key => {
    try {
        let filmId = localStorage.getItem(key);
        return (filmId = JSON.parse(filmId));
    } catch (error) {
        console.log(error);
    }
};
// Removing the key in local storage
const removeKey = key => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
};

async function changeWatchedQueueList(event) {
    try {
        const movieID = await funkcjaWyszukującaFilmPoJegoId(id);
        funkcjaTworzacaModal(movieID);

        const watchedButton = document.querySelector(".klasaOpisujacaPrzyciskWatchedWModalu");
        const queueButton = document.querySelector(".klasaOpisujacaPrzyciskQueueWModalu");

        watchedButton.addEventListener("click",);
        queueButton.addEventListener("click",);
    } catch (error) {
    console.log(error);
    }
    function addToWatched() {
    let watchedList = [];
    let existingWatchedList = load(watched);
    watchedList = [...existingWatchedList];

    let queueList = [];
    let existingQueueList = load(queue);
    queueList = [...existingQueueList];
    }

    const watchedSet = new Set(watchedList);
    watchedList.push(id);
    if (!watchedSet.has(id)) {
        saveKey('watched', watchedList)
    }

    let queueSet = new Set(queueList);
    
}
