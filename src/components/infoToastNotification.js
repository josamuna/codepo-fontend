import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyInformation = (val) => toast.info(`${val}`);

export default notifyInformation;
