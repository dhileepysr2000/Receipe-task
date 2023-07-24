import { useRef } from 'react';
import "./User.css";
import * as Yup from 'yup';

const Checkout = (props) => {
    const schema = Yup.object().shape({
        name: Yup.string().required('Please enter a valid name.'),
        street: Yup.string().required('Please enter a valid street.'),
        pincode: Yup.string().length(6, 'Enter a valid postal code (5 characters long).').required('Please enter a valid postal code.'),
        city: Yup.string().required('Please enter a valid city.'),
      });
      
        const nameInputRef = useRef();
        const streetInputRef = useRef();
        const pincodeInputRef = useRef();
        const cityInputRef = useRef();
      
        const confirmHandler = async (event) => {
          event.preventDefault();
      
          try {
            const formData = {
              name: nameInputRef.current.value,
              street: streetInputRef.current.value,
              pincode: pincodeInputRef.current.value,
              city: cityInputRef.current.value,
            };
      
            await schema.validate(formData, { abortEarly: false });
            props.onConfirm(formData);
          } catch (error) {
            const validationErrors = {};
            error.inner.forEach((err) => {
              validationErrors[err.path] = err.message;
            });
            console.log(validationErrors);
          }
        };
      
    return (
        <form className="userform" onSubmit={confirmHandler}>
        <div className="usercontrol">
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
  
        <div className="usercontrol">
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef} />
        </div>
  
        <div className="usercontrol">
          <label htmlFor='pincode'>Pin Code</label>
          <input type='text' id='pincode' ref={pincodeInputRef} />
        </div>
  
        <div className="usercontrol">
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef} />
        </div>
  
        <div className="useractions">
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className="submit">Confirm</button>
        </div>
      </form>
    );
  };

export default Checkout;