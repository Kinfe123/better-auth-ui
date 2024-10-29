import React from "react";
import { File, Folder } from "@/components/file-tree";
interface Element {
  id: string;
  isSelectable: boolean;
  name: string;
  children?: Element[];
}

export const RenderElements: React.FC<{
  setCurrentPage: (value: string) => void;
  elements: Element[];
  currentPage: string;
}> = ({ elements, setCurrentPage, currentPage }) => {
  return (
    <>
      {elements.map((item) => {
        if (item.children) {
          return (
            <Folder key={item.id} element={item.name} value={item.id}>
              <RenderElements
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
            name={item.name}
            handleSelect={setCurrentPage}
            key={item.id}
            value={item.id}
          >
            {item.name}
          </File>
        );
      })}
    </>
  );
};
