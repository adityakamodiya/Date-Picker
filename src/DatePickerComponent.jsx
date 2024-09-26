import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';

import { Form, Button, Container } from 'react-bootstrap';

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Date</Form.Label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            placeholderText="Choose a date"
          />
        </Form.Group>
        <Button variant="primary" onClick={() => alert(`Selected Date: ${selectedDate}`)}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default DatePickerComponent;
