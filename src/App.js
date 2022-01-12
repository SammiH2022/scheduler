import React, { useState, useEffect } from 'react';
import CourseList from './components/CourseList';
import './App.css';
import { useData } from './utilities/firebase.js';
import { addScheduleTimes } from './utilities/times';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () => {
  /*const [schedule, setSchedule] = useState(); */
  const [schedule, loading, error] = useData('/', addScheduleTimes); 
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;
