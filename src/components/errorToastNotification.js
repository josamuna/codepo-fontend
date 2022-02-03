import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyError = (val) => toast.error(`${val}`);

export default notifyError;
