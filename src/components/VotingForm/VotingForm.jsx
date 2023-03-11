import { Formik, Field, Form } from 'formik';

const VotingForm = ({setValueVotingByPerson}) => {
return(

   <Formik
   initialValues={{
     picked: '',
   }}
   onSubmit={ (values) => {
      setValueVotingByPerson(values.picked)
   }}
 >
   {() => (
         <Form className="login10-form validate-form">
            <span className="login10-form-title p-b-26">
               Вы за поправки в конституцию?
            </span>
         <div></div>
         <div role="group" aria-labelledby="my-radio-group">
            <div className="input-group">
               <Field id="radio1"  type="radio" name="picked" value="1" />
               <label htmlFor="radio1">Да</label>
            </div>
            <div className="input-group">
               <Field id="radio2"  type="radio" name="picked" value="0" />
               <label htmlFor="radio2">Нет</label>
            </div>
         </div>
            <div className="container-login10-form-btn">
               <div className="wrap-login10-form-btn">
                  <div className="login10-form-bgbtn"></div>
                  <button className="login10-form-btn"  type="submit">
                     Проголосовать
                  </button>
               </div>
            </div>
         </Form>
            )}
      </Formik>
)

}

export default VotingForm;