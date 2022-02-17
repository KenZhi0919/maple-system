import instance from "@/services/instance";
const url = "/login";

const getLogin = instance.get(url);

const login = {
  getLogin,
};

export default login;
