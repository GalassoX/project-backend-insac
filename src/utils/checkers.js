function isValidEmail(email) {
    return email
        && email.includes('@')
        && email.includes('.');
}

function isValidNumber(number) {
    return number && !isNaN(number);
}

module.exports = { isValidEmail, isValidNumber };