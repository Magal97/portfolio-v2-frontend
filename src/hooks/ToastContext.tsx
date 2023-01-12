import React, {createContext, useContext, useCallback, useState} from 'react';
import ToastContainer from '../components/ToastContainer';
/* import {uuid} from 'uuidv4' */


interface ToastContextData{
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;

}

export interface ToastMessage {
  id: string;
  type?: 'sucess' | 'error' | 'info';
  title: string;
  description: string;

}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

//@ts-ignore
const ToastProvider: React.FC = ({children}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({title, type, description}: Omit<ToastMessage, 'id'>) => {
    /* const id = uuid();
    const toast = {
      id,
      type,
      title,
      description,
    }; 
    setMessages(oldMessages => [...oldMessages, toast]);*/

  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages => oldMessages.filter(message => message.id !== id))
  }, []);

  return (
    <ToastContext.Provider value={{addToast, removeToast}} >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );

};

function useToast(): ToastContextData{

  const context = useContext(ToastContext);

  if(!context){
    throw new Error('useToas must be used whitin a ToastProvider');
  }

  return context;

}

export {ToastProvider, useToast};
