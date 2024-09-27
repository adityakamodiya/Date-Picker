import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './CSS/datepicker.css';
import { RecurrenceContext } from './RecurrenceContextVar'; 

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const DatePickerWithRecurrence = () => {
  const {
    startdate, setstartdate,
    enddate, setenddate,
    recurrencetype, setrecurrencetype,
    interval, setinterval,
    specificdays, setspecificdays,
    nthday, setnthday,
    recurrencedates, setrecurrencedates,
  } = useContext(RecurrenceContext);

  // generate recurring dates
  const generaterecurrencedates = () => {
    let dates = [];
    let currentdate = new Date(startdate);
    let end = enddate || new Date(currentdate.setFullYear(currentdate.getFullYear() + 1)); // default 1 year recurrence

    while (currentdate <= end) {
      dates.push(new Date(currentdate));

      if (recurrencetype === 'daily') {
        currentdate.setDate(currentdate.getDate() + interval);
      } else if (recurrencetype === 'weekly') {
        currentdate.setDate(currentdate.getDate() + 7 * interval);
      } else if (recurrencetype === 'monthly') {
        currentdate.setMonth(currentdate.getMonth() + interval);
      } else if (recurrencetype === 'yearly') {
        currentdate.setFullYear(currentdate.getFullYear() + interval);
      }
    }

    setrecurrencedates(dates);
  };

  // handle specific days of the week for weekly recurrence
  const handlespecificdays = (day) => {
    const updateddays = specificdays.includes(day)
      ? specificdays.filter(d => d !== day)
      : [...specificdays, day];
    setspecificdays(updateddays);
  };

  // recurrence pattern form
  const RecurrencePatternForm = () => (
    <Form.Group className="mb-3">
      <Form.Label>Recurrence Type</Form.Label>
      <Form.Control as="select" value={recurrencetype} onChange={(e) => setrecurrencetype(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </Form.Control>

      <Form.Label className="mt-3">Interval (Every X {recurrencetype})</Form.Label>
      <Form.Control
        type="number"
        min="1"
        value={interval}
        onChange={(e) => setinterval(parseInt(e.target.value, 10))}
      />

      {recurrencetype === 'weekly' && (
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
                checked={specificdays.includes(idx)}
                onChange={() => handlespecificdays(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {recurrencetype === 'monthly' && (
        <Form.Group className="mt-3">
          <Form.Label>The Nth Day of the Month</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="31"
            value={nthday || ''}
            onChange={(e) => setnthday(parseInt(e.target.value, 10))}
            placeholder="Nth day (e.g., 2 for second day)"
          />
        </Form.Group>
      )}
    </Form.Group>
  );

  // mini calendar preview
  const RecurrencePreviewCalendar = () => (
    <Calendar
      value={recurrencedates}
      tileClassName={({ date }) => recurrencedates.some(d => d.toDateString() === date.toDateString()) ? 'highlight' : null}
    />
  );

  return (
    <Container className="mt-5">
      <Row  className='Row'>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={startdate}
                onChange={(date) => setstartdate(date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date (Optional)</Form.Label>
              <DatePicker
                selected={enddate}
                onChange={(date) => setenddate(date)}
                className="form-control"
                isClearable
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>

            <RecurrencePatternForm />

            <Button variant="primary" onClick={generaterecurrencedates}>
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
