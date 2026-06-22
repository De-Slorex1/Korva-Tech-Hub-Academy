import { Enrollment } from "@/types/enrollements"

interface ProfileStepProps {
  data: Partial<Enrollment>
  setData: React.Dispatch<
    React.SetStateAction<Partial<Enrollment>>
  >
  next: () => void
}

