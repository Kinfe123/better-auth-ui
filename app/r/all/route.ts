import { db } from "@/lib/db";
export async function GET(request: Request) {
  const registries = await db.componentExport.findMany({
    include: {
      files: true,
    },
  });
  return new Response(JSON.stringify(registries), {
    headers: { "content-type": "application/json" },
  });
}
