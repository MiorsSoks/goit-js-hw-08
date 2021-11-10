import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state"
const inputData = {}
const form = document.querySelector('.feedback-form')

function setItem(e) {
    e.preventDefault();
    inputData[e.target.name] = e.target.value;  
     localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(inputData));
    // const formData = new FormData(form);
    // formData.forEach((value, name) => console.log(value, name))
}

function populateForm() {
    let savedInput = localStorage.getItem(LOCALSTORAGE_KEY)
    if (savedInput) {
        savedInput = JSON.parse(savedInput)
        Object.entries(savedInput).forEach(([name, value]) => {
            form[name] = value;
            form.elements[name].value = value
        })
        
    }
}

function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(form);
    let objectInput = {}
    formData.forEach((value, name) => objectInput[name] = value)
    console.log(objectInput)
    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset()

}


populateForm()

form.addEventListener('input', throttle(setItem, 500))
form.addEventListener('submit', submitForm)
