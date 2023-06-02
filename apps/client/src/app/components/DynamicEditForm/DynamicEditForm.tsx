import { useState } from 'react';
import styles from './DynamicEditForm.module.scss';
import { IoClose, IoAdd } from 'react-icons/io5';
import genericStyles from '../../generic-styles.module.scss';


// this is a blueprint which specifies the expected props for the dynamicEditForm Component 
interface DynamicEditFormProps {
  name: string; //string representing the name of the form 
  values: string[]; // an array of strings representing the initial values of the form inputs 
  handleDynamicInput: (name: string, newValues: string[]) => void; //a funtion that takes the name and newValues as arguments and handles changes to the form inputs
  className?: string;  //className (optional): a string representing additional CSS class names for styling purposes
}


const DynamicEditForm = ({
  name,
  values,
  className,
  handleDynamicInput,
}: DynamicEditFormProps) => { 
// -----------------------------------------------------------------------function defined-------------------------------------------
  const handleFormChange = ( 
    //this function handleFormChange handles the change of event of an input field ,
    // takes index of the input field and the event objects as parameters, updates the corresponding value in the `values` array
    // calls the `handleDynamicInput` function to update the values in the parent component 
    idx: number,
    event: React.ChangeEvent<HTMLInputElement> 
  ) => {
    event.persist();
    const newValues = [...values];
    newValues.splice(idx, 1, event.target.value);
    handleDynamicInput(name, [...newValues]);
  };
// -----------------------------------------------------------------------function defined-------------------------------------------
  const handleAddFields = (
// this handles the click event of the "Add More " button , 
// prevents the default behaviour of the button
// calls the `handleDynamicInput` function to add an empty value to the `values` array
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    handleDynamicInput(name, [...values, '']);
  };
// -----------------------------------------------------------------------function defined-------------------------------------------
  const handleRemoveFields = (
// handles click event of "remove" button
// finds index of the input field to be removed 
// upadtes the value array 
// and calls the handleDynamicInput
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    field: string
  ) => {
    e.preventDefault();
    const index = values.indexOf(field);
    const newValues = [...values];
    newValues.splice(index, 1);
    handleDynamicInput(name, [...newValues]);
  };

  // defines the structyure and rendering of the dynamic form 
  return (
    <div className={`${styles.dynamicFormContainer} ${className || ''}`}>
      {values.map((input, index) => {
        return (
          <div className={styles.dynamicFormInputContainer} key={index}>
            <input
              className={genericStyles.inputBar}
              name={index.toString()}
              placeholder='Enter Value'
              value={input}
              onChange={(event) => handleFormChange(index, event)}
            />
            <button
              className={styles.dynamicFormRemoveButton}
              onClick={(e) => handleRemoveFields(e, input)}
            >
              <IoClose />
            </button>
          </div>
        );
      })}
      <button onClick={handleAddFields} className={styles.dynamicFormAddButton}>
        <span>Add More</span>
        <IoAdd />
      </button>
    </div>
  );
};

export default DynamicEditForm;


// the DynamicEditForm component provides a dynamic form where users can add or remove input fields and edit the values. 
// It utilizes the handleDynamicInput function from its props to manage the state and communicate changes to the parent component.