"use server";

import {
  type ContactFormState,
  SERVICE_OPTIONS,
  VEHICLE_TYPES,
} from "@/lib/contact-form-config";

function getTrimmedValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = getTrimmedValue(formData, "name");
  const phone = getTrimmedValue(formData, "phone");
  const email = getTrimmedValue(formData, "email");
  const vehicleType = getTrimmedValue(formData, "vehicleType");
  const serviceInterestedIn = getTrimmedValue(formData, "serviceInterestedIn");
  const message = getTrimmedValue(formData, "message");
  const company = getTrimmedValue(formData, "company");

  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (!name) {
    fieldErrors.name = "Please enter your name.";
  }

  if (!phone) {
    fieldErrors.phone = "Please enter a phone number.";
  }

  if (!email) {
    fieldErrors.email = "Please enter an email address.";
  } else if (!isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!VEHICLE_TYPES.includes(vehicleType as (typeof VEHICLE_TYPES)[number])) {
    fieldErrors.vehicleType = "Please select a valid vehicle type.";
  }

  if (
    !SERVICE_OPTIONS.includes(
      serviceInterestedIn as (typeof SERVICE_OPTIONS)[number],
    )
  ) {
    fieldErrors.serviceInterestedIn = "Please select a valid service.";
  }

  if (company) {
    return {
      status: "error",
      message:
        "Something went wrong while sending your request. Please call (916) 749-0339 instead.",
      fieldErrors: {},
    };
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please review the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT;

  if (!endpoint) {
    return {
      status: "error",
      message:
        "Something went wrong while sending your request. Please call (916) 749-0339 instead.",
      fieldErrors: {},
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        vehicleType,
        serviceInterestedIn,
        message,
        source: "website-contact-form",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        status: "error",
        message:
          "Something went wrong while sending your request. Please call (916) 749-0339 instead.",
        fieldErrors: {},
      };
    }

    return {
      status: "success",
      message:
        "Thanks. Your request has been sent and Sac Valley Detail will follow up shortly.",
      fieldErrors: {},
    };
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong while sending your request. Please call (916) 749-0339 instead.",
      fieldErrors: {},
    };
  }
}
