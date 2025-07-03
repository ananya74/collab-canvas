'use server';

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

export default async function BoardIdPage({
  params,
}: {
  params: Promise<{ boardid: string }>;
}) {
  const { boardid } = await params;

  return (
    <Room roomId={boardid} fallback={<Loading />}>
      <Canvas boardId={boardid} />
    </Room>
  );
}
