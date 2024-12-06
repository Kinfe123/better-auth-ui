import React from "react";
import { File, Folder } from "@/components/file-tree";
interface Element {
  id: string;
  isSelectable: boolean;
  name: string;
  slug?: string;
  flattenPath?: string;
  children?: Element[];
}

export const RenderElements: React.FC<{
  setCurrentPage: (value: string) => void;
  setCurrentSlug: (value: string) => void;
  elements: Element[];
  currentPage: string;
  currentSlug: string;
}> = ({
  elements,
  setCurrentPage,
  currentPage,
  currentSlug,
  setCurrentSlug,
}) => {
  return (
    <>
      {elements.map((item) => {
        if (item.children) {
          return (
            <Folder key={item.id} element={item.name} value={item.id}>
              <RenderElements
                currentSlug={currentSlug}
                setCurrentSlug={setCurrentSlug}
                currentPage={currentPage}
                elements={item.children}
                setCurrentPage={setCurrentPage}
              />
            </Folder>
          );
        }
        return (
          <File
            isSelectable={item.isSelectable}
            currentPage={currentPage}
            currentSlug={currentSlug}
            handleSlugSelect={setCurrentSlug}
            name={item.name}
            slug={item.slug ?? ""}
            handleSelect={setCurrentPage}
            key={item.id}
            value={item.id}
            flattenPath={item?.flattenPath}
          >
            {item.name}
          </File>
        );
      })}
    </>
  );
};
