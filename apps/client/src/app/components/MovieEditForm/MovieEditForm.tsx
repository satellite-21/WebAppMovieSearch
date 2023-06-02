/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormErrors, useForm } from '../../hooks/useForm.hook';
import validateMovieCreation from './MovieFormValidationRules';
import styles from './MovieEditForm.module.scss';
import genericStyles from '../../generic-styles.module.scss';
import { Movie } from '@types';
import { IoClose } from 'react-icons/io5';
import { useEffect } from 'react';
import DynamicEditForm from '../DynamicEditForm/DynamicEditForm';
import { showNotification } from '../../misc/showNotification';
import { toSentenceCase } from '../../misc/stringUtils';

//this component will receive the following type of props 
//such as movie, visible, setVisible, and submitForm.
interface MovieEditFormProps {
  movie?: Movie;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  submitForm: (values: any, id: string) => Promise<any>;
}

// TODO: refactor this component

const MovieEditForm = ({
  visible,
  setVisible,
  movie,
  submitForm,
}: MovieEditFormProps) => {
  const { values, handleChange, handleSubmit, errors, setErrors, setValues } = 
    useForm(submit, validateMovieCreation); 
  const handleCloseModal = () => { //this is responsible for closing the modal and resetting form errors and values
    setVisible(false);
    setErrors({});
    setValues({} as Movie);
  };
  const ignoredKeys = ['_id', 'objectID']; 

  useEffect(() => {
    if (movie && visible) setValues(movie);     //useEffect hook is used to update the form values with the movie prop when it changes.
  }, [movie, visible, setValues]);

  async function submit(): Promise<any> {
    if (!values.title) return;
    return submitForm(values, values._id).then((res) => {  // submitForm function passed as a prop
      if (visible && res.status < 400) { // If the response status is less than 400, it hides the form by setting setVisible to false.
        setVisible(false);
      }
      return res;
    });
  }

  const handleDynamicInput = (name: string, newValues: string[]) => {
    setValues({ ...values, [name]: newValues });
  };

  function renderErrors(errors: FormErrors<Movie>, key: string) {
    return ( 
      <>
        {(errors as any)[key].split(',').map((msg: string) => (
          <p className={styles.formInfo}>{msg}</p> //The renderErrors function is responsible for rendering error messages based on the errors object.
        ))}
      </>
    );
  }


  // The component renders a form with input fields and dynamic edit forms based on the values object. 
  // It maps over the keys of values and conditionally renders input fields or dynamic forms based on the data type.
  return ( 
    <div
      className={styles.movieEditFormContainer}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div
        className={styles.movieEditFormBackground}
        onClick={handleCloseModal}
      ></div>
      <div className={styles.formContainer}>
        <IoClose
          className={styles.movieEditCloseButton}
          onClick={handleCloseModal}
        />
        <form id='submit-movie' className={styles.editForm} noValidate>
          <div className={`${styles.modalForm}`}>
            {Object.keys(values).map((key) => (
              <>
                {!Array.isArray((values as any)[key]) &&
                  !ignoredKeys.includes(key) && (
                    <div key={key}>
                      <label>{toSentenceCase(key)}</label>
                      <div>
                        <input
                          className={`${genericStyles.inputBar} ${
                            (errors as any)[key] && styles.inputError
                          }`}
                          name={key}
                          onChange={handleChange}
                          value={(values as any)[key] || ''}
                          required
                        />
                      </div>
                      {(errors as any)[key] && renderErrors(errors, key)}
                    </div>
                  )}
              </>
            ))}
          </div>
          <div className={`${styles.modalForm}`}>
            {Object.keys(values).map((key) => (
              <>
                {Array.isArray((values as any)[key]) && (
                  <div key={key}>
                    <label>{toSentenceCase(key)}</label>
                    <div>
                      <DynamicEditForm
                        values={(values as any)[key]}
                        handleDynamicInput={handleDynamicInput}
                        name={key}
                      />
                      {(errors as any)[key] && renderErrors(errors, key)}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </form>
      </div>
      <button
        type='submit'
        form='submit-movie'
        onClick={handleSubmit}
        className={`${styles.formSubmitButton} ${genericStyles.button}`}
      >
        Submit
      </button>
    </div>
  );
};

export default MovieEditForm;
