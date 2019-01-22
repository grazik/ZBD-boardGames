const config = {
    loginConfig: {
        formInputClass: 'content-form_input',
        formSignInClass: 'content-form_signIn',
        createAccount: 'jsCreateAccount',
        loginUrl: '/login',
        contentClass: 'content',
        removingClass: 'removing',
        errorMsg: {
            class: 'errorMsg',
            closeClass: 'errorMsg-close',
            content: `<div class="errorMsg">
        <p class="errorMsg-text">Incorrect username or password.</p>
        <span class="errorMsg-close">X</span>
        </div>`,
        },
    },
};

export default config;