
const Form = ({onSubmit, nameValue, numberValue, handleNameChange, handleNumberChange }) => {

      return (
      <form onSubmit={onSubmit}>
        <div>
          <div>name:  
            <input onChange={handleNameChange} value={nameValue}/>          
          </div>
          <div>number: 
            <input onChange={handleNumberChange} value={numberValue}/>
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      );
}

export default Form;