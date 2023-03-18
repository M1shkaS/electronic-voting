import { Formik, Field, Form } from 'formik';
import api from '../../api';
import logStore from '../../stores/LogStore';
import tableDataStore from '../../stores/TableDataStore';
import './FormPostData.scss';

const FormPostData = ({setActive}) => {

   const postData =  async(uniqueLabelCorrection, secretVotingKey) => {
      let res = await api.posts.postVotingKey(uniqueLabelCorrection, secretVotingKey)
      tableDataStore.addTableData(res)

   }
   return(
      <>
      <Formik
         initialValues={{
            uniqueLabelCorrection: '',
            secretVotingKey:''
         }}
         onSubmit={({uniqueLabelCorrection, secretVotingKey},  {resetForm}) => {
            postData(uniqueLabelCorrection, secretVotingKey)
          logStore.addUserTextLog(
            <div className="logUser__text" >
              <span>Пользователь отправляет свою метку и секретный ключ для расшифрования:</span><br/>
              {uniqueLabelCorrection} <br />
              {secretVotingKey} 
            </div>)
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