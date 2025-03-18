import React, { useState, useEffect } from "react";
import { fileItem } from "../types";

export default function useSelectionChange(items: fileItem[]) {
  const [multiSelect, setMultiSelect] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setMultiSelect(false);
      setAllSelected(false);
    } else {
      const selectedCount = items.filter((item: fileItem) => item.selected).length;
      setMultiSelect(selectedCount > 0);
      setAllSelected(selectedCount === items.length);
    }
  }, [items]);

  return { multiSelect, allSelected };
}
