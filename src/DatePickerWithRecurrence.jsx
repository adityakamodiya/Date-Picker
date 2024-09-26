import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './CSS/datepicker.css';




import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const DatePickerWithRecurrence = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [recurrenceType, setRecurrenceType] = useState('daily');
  const [interval, setInterval] = useState(1);
  const [specificDays, setSpecificDays] = useState([]);
  const [nthDay, setNthDay] = useState(null);
  const [recurrenceDates, setRecurrenceDates] = useState([]);

  // Generate recurring dates
  const generateRecurrenceDates = () => {
    let dates = [];
    let currentDate = new Date(startDate);
    let end = endDate || new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)); // default 1 year recurrence

    while (currentDate <= end) {
      dates.push(new Date(currentDate));

      if (recurrenceType === 'daily') {
        currentDate.setDate(currentDate.getDate() + interval);
      } else if (recurrenceType === 'weekly') {
        currentDate.setDate(currentDate.getDate() + 7 * interval);
      } else if (recurrenceType === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + interval);
      } else if (recurrenceType === 'yearly') {
        currentDate.setFullYear(currentDate.getFullYear() + interval);
      }
    }

    setRecurrenceDates(dates);
  };

  // Handle specific days of the week for weekly recurrence
  const handleSpecificDays = (day) => {
    const updatedDays = specificDays.includes(day)
      ? specificDays.filter(d => d !== day)
      : [...specificDays, day];
    setSpecificDays(updatedDays);
  };

  // Recurrence pattern form
  const RecurrencePatternForm = () => (
    <Form.Group className="mb-3">
      <Form.Label>Recurrence Type</Form.Label>
      <Form.Control as="select" value={recurrenceType} onChange={(e) => setRecurrenceType(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </Form.Control>

      <Form.Label className="mt-3">Interval (Every X {recurrenceType})</Form.Label>
      <Form.Control
        type="number"
        min="1"
        value={interval}
        onChange={(e) => setInterval(parseInt(e.target.value, 10))}
      />

      {recurrenceType === 'weekly' && (
        <div className="mt-3">
          <Form.Label>Select Days of the Week</Form.Label>
          <div>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, idx) => (
              <Form.Check
                inline
                key={idx}
                type="checkbox"
                label={day}
                value={idx}
                checked={specificDays.includes(idx)}
                onChange={() => handleSpecificDays(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {recurrenceType === 'monthly' && (
        <Form.Group className="mt-3">
          <Form.Label>The Nth Day of the Month</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="31"
            value={nthDay || ''}
            onChange={(e) => setNthDay(parseInt(e.target.value, 10))}
            placeholder="Nth day (e.g., 2 for second day)"
          />
        </Form.Group>
      )}
    </Form.Group>
  );

  // Mini calendar preview
  const RecurrencePreviewCalendar = () => (
    <Calendar
      value={recurrenceDates}
      tileClassName={({ date }) => recurrenceDates.some(d => d.toDateString() === date.toDateString()) ? 'highlight' : null}
    />
  );

  return (
    
    <Container   className="mt-5">
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date (Optional)</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="form-control"
                isClearable
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>

            <RecurrencePatternForm />

            <Button variant="primary" onClick={generateRecurrenceDates}>
              Generate Recurrence
            </Button>
          </Form>
        </Col>

        <Col>
          <h5>Recurrence Preview</h5>
          <RecurrencePreviewCalendar />
        </Col>
      </Row>
    </Container>
  );
};

export default DatePickerWithRecurrence;
