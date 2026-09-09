export const COURSE_IDS = {
  dfp: "247bc34b-c35f-459d-828d-ff6b77035760",
  feu: "e0792ce0-4bf0-4193-a7ca-a3a32230886e",
  bea: "ef8e5823-3f06-4a99-96da-6049a80a3dc3",
  fsa: "b9970da6-5487-4851-8805-b7e38840bc88",
  dia: "bf90284a-976f-4f8f-bc88-d0110a959b67",
  thp: "97436a3b-3046-48df-8c3a-05c92bae66ff",
  hia: "121d2481-6047-43c9-85a2-f53893a46cb7", // ← add this
}

export const COURSE_CODE_BY_ID: Record<string, string> = Object.fromEntries(
  Object.entries(COURSE_IDS).map(([code, id]) => [id, code])
)