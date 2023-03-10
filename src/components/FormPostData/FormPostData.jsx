import { Formik, Field, Form } from 'formik';
import api from '../../api';

import './FormPostData.scss';

const FormPostData = ({setActive}) => {
   return(
      <>
      <Formik
         initialValues={{
            uniqueLabelCorrection: '',
            secretVotingKey:''
         }}
         onSubmit={({uniqueLabelCorrection, secretVotingKey},  {resetForm}) => {
          api.posts.postVotingKey(uniqueLabelCorrection, secretVotingKey)
          setActive(false);
           resetForm();
         }}
      >
         <Form action="" className="ui-form">
               <h3>Отправка метки и ключа</h3>
               <div className="form-row">
               <Field type="text" id="metka" name="uniqueLabelCorrection"  required /><label htmlFor="metka">Метка</label>
               </div>
               <div className="form-row">
               <Field type="text" id="secretkey" name="secretVotingKey"  required /><label htmlFor="secretkey">Секретный ключ</label>
               </div>
               <p><button type="submit" >Отправить</button></p>
            </Form>
      </Formik> 

      </>
   )
}

export default FormPostData;