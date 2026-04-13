import Button from "../../components/ui/Button";
import {
    AlertCircle
} from "lucide-react"
const NotFound = () => {
  return (
    <div className=" h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-[300px] flex flex-col items-center gap-6">
        <AlertCircle className="text-red-500 w-12 h-12" />
        <h1 className="text-white">
          The page you are looking for does not exist. Please check the URL and
          try again.
        </h1>
        <Button label="Back to Home" href="/rooms" />
      </div>
    </div>
  );
};

export default NotFound;
