const API_URL = 'http://localhost:3000/users';
// Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

function isNotEmpty(value) {
    return value.trim() !== '';
}

function isValidName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
}
// Alert Function
function showAlert(message, isSuccess = false) {
    const alertBox = document.getElementById('signup-alert');
    alertBox.textContent = message;
    alertBox.classList.remove('hidden');
    if (isSuccess) {
        alertBox.classList.remove('bg-red-100', 'border-red-400', 'text-red-700');
        alertBox.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
    } else {
        alertBox.classList.remove('bg-green-100', 'border-green-400', 'text-green-700');
        alertBox.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    }
}

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    let valid = true;

    if (!isNotEmpty(name)) {
        document.getElementById('signup-name-error').textContent = 'Name cannot be empty.';
        document.getElementById('signup-name-error').classList.remove('hidden');
        valid = false;
    } else if (!isValidName(name)) {
        document.getElementById('signup-name-error').textContent = 'Name should only contain letters and spaces.';
        document.getElementById('signup-name-error').classList.remove('hidden');
        valid = false;
    } else {
        document.getElementById('signup-name-error').classList.add('hidden');
    }

    if (!isValidEmail(email)) {
        document.getElementById('signup-email-error').textContent = 'Please enter a valid email address.';
        document.getElementById('signup-email-error').classList.remove('hidden');
        valid = false;
    } else {
        document.getElementById('signup-email-error').classList.add('hidden');
    }

    if (!isValidPassword(password)) {
        document.getElementById('signup-password-error').textContent = 'Password must be at least 8 characters long and contain at least one letter and one number.';
        document.getElementById('signup-password-error').classList.remove('hidden');
        valid = false;
    } else {
        document.getElementById('signup-password-error').classList.add('hidden');
    }

    if (!valid) return;
    const checkEmailXhr = new XMLHttpRequest();
    checkEmailXhr.open('GET', `${API_URL}?email=${email}`, true);
    checkEmailXhr.onreadystatechange = function () {
        if (checkEmailXhr.readyState === 4) {
            if (checkEmailXhr.status === 200) {
                const users = JSON.parse(checkEmailXhr.responseText);
                if (users.length > 0) {
                    showAlert('Email already exists. Please use a different email.');
                } else {

                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', API_URL, true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 201) {
                                const user = JSON.parse(xhr.responseText);
                                showAlert('Sign up successful!', true);
                                setTimeout(() => {
                                    window.location.href = './login.html';
                                }, 1500);
                            } else {
                                showAlert('Error during sign-up process.');
                            }
                        }
                    };
                    xhr.send(JSON.stringify({ name, email, password }));
                }
            }else{
                showAlert('Error checking email availability.');
            }
        }
    };
    
    checkEmailXhr.send();
                });

