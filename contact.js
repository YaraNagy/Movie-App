
const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const email = document.getElementById("email");
const phoneNo = document.getElementById("phone-no");
const msg = document.getElementById("msg");
const subBtn = document.getElementById("sub-btn");

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isNotEmpty(value) {
    return value.trim() !== '';
}

function isValidPhoneNo(num) {
    const phoneNoRegex = /^01[0125][0-9]{8}$/;
    return phoneNoRegex.test(num);
}

document.getElementById("contact-from").addEventListener("submit", function(e) {
    e.preventDefault();
    let emailValue = email.value;
    let fNameValue = fName.value;
    let lNameValue = lName.value;
    let phoneNoValue = phoneNo.value;
    let msgValue = msg.value;

    // check email validation
    if(!isValidEmail(emailValue)) {
        document.getElementById('contact-email-error').classList.remove('hidden');
        document.getElementById('contact-email-error').classList.add('inline-block');
        email.classList.add("border-red-600");
    }
    else {
        document.getElementById('contact-email-error').classList.add('hidden');
        document.getElementById('contact-email-error').classList.remove('inline-block');
        email.classList.remove("border-red-600");
    }

    // check first name is not empty
    if(!isNotEmpty(fNameValue)) {
        document.getElementById("contact-fname-error").classList.remove('hidden');
        document.getElementById("contact-fname-error").classList.add('inline-block');
        fName.classList.add("border-red-600");
    }
    else {
        document.getElementById("contact-fname-error").classList.add('hidden');
        document.getElementById("contact-fname-error").classList.remove('inline-block');
        fName.classList.remove("border-red-600");
    }

    // check last name is not empty
    if(!isNotEmpty(lNameValue)) {
        document.getElementById("contact-lname-error").classList.remove('hidden');
        document.getElementById("contact-lname-error").classList.add('inline-block');
        lName.classList.add("border-red-600");
    }
    else {
        document.getElementById("contact-lname-error").classList.add('hidden');
        document.getElementById("contact-lname-error").classList.remove('inline-block');
        lName.classList.remove("border-red-600");
    }

    // check message is not empty
    if(!isNotEmpty(msgValue)) {
        document.getElementById("contact-msg-error").classList.remove('hidden');
        msg.classList.add("border-red-600");
    }
    else {
        document.getElementById("contact-msg-error").classList.add('hidden');
        msg.classList.remove("border-red-600");
    }

    // check phone number validation
    if(!isValidPhoneNo(phoneNoValue)) {
        document.getElementById("contact-phone-error").classList.remove('hidden');
        document.getElementById("contact-phone-error").classList.add('inline-block');
        phoneNo.classList.add("border-red-600");
    }
    else {
        document.getElementById("contact-phone-error").classList.add('hidden');
        document.getElementById("contact-phone-error").classList.remove('inline-block');
        phoneNo.classList.remove("border-red-600");
    }
})
