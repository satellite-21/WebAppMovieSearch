  import { useState, useEffect } from 'react';
  import { showNotification } from '../misc/showNotification';

// this is a custom hook `useForm` and is used to handle form related functionality in this project


// here we define a type called `FormErrors<T>` which represents the erros associated with the form fields 
// it is a partial object with keys corresponding to the properties of type `T` and the values of type `string` 
  export type FormErrors<T> = Partial<{ [Property in keyof T]: string }>;


  //this is defined as a generic function that takes two parameters:
  export const useForm = <T>(


    callback: () => Promise<Response>, //this should be executed when the form is submitted , it returns a promise that should resolve to a response object
    validate: (values: T) => FormErrors<T> //validate: A function that validates the form values and returns the errors associated with the form fields.
  ) => {

    // here we  declare several state variables 
    const [values, setValues] = useState({} as T);             //values is initialized as an empty object of type T and represents the form values.

    const [errors, setErrors] = useState({} as FormErrors<T>);  //errors is initialized as an empty object of type FormErrors<T> and represents the form field errors.
    const [isSubmitting, setIsSubmitting] = useState(false); //isSubmitting is initialized as false and represents the submission state of the form.

    //this hook watch for the changes in the `errors` state variable 
    useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) { //this checks if there are no errors and and the form is isSubmitting 
        callback() // a callback function is executed , main purpose of this code is likely to perform some action after the form has been submitted and if there are no errors 
          .then((res) => {
            if (res?.status < 400) {
              showNotification('success', 'Success');
            }
            return res?.json();
          })
          .then((data) => {
            if (data?.statusCode === 400) {
              const requestErrors = parseBadRequestErrors<T>(values, data);
              setErrors({ ...errors, ...requestErrors });
            }
            if (data?.code) {
              showNotification('danger', data?.message);
            }
          })
          .catch((err) => {
            showNotification('danger', err?.message);
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [errors]);
// ------------------------------------------------------------------------------------------------------------------------------

    const handleSubmit = (
      event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
    ) => {
      if (event) event.preventDefault(); 
      setIsSubmitting(true); // prevents the default form submission behavior, sets isSubmitting to true
      setErrors(validate(values)); //calls the validate function to validate the form values and update the errors state.
    };

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      event.persist();
      setValues((values: T) => ({
        ...values, // updates the values state by spreading the existing values and updating the specific property corresponding to the input's name attribute with the input's value.
        [event.target.name]: event.target.value, 
      }));
    };

    // Finally, the hook returns an object containing the following properties and functions, which can be used in the component that invokes the useForm hook:

// handleChange: A function to handle input changes.
// handleSubmit: A function to handle form submission.
// values: The current form values.
// errors: The current form field errors.
// setErrors: A function to update the form field errors.
// setValues: A function to update the form values.

    return {
      handleChange,
      handleSubmit,
      values,
      errors,
      setErrors,
      setValues,
    };
  };


  // aa utility function used to parse specific errors received from a server reponse 
// It takes the form values (values) and the server response data as arguments, and 
// returns the errors associated with the form fields based on the received data.

  function parseBadRequestErrors<T>(values: T, data: any): FormErrors<T> {
    const valueKeys = Object.keys(values);
    let requestErrors = {};
    valueKeys.forEach((key) => {
      if (data?.message) {
        const filteredErrors = data.message.filter((m: string) =>
          m.includes(key)
        );
        if (filteredErrors.length) {
          requestErrors = {
            ...requestErrors,
            [key]: filteredErrors.join(),
          };
        }
      }
    });
    return requestErrors;
  }


  // to use the `useForm` hook in react component in react. you would do that like this:
//   import { useForm } from './useForm';

// const MyFormComponent = () => {
//   const { handleChange, handleSubmit, values, errors } = useForm(
//     submitCallback,
//     validateFunction
//   );

//   const submitCallback = () => {
//     // Code to handle form