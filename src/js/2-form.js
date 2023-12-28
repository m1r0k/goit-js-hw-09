document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.feedback-form');

    function saveToLocalStorage() {
        const formData = {
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };
        localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    }

    form.addEventListener('input', saveToLocalStorage);

    const savedData = localStorage.getItem('feedback-form-state');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        form.email.value = parsedData.email;
        form.message.value = parsedData.message;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailValue = form.email.value.trim();
        const messageValue = form.message.value.trim();

        if (emailValue && messageValue) {
            console.log({ email: emailValue, message: messageValue });
            localStorage.removeItem('feedback-form-state');
            form.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
});