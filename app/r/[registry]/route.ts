import { db } from "@/lib/db";
export async function GET(
  request: Request,
  { params }: { params: { registry: string } },
) {
  console.log(params);
  const registry = await db.componentExport.findUnique({
    where: {
      id: params.registry,
    },
    include: {
      files: true,
    },
  });
  console.log(registry);
  if (!registry) {
    return new Response(null, { status: 404 });
  }
  return new Response(JSON.stringify(registry), {
    headers: { "content-type": "application/json" },
  });
}
