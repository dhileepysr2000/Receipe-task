import { useState } from 'react'
import Modal from '../ui/Model';
import "./Card.css"
import CartContext from '../../store/CartContext';
import { useContext } from 'react';
import CartItem from './CardItems';
import User from '../user/User';
import { trpc } from '../..';

export default function Card(props) {

    const [isOut, setIsOut] = useState(false);
    const [isIn, setIsIn] = useState(false);
    const [submit, setSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
  
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
  
    const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
      cartCtx.addItem({ ...item, amount: 1 });
    };
  
    const orderHandler = () => {
      setIsOut(true);
    };
  
    const submitOrderHandler = async (userData) => {
      setIsIn(true);
    
      try {
        const orderData = {
          name: userData.name,
          street: userData.street,
          pincode: userData.pincode,
          city: userData.city,
        };
    
        await trpc.order.createOrder.mutate(orderData);
    
        setIsIn(false);
        setSubmit(true);
        cartCtx.clearCart();
      } catch (error) {
        console.error(error);
      }
      
    };
  
    const cartItems = (
      <ul className='cart-items'>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </ul>
    );
  
    const modalActions = (
      <div className="actions">
        <button className='button--alt' onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className="button" onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    );
  
    const cartModalContent = (
      <>
        {!isOut ? (
          <>
            {cartItems}
            <div className="total">
              <span>Total Amount</span>
              <span>{totalAmount}</span>
            </div>
            {modalActions}
          </>
        ) : (
          <User onCancel={props.onClose} onConfirm={submitOrderHandler} />
        )}
      </>
    );
    
  
    const isInModalContent = <p>Sending order data...</p>;
  
    const submitModalContent = (
      <>
        <p>Order sucessfull</p>
        <div className="actions">
          <button className="button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </>
    );
  
    return (
      <Modal onClose={props.onClose}>
        {!isIn && !submit && cartModalContent}
        {isIn && isInModalContent}
        {!isIn && submit && submitModalContent}
      </Modal>
    );
  };
