export const PASSWORD_LENGTH = 10;

export const regularExpressionPatterns = {
    emailPattern : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
    specialCharsPattern : /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    upCharsPattern : /[A-Z]/,
    lowCharsPattern : /[a-z]/,
    numbersPattern : /[0-9]/,
}