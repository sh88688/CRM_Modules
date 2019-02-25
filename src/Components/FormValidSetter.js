import checkValidity from "./FieldValidator";
const isFormValid = jsonform => {
  let formIsValid = true;
  let form = { ...jsonform };

  for (let key in form) {
    let getValidity = checkValidity(form[key].value, form[key].validation);
    form[key].valid = getValidity.isValid;
    form[key].elementConfig.helperText = getValidity.errorText;
    form[key].touched = true;
    formIsValid = form[key].valid && formIsValid;
    console.log("element", form[key].valid, "now form ", formIsValid);
  }
  return { formValidity: formIsValid, validatedForm: form };
};
export default isFormValid;
