import { createClient, LiveList, LiveMap,LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Layer,Color} from "@/types/canvas";

const client = createClient({
  throttle:16,
  authEndpoint: "/api/liveblocks-auth",
});

// Presence represents the properties that will exist on every User in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  cursor: { x: number, y: number } | null,
  selection: string[] ;
  pencilDraft:[x:number,y:number,pressure:number][] | null;
  penColor:Color | null;
   // Array of layer IDs that the user has selected
  // ...
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all Users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  layers:LiveMap<string,LiveObject<Layer>>;
  layerIds:LiveList<string>;
};

// Optionally, UserMeta represents static/readonly metadata on each User, as
// provided by your own custom auth backend (if used). Useful for data that
// will not change during a session, like a User's name or avatar.
type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  } // Accessible through `user.info`
};

// Optionally, the type of custom events broadcast and listened to in this
// room. Must be JSON-serializable.
type RoomEvent = {
  type:"REACTION";
  x: number;
  y: number;
  value: string;
  name:string;
};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
  },
} = createRoomContext<Presence, Storage,  UserMeta ,RoomEvent>(client);