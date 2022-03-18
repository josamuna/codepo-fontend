import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (val) => toast.success(`${val}`);

export default notifySuccess;
