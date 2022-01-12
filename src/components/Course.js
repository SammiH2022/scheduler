import { timeParts, hasConflict, getCourseTerm, getCourseNumber } from '../utilities/times';
import { setData } from '../utilities/firebase.js';

const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const getCourseMeetingData = course => {
    const meets = prompt('Enter meeting data: MTuWThF hh:mm-hh:mm', course.meets);
    const valid = !meets || timeParts(meets).days;
    if (valid) return meets;
    alert('Invalid meeting data');
    return null;
  };

const reschedule = async (course, meets) => {
    if (meets && window.confirm(`Change ${course.id} to ${meets}?`)) {
        try {
        await setData(`/courses/${course.id}/meets`, meets);
        } catch (error) {
        alert(error);
        }
    }
};

const Course = ({ course, selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const style = {
      backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
    return (
      <div className="card m-1 p-2" 
        style={style}
        onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}
        onDoubleClick={() => reschedule(course, getCourseMeetingData(course))}>
        <div className="card-body">
          <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
          <div className="card-text">{ course.title }</div>
          <div className="card-text">{ course.meets }</div>
        </div>
      </div>
    );
  };

  const schedule = {
    "title": "CS Courses for 2018-2019",
    "courses": {
      "F101" : {
        "id" : "F101",
        "meets" : "MWF 11:00-11:50",
        "title" : "Computer Science: Concepts, Philosophy, and Connections"
      },
      "F110" : {
        "id" : "F110",
        "meets" : "MWF 10:00-10:50",
        "title" : "Intro Programming for non-majors"
      },
      "S313" : {
        "id" : "S313",
        "meets" : "TuTh 15:30-16:50",
        "title" : "Tangible Interaction Design and Learning"
      },
      "S314" : {
        "id" : "S314",
        "meets" : "TuTh 9:30-10:50",
        "title" : "Tech & Human Interaction"
      }
    }
  };

  export default Course;