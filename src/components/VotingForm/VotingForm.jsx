import { Formik, Field, Form, ErrorMessage  } from 'formik';
import * as Yup from 'yup';

import './VotingForm.scss';

const SignupSchema = Yup.object().shape({
   checked: Yup.array()
     .max(3, 'Выберите не более 3 человек')
     .min(1, 'Выберите минимум одного человека')

 });

const VotingForm = ({setValueVotingByPerson}) => {
return(

   <Formik
   initialValues={{
     checked: []
   }}
   validationSchema={SignupSchema}
   onSubmit={ (values) => {
       setValueVotingByPerson(values.checked.join())
   }}
 >
   {() => (
         <Form className="login10-form validate-form">
            <span className="login10-form-title p-b-26">
               Выберите не более 3 выборщиков
            </span>
         <div></div>
         <div role="group" aria-labelledby="my-radio-group">
            <div className="input-group">
               <Field id="checkbox1"  type="checkbox" name="checked" value="Чернова Полина Артёмовна" />
               <label htmlFor="checkbox1">Чернова Полина Артёмовна</label>
            </div>
            <div className="input-group">
               <Field id="checkbox2"  type="checkbox" name="checked" value="Ильина Марина Игоревна" />
               <label htmlFor="checkbox2">Ильина Марина Игоревна</label>
            </div>
            <div className="input-group">
               <Field id="checkbox3"  type="checkbox" name="checked" value="Матвеев Григорий Александрович" />
               <label htmlFor="checkbox3">Матвеев Григорий Александрович</label>
            </div>
            <div className="input-group">
               <Field id="checkbox4"  type="checkbox" name="checked" value="Иванова Виктория Михайловна" />
               <label htmlFor="checkbox4">Иванова Виктория Михайловна</label>
            </div>
            <div className="input-group">
               <Field id="checkbox5"  type="checkbox" name="checked" value="Ильин Роман Константинович" />
               <label htmlFor="checkbox5">Ильин Роман Константинович</label>
            </div>
            <div className="input-group">
               <Field id="checkbox6"  type="checkbox" name="checked" value="Фирсов Максим Владимирович" />
               <label htmlFor="checkbox6">Фирсов Максим Владимирович</label>
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
            <ErrorMessage component="div" className='error' name="checked" />
         </Form>
            )}
      </Formik>
)

}

export default VotingForm;