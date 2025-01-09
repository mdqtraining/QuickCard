export const startUrl = `/`;

const commonApi = "https://mdqualityapps.in/API/quickcard/";

export const methodGet = "GET";
export const methodPost = "post";

const send_otp = `${commonApi}send_otp`;

const validate_otp = `${commonApi}validate_otp`;

const user_signup = `${commonApi}user_signup`;

const user_signin = `${commonApi}user_signin`;

const forgot_password = `${commonApi}forgot_password`;

const forgot_pwd_otp = `${commonApi}forgot_pwd_otp`;

export { send_otp, validate_otp, user_signup };
