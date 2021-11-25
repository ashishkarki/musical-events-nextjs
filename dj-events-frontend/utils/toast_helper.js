import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ToastHelper = ({
  message = 'Check with your admin',
  type = 'info',
}) => {
  useEffect(() => {
    toast(message, { type })
  }, [message, type])

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </div>
  )
}
