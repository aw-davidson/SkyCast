// ACTION TYPES

const CHANGE_DATE = 'CHANGE_DATE';

//INITIAL STATE

const defaultDate = Math.floor(Date.now() / 1000);

// ACTION CREATORS

export function changeDate (date) {
  const action = { type: CHANGE_DATE, date };
  return action;
}

// REDUCER
export default function reducer (state = defaultDate, action) {

  switch (action.type) {

    case CHANGE_DATE:
      return action.date;

    default:
      return state;
  }

}
