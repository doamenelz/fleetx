export function validatePhoneNumber(phoneNumber: string) {
  const pattern = new RegExp(
    "^\\+[1-9]{1}[0-9]{0,2}-[2-9]{1}[0-9]{2}-[2-9]{1}[0-9]{2}-[0-9]{4}$"
  );

  if (pattern.test(phoneNumber)) {
    console.log("Phone number is valid");
    return true;
  } else {
    console.log("Phone number is not valid");
    return false;
  }
}

export const testWholeNumbers = (value: string) => {
  const re = /^[0-9\b]+$/;
  if (value === "" || re.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const emailRegex = (value: string) => {
  const reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   const reg = /^[0-9\b]+$/;
  if (value === "" || reg.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
