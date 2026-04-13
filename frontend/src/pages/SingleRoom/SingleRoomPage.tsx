import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import RoomBoard from "./_components/RoomBoard";

const SingleRoom = () => {
  return (
    <section className="border-t border-secondary pt-14 pb-16 px-4 sm:px-2">
      {/* Header */}
      <div className="container mx-auto">
        <div className="-top-2.5 relative">
          <Link to={`/rooms`} className="flex items-start gap-2">
            <ArrowLeft size={20} className="text-white mt-0.5" />
            <div>
              <h3 className="text-white text-lg">All voice rooms</h3>
              <div className="w-3/5 mt-1 h-[3px] bg-blue" />
            </div>
          </Link>
        </div>
      </div>
      {/* Room Board */}
      <RoomBoard />
    </section>
  );
};

export default SingleRoom;
