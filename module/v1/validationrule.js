export const validation = {
  singupvalidation: {
    name: "required|string",
    email: "required|email",
    phone: "required|string|min:8",
    password: "required|string|min:6",
    social: "required|string",
  },
  loginvalidation: {
    login_type: "required|string",

    n: {
      email: "required|email",
      password: "required|string|min:6",
    },
    s: {
      social_id: "required|string",
    },
  },
  favvalidation: {
    doctor_id: "required|string",
  },
  Appointment: {
    doctor_id: "required|integer",
    date: "required|date",
    time: "required",
  },
};
