"use client";
import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import {  useOthers, useSelf } from "@/liveblocks.config";


const Max_Shown_Users=2;

export const Participants=()=>{
    const users=useOthers();
    const currentUser=useSelf();
    const hasMoreUsers=users.length> Max_Shown_Users;


    return(
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0,Max_Shown_Users).map(({connectionId,info})=>{
                    return(
                        <UserAvatar
                            borderColor={connectionIdToColor(currentUser?.connectionId || 0)}
                            key={connectionId}
                            src={typeof info?.picture === "string" ? info.picture : undefined}
                            name={info?.name}
                            fallback={info?.name?.[0] || "TM"}
                        />
                    )
                })}

                {currentUser && (
                    <UserAvatar
                        src={typeof currentUser.info?.picture === "string" ? currentUser.info.picture : undefined}
                        name={`${currentUser.info?.name}(You)`}
                        fallback={currentUser.info?.name?.[0] || "TM"}
                        />
                )}

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${users.length-Max_Shown_Users} More`}
                        fallback={`+${users.length-Max_Shown_Users}`}    
                    />
                )}

            </div>
        </div>
    );
};

export const ParticipantsSkeleton=()=>{
    return(
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]"/>
    );
};