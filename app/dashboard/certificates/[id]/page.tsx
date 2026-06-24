import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { notFound } from "next/navigation"
import CertificateView from "./CertificateView"

type Props = {
  params: Promise<{ id: string }>
}

export default async function CertificatePage({ params }: Props) {
  const { id } = await params

  const { data: certificate } = await supabaseAdmin
    .from("certificates")
    .select("*")
    .eq("id", id)
    .single()

  if (!certificate) notFound()

  return <CertificateView certificate={certificate} />
}