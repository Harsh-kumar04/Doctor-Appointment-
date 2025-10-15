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

  docter_reg: {
    first_name: "required|string|min:2|max:50",
    last_name: "required|string|min:2|max:50",
    password: "required|string|min:6",
    phone: "required|string|regex:/^[0-9]{10,15}$/",
    experience: "required",
    state_medical_council: "required|string|min:2|max:100",
    year_of_graduation: "required|integer",
    main_speciality: "required|integer",
    multiple_speciality: "array",
  },

  verifyemail: {
    email: "required|email",
    otp: "required|string|length:6",
  },
  docter_signup: {
    email: "required|email",
  },
  add_basic_clinic: {
    clinic_name: "required|string|min:2|max:100",
    speciality: "required|integer|min:2|max:100",
  },
  address: {
    address: "required|string",
    pincode: "required|integer",
  },
  state: {
    stateId: "required|integer",
  },
};
