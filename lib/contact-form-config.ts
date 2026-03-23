export const VEHICLE_TYPES = [
  "Car",
  "Truck",
  "SUV",
  "Van",
  "Fleet",
] satisfies readonly string[];

export type ServiceCategory = {
  category: string;
  items: readonly string[];
};

export const SERVICE_CATEGORIES = [
  {
    category: "Detailing & Cleaning",
    items: [
      "Auto detailing work",
      "Exterior detailing",
      "Interior detailing",
      "Car wash",
      "Handwashing",
      "Upholstery and carpet cleaning",
      "Car window cleaning",
      "Engine cleaning",
      "Wheel and rim detailing",
    ],
  },
  {
    category: "Paint & Exterior",
    items: [
      "Auto paint correction",
      "Auto paint restoration",
      "Paint and exterior protection",
      "Scratch removal",
      "Auto bug and sap removal",
      "Headlight restoration",
    ],
  },
  {
    category: "Protection & Coating",
    items: ["Protection", "Full-service packages"],
  },
  {
    category: "Window Tinting",
    items: ["Window tinting", "Tint application", "Tint removal"],
  },
  {
    category: "Wraps",
    items: [
      "Vehicle wrapping application",
      "Vehicle wrapping design",
      "Vehicle wrap removal",
    ],
  },
] satisfies readonly ServiceCategory[];

export const SERVICE_OPTIONS = SERVICE_CATEGORIES.flatMap((serviceCategory) =>
  serviceCategory.items,
);

type FieldName =
  | "name"
  | "phone"
  | "email"
  | "vehicleType"
  | "serviceInterestedIn"
  | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<FieldName, string>>;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
