import React from 'react';
import DatePickerWithRecurrence from './DatePickerRecurrence';
import { RecurrenceProvider } from './RecurrenceContextVar';

function App() {
  return (<>
    <RecurrenceProvider>
    <h1><span style={{ color: 'wheat' }}>Date</span> Picker with Recurrence</h1>
      <DatePickerWithRecurrence />
    </RecurrenceProvider>
  </>);
}

export default App;
