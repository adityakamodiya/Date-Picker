import React, { createContext, useState } from 'react';

// create a context
export const RecurrenceContext = createContext();

// create a provider component
export const RecurrenceProvider = ({ children }) => {
  const [startdate, setstartdate] = useState(new Date());
  const [enddate, setenddate] = useState(null);
  const [recurrencetype, setrecurrencetype] = useState('daily');
  const [interval, setinterval] = useState(1);
  const [specificdays, setspecificdays] = useState([]);
  const [nthday, setnthday] = useState(null);
  const [recurrencedates, setrecurrencedates] = useState([]);

  // this object holds all the states to be passed down via context
  const value = {
    startdate, setstartdate,
    enddate, setenddate,
    recurrencetype, setrecurrencetype,
    interval, setinterval,
    specificdays, setspecificdays,
    nthday, setnthday,
    recurrencedates, setrecurrencedates,
  };

  return (
    <RecurrenceContext.Provider value={value}>
      {children}
    </RecurrenceContext.Provider>
  );
};
