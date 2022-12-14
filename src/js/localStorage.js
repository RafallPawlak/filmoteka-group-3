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
    let filmId = localStorage.getItem(key);
    return (filmId = JSON.parse(filmId) || undefined);
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
export async function textModalButtons(id) {
  const watchedButton = document.querySelector('.btn__watched');
  const queueButton = document.querySelector('.btn__queue');
  // checking if id is in the list
  if (localStorageCheck(id, 'watched')) {
    watchedButton.textContent = 'Remove from watched';
    watchedButton.classList.add('in-local-storage');
  } else {
    watchedButton.textContent = 'Add to watched';
    watchedButton.classList.remove('in-local-storage');
  }

  if (localStorageCheck(id, 'queue')) {
    queueButton.textContent = 'Remove from queue';
    queueButton.classList.add('in-local-storage');
  } else {
    queueButton.textContent = 'Add to queue';
    queueButton.classList.remove('in-local-storage');
  }
  function localStorageCheck(id, key) {
    let array = [];
    let existingArray = getKey(key);
    if (existingArray) {
      array = [...existingArray];
    }
    const listSet = new Set(array);
    return listSet.has(id);
  }
}

export async function changeWatchedQueueList(id) {
  try {
    const watchedButton = document.querySelector('.btn__watched');
    const queueButton = document.querySelector('.btn__queue');

    watchedButton.addEventListener('click', addToWatched);
    queueButton.addEventListener('click', addToQueue);
  } catch (error) {
    console.log(error);
  }
  // adding film ID to local storage key "watched"
  function addToWatched() {
    const watchedButton = document.querySelector('.btn__watched');
    if (watchedButton.classList.contains('in-local-storage')) {
      removeFromWatched(id);
    } else {
      let watchedList = [];
      let existingWatchedList = getKey('watched');
      if (existingWatchedList) {
        watchedList = [...existingWatchedList];
      }

      let queueList = [];
      let existingQueueList = getKey('queue');
      if (existingQueueList) {
        queueList = [...existingQueueList];
      }

      let queueSet = new Set(queueList);
      if (queueSet.has(id)) {
        removeKey('queue');
        let filmIndex = queueList.indexOf(id);
        queueList.splice(filmIndex, 1);
        saveKey('queue', queueList);
      }

      const watchedSet = new Set(watchedList);
      if (watchedSet.has(id)) {
        textModalButtons(id);
      } else {
        watchedList.push(id);
        saveKey('watched', watchedList);
        textModalButtons(id);
      }
    }
  }
  // adding film ID to local storage key "queue"
  function addToQueue() {
    const queueButton = document.querySelector('.btn__queue');
    if (queueButton.classList.contains('in-local-storage')) {
      removeFromQueue(id);
    } else {
      let queueList = [];
      let existingQueueList = getKey('queue');
      if (existingQueueList) {
        queueList = [...existingQueueList];
      }
      let watchedList = [];
      let existingWatchedList = getKey('watched');
      if (existingWatchedList) {
        watchedList = [...existingWatchedList];
      }

      let watchedSet = new Set(watchedList);
      if (watchedSet.has(id)) {
        removeKey('watched');
        let filmIndex = watchedList.indexOf(id);
        watchedList.splice(filmIndex, 1);
        saveKey('watched', watchedList);
        textModalButtons(id);
      }

      const queueSet = new Set(queueList);
      if (queueSet.has(id)) {
        textModalButtons(id);
      } else {
        queueList.push(id);
        saveKey('queue', queueList);
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
    let filmIndex = watchedList.indexOf(id);
    watchedList.splice(filmIndex, 1);
    saveKey('watched', watchedList);

    textModalButtons();
  }
  // removing film ID from local storage key "queue"
  function removeFromQueue(id) {
    let queueList = [];
    let existingQueueList = getKey('queue');
    if (existingQueueList) {
      queueList = [...existingQueueList];
    }
    removeKey('queue');
    let filmIndex = queueList.indexOf(id);
    queueList.splice(filmIndex, 1);
    saveKey('queue', queueList);
    textModalButtons();
  }
}

export { saveKey, getKey, removeKey };
