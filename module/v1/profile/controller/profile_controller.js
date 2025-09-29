import { profilemodule } from "../model/profile_model.js";

export const getprofile = (req, res) => {
  return profilemodule.get(req, res);
};

export const getcategory = (req, res) => {
  return profilemodule.getcategory(req, res);
};

export const getdoctor = (req, res) => {
  return profilemodule.doctor(req, res);
};
export const getdoctorid = (req, res) => {
  return profilemodule.docterid(req, res);
};
