import { Podcast, Search } from "lucide-react";

import { useState } from "react";
import CreateRoomModal from "../../components/CreateRoomModal";
import Button from "../../components/ui/Button";
import { useRoomsQuery } from "../../redux/features/room/roomApi";
import RoomCard from "./_components/RoomCard";
import type { Room } from "../../types";

const Rooms = () => {
  const { isFetching, data } = useRoomsQuery({});
  console.log("🚀 ~ data:", data);
  const rooms: Room[] = data?.data?.rooms || [];
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  return (
    <>
      <CreateRoomModal
        open={showCreateRoomModal}
        onClose={() => setShowCreateRoomModal(false)}
      />

      <section className="border-t border-secondary">
        <div className="container mx-auto pt-8 pb-16 px-4 sm:px-2">
          {/*  Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <div className="flex flex-col sm:flex-row items-baseline gap-4">
              <div className="-top-2.5 relative">
                <h3 className="text-white text-lg">All voice rooms</h3>
                <div className="w-3/5 mt-1 h-[3px] bg-blue" />
              </div>

              <div
                className="
            bg-secondary rounded-full px-4 py-2 flex items-center gap-3 sm:mt-4 w-full sm:w-[300px]
          "
              >
                <Search className="size-5 text-grey" />
                <input
                  className="text-grey w-full outline-0"
                  type="text"
                  placeholder="Search for rooms"
                />
              </div>
            </div>
            <div>
              <Button
                onClick={() => setShowCreateRoomModal(true)}
                label="Create new room"
                className="mt-5 sm:mt-4 bg-green-500 hover:bg-green-600 max-sm:w-full flex-row-reverse gap-1.5"
                icon={<Podcast />}
              />
            </div>
          </div>
          {/*  Room List */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room: Room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Rooms;
