const BASE_URL = process.env.REACT_APP_BASE_URL
// const BASE_URL = "http://localhost:4000/api/v1"

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  ADDTASK_API: BASE_URL + "/auth/addtask",
  DELTASK_API: BASE_URL + "/auth/deltask",
  EDITTASK_API: BASE_URL + "/auth/edittask",
  FORGOTPASSWORD_API: BASE_URL + "/auth/forgotpassword",
}