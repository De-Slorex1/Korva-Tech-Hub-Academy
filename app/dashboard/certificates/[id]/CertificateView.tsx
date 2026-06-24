'use client'

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Certificate = {
  id: string
  student_name: string
  course_name: string
  certificate_number: string
  issued_at: string
}

export default function CertificateView({ certificate }: { certificate: Certificate }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/certificate/${certificate.id}`

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${certificate.course_name} Certificate`,
        text: `I just earned a certificate in ${certificate.course_name} from Korva Tech Hub!`,
        url: shareUrl,
      })
    } else {
      await navigator.clipboard.writeText(shareUrl)
      alert("Certificate link copied to clipboard!")
    }
  }

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center p-6">
      {/* Certificate Card */}
      <div
        id="certificate"
        className="w-full max-w-3xl bg-gradient-to-br from-[#0d1117] to-[#1a1f2e] border-2 border-violet-500/30 rounded-3xl p-10 shadow-[0_0_80px_rgba(139,92,246,0.2)] text-white"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-violet-300 text-sm font-medium">Korva Tech Hub</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Certificate of Completion</h1>
          <p className="text-white/50 text-sm">This certifies that</p>
        </div>

        {/* Student Name */}
        <div className="text-center my-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
            {certificate.student_name}
          </h2>
        </div>

        {/* Course */}
        <div className="text-center mb-8">
          <p className="text-white/60 text-lg mb-2">has successfully completed</p>
          <h3 className="text-2xl font-bold text-white">{certificate.course_name}</h3>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-white/40 mb-1">Date Issued</p>
            <p className="text-sm font-semibold text-white">
              {new Date(certificate.issued_at).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center mx-auto mb-1">
              <span className="text-2xl font-bold text-violet-300">K</span>
            </div>
            <p className="text-xs text-white/40">Korva Tech Hub</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/40 mb-1">Certificate ID</p>
            <p className="text-sm font-mono text-white">{certificate.certificate_number}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-8">
        <Button
          onClick={handleShare}
          variant="outline"
          className="gap-2 border-white/20 text-white hover:bg-white/10"
        >
          <Share2 className="w-4 h-4" />
          Copy Link
        </Button>
        <Button
          onClick={handleShareLinkedIn}
          className="gap-2 bg-[#0077b5] hover:bg-[#006097] text-white"
        >
          Share on LinkedIn
        </Button>
      </div>
    </div>
  )
}