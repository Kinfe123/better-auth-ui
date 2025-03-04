"use server";

import { db } from "@/lib/db";
import { RegisteryData } from "@/types/reg";
export const registryExport = async (data: RegisteryData) => {
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
          content: file.content,
          target: file.target,
        })),
      },
    },
  });
  if (!rData) {
    throw new Error("Failed to create component");
  }
  console.log({ rData });
  return rData;
};
export const registryBlockExport = async (data: any) => {
  const rData = await db.componentExport.create({
    data: {
      name: data.name,
      description: data.description,
      title: data.title,
      id: data.id,
      type: data.type,
      files: {
  	create: {
		path: file.path,
          	type: file.type,
          	content: file.content,
          	target: file.target,
	}
      },
    },
  });
  if (!rData) {
    throw new Error("Failed to create component");
  }
  console.log({ rData });
  return rData;
}
