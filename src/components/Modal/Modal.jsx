import './Modal.scss';

const Modal = ({active, setActive,setModalInfoVotingDataActive, children}) => {
   return(
      <div className={active ? "modal active": "modal"} onClick={() => { 
         setActive(false)
         setModalInfoVotingDataActive(false)
         }}>
         <div className="modal__content" onClick={e => e.stopPropagation()}>
            {children}
         </div>
      </div>
   )
}

export default Modal;