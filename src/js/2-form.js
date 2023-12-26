const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

const myLocalStorage = {
    get: (key, json = false) => {
        const data = localStorage.getItem(key);

        if (!json) return data;

        try {
            return JSON.parse(data);
        } catch (e) {
            console.error(e);
        }
    },
    set: (key, data, json = false) => {
        localStorage.setItem(key, json ? JSON.stringify(data) : data);
    },
    remove: (key) => {
        localStorage.removeItem(key)
    }
}

const initialFormData = myLocalStorage.get(STORAGE_KEY, true);

Array.from(form.elements).forEach(element => {
    const storageValue = initialFormData[element.name];
    if (storageValue) {
        element.value = storageValue.trim();
    }
})


form.addEventListener("input", () => {
    const formData = new FormData(form);

    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value.trim();
    })

    myLocalStorage.set(STORAGE_KEY, formObject, true)
});


form.addEventListener("submit", (event) => {
    event.preventDefault();
    myLocalStorage.remove(STORAGE_KEY);

    form.reset();
});