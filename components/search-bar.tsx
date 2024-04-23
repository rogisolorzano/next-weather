"use client";
import "react-cmdk/dist/cmdk.css";
import { useState } from "react";
import CommandPalette from "react-cmdk";
import { Button } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from "use-places-autocomplete";
import { useLocationStore } from "@/lib/store/location/location";

type SearchBarProps = {
  className?: string;
  fullWidth?: boolean;
};

export default function SearchBar({ className, fullWidth }: SearchBarProps) {
  const width = fullWidth ? "100%" : "auto";
  const [open, setOpen] = useState<boolean>(false);
  const { addLocation } = useLocationStore();

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
    },
    debounce: 250,
  });

  const openPalette = () => setOpen(true);

  const handleSelect =
    ({ description }: Suggestion) =>
    async () => {
      setOpen(false);
      setValue("");
      clearSuggestions();
      const [result] = await getGeocode({ address: description });
      const { lat, lng } = getLatLng(result);
      addLocation({
        lat,
        lon: lng,
        name: description,
      });
    };

  return (
    <div className={className}>
      <Button style={{ width }} variant="soft" onClick={openPalette}>
        <MagnifyingGlassIcon /> Search for a city...
      </Button>
      <CommandPalette
        placeholder="Search for a city..."
        onChangeSearch={setValue}
        onChangeOpen={setOpen}
        search={value}
        isOpen={open}
      >
        {data.length > 0 && status === "OK" ? (
          <CommandPalette.List heading="Suggestions">
            {data.map((suggestion, i) => (
              <CommandPalette.ListItem
                key={i}
                index={i}
                showType={false}
                onClick={handleSelect(suggestion)}
              >
                {suggestion.description}
              </CommandPalette.ListItem>
            ))}
          </CommandPalette.List>
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette>
    </div>
  );
}
