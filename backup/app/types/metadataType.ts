export type metaDataType = {
  description: string;
  external_url?: string;
  image: string;
  name: string;
  attributes: Array<attributes>;
};

type attributes = {
  trait_type:
    | "Base"
    | "Eyes"
    | "Mouth"
    | "Level"
    | "Stamina"
    | "Personality"
    | string;
  display_type:
    | "boost_number"
    | "boost_percentage"
    | "number"
    | "date"
    | string;
  value: number | string;
};
