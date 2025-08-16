import { Fragment } from "react";
const Phonebook = ({shown, deletePerson}) => {

      return (
        <div>{shown.map(person => {
          return (
          <Fragment key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => deletePerson(person.id)}>delete</button>
          </Fragment>
      )})}
      </div>
      );
}
export default Phonebook;