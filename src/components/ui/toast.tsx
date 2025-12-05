import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const style: any = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce
}

const Toast = (msg: string, type: 'warning' | 'success' | 'error') => {
  if (type === 'warning') {
    return toast.warn(msg, style)
  } else if (type === 'success') {
    return toast.success(msg, style)
  } else if (type === 'error') {
    return toast.error(msg, style)
  }
}

export default Toast

export const Toaster = () => {
  return (
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'
      transition={Bounce}
    />
  )
}
