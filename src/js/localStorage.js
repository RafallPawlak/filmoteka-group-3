// Saving value to the key in local storage
const saveKey = (key, value) => {
    try {
        const filmId = JSON.stringify(value);
        localStorage.setItem(key, filmId);
    } catch (error) {
        console.log(error);
    }
};
// Getting key and his value from local storage
const getKey = key => {
    try {
        let filmIds = localStorage.getItem(key);
        return (filmId = JSON.parse(filmIds));
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

// changing text in modal buttons depending on their assignment to local storage key
async function textModalButtons(id) {
    const watchedButton = document.querySelector(".klasaOpisujacaPrzyciskWatchedWModalu");
    const queueButton = document.querySelector(".klasaOpisujacaPrzyciskQueueWModalu");
    // checking if id is in the list
    function localStorageCheck(id, key) {
        let array = [];
        let existingArray = getKey(key);
        if (existingArray) {
            array = [...existingArray]
        }
        const listSet = new Set(array);
        return listSet.has(id);
    }
    
    if (!localStorageCheck(id, 'watched')) {
        watchedButton.textContent = 'Add to watched';
        watchedButton.classList.remove('in-local-storage');
    } else {
        watchedButton.textContent = 'Remove from watched';
        watchedButton.classList.add('in-local-storage');
    }
    
    if (!localStorageCheck(id, 'queue')) {
        queueButton.textContent = 'Add to queue';
        queueButton.classList.remove('in-local-storage');
    } else {
        queueButton.textContent = 'Remove from queue';
        queueButton.classList.add('in-local-storage');
    }
}

async function changeWatchedQueueList(id) {
    try {
        // const movieID = await funkcjaWyszukującaFilmPoId(id);
        // funkcjaTworzacaModal(movieID);

        const watchedButton = document.querySelector(".klasaOpisujacaPrzyciskWatchedWModalu");
        const queueButton = document.querySelector(".klasaOpisujacaPrzyciskQueueWModalu");

        watchedButton.addEventListener("click", addToWatched);
        queueButton.addEventListener("click", addToQueue);
    } catch (error) {
        console.log(error);
    }
    // adding film ID to local storage key "watched"
    function addToWatched() {
        const watchedButton = document.querySelector(".klasaOpisujacaPrzyciskWatchedWModalu");
        if (!watchedButton.classList.contains('in-local-storage')) {
            removeFromWatched(id);
        } else {
            let watchedList = [];
            let existingWatchedList = getKey('watched');
            if (existingWatchedList) {
                watchedList = [...existingWatchedList];
            }

            let queueList = [];
            let existingQueueList = getKey('queue');
            if (existingWatchedList) {
                queueList = [...existingQueueList];
            }
        
            const watchedSet = new Set(watchedList);
            if (watchedSet.has(id)) {
                textModalButtons(id);
            } else { 
                watchedList.push(id);
                saveKey('watched', watchedList);
                textModalButtons(id);
            }

            let queueSet = new Set(queueList);
            if (queueSet.has(id)) {
                removeKey('queue');
                let filmIndex = queueList.idIndexOf(id);
                queueList.splice(filmIndex, 1);
                saveKey('queue', queueList);
            }
        }
    }
    // adding film ID to local storage key "queue"
    function addToQueue() {
        const queueButton = document.querySelector(".klasaOpisujacaPrzyciskQueueWModalu");
        if (queueButton.classList.contains('active')) {
            removeFromQueue(id);
        } else {
            let queuedList = [];
            let existingQueueList = getKey('queue');
            if (existingQueueList) {
                queuedList = [...existingQueueList];
            }
            let watchedList = [];
            let existingWatchedList = getKey('watched');
            if (existingWatchedList) {
                watchedList = [...existingWatchedList];
            }            

            let watchedSet = new Set(watchedList);
            if (watchedSet.has(id)) {
                removeKey('watched');
                let filmIndex = watchedList.idIndexOf(id);
                watchedList.splice(filmIndex, 1);
                saveKey('watched', watchedList);
                textModalButtons(id);
            }

            const queueSet = new Set(queueList);
            if (queueSet.has(id)) {
                textModalButtons(id);
            } else {
                queueList.push(id);
                saveKey('queue', queuedList);
                textModalButtons(id);
            }
        }
    }
    // removing film ID from local storage key "watched"
    function removeFromWatched(id) {
        let watchedList = [];
        let existingWatchedList = getKey('watched');
        if (existingWatchedList) {
            watchedList = [...existingWatchedList];
        }
        removeKey('watched');
        let filmIndex = watchedList.idIndexOf(id);
        watchedList.splice(filmIndex, 1);
        saveKey('watched', watchedList);
        textModalButtons();
    }
    // removing film ID from local storage key "queue"
    function removeFromQueue(id) {
        let queueList = [];
        let existingQueueList = getKey('queue');
        if (existingWatchedList) {
            queueList = [...existingQueueList];
        }
        removeKey('queue');
        let filmIndex = queueList.idIndexOf(id);
        queueList.splice(filmIndex, 1);
        saveKey('queue', queueList);
        textModalButtons();
    }
}
