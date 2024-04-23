"use client";
import "react-cmdk/dist/cmdk.css";
import { useState } from "react";
import CommandPalette from "react-cmdk";
import { Button } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type SearchBarProps = {
  className?: string;
  fullWidth?: boolean;
};

export default function SearchBar(props: SearchBarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const width = props.fullWidth ? "100%" : "auto";

  const openPalette = () => setOpen(true);

  return (
    <div className={props.className}>
      <Button style={{ width }} variant="soft" onClick={openPalette}>
        <MagnifyingGlassIcon /> Search for a city...
      </Button>
      <CommandPalette
        onChangeSearch={setSearch}
        onChangeOpen={setOpen}
        search={search}
        isOpen={open}
      >
        <CommandPalette.List heading="Suggestions">
          <CommandPalette.ListItem index={0} showType={false}>
            Kansas City, KS
          </CommandPalette.ListItem>
          <CommandPalette.ListItem index={1} showType={false}>
            Olathe, KS
          </CommandPalette.ListItem>
          <CommandPalette.ListItem index={2} showType={false}>
            Wichita, KS
          </CommandPalette.ListItem>
          <CommandPalette.ListItem index={3} showType={false}>
            Salina, KS
          </CommandPalette.ListItem>
        </CommandPalette.List>
      </CommandPalette>
    </div>
  );
}
