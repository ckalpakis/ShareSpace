declare namespace google.maps.places {
  class Autocomplete {
    constructor(
      inputField: HTMLInputElement,
      opts?: google.maps.places.AutocompleteOptions
    );
    addListener(eventName: string, handler: Function): void;
    getPlace(): google.maps.places.PlaceResult;
  }

  interface AutocompleteOptions {
    componentRestrictions?: {
      country: string | string[];
    };
    fields?: string[];
    types?: string[];
  }

  interface PlaceResult {
    formatted_address?: string;
  }
}
