import { IoIosWarning } from "react-icons/io";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="error">
      <IoIosWarning /> {message}
    </p>
  );
}

export default ErrorMessage;
