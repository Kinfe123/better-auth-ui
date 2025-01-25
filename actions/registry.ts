"use server";

import { db } from "@/lib/db";
export const registryExport = async (data: any) => {
  console.log(data);
  const rData = await db.componentExport.create({
    data: {
      name: data.name,
      description: data.description,
      title: data.title,
      id: data.id,
      type: data.type,
      files: {
        create: data.files.map((file) => ({
          path: file.path,
          type: file.type,
          target: file.target,
        })),
      },
    },
  });
  if (!rData) {
    throw new Error("Failed to create component");
  }
  return rData;
};
