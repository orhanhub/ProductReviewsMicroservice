const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validate = (form, component, categories) => {
  let errors = {};
  if (component === "question") {
    if (!form.question || form.question === "") errors.question = "question";
  }
  if (!form.answer || form.answer === "") {
    errors.answer = "answer";
  }
  if (!emailIsValid(form.email)) {
    {
      errors.email = "a valid email address";
    }
  }
  if (!form.name || form.name === "") {
    errors.name = "nickname";
  }

  return Object.keys(errors).length ? errors : false;
};
