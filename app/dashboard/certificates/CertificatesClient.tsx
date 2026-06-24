'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Award, Trophy, Share2, ExternalLink } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Certificate = {
  id: string
  student_name: string
  course_name: string
  certificate_number: string
  issued_at: string
}

type Enrollment = {
  id: string
  course_id: string
  courseCode: string | null
  courseName: string
  totalLessons: number
  completedLessons: number
  progressPercent: number
  hasCertificate: boolean
}

type Props = {
  certificates: Certificate[]
  enrollments: Enrollment[]
  userId: string
  studentName: string  // ← add this
}

export default function CertificatesClient({ certificates, enrollments, userId, studentName }: Props) {
  const router = useRouter()
  const [claiming, setclaiming] = useState<string | null>(null)

  const inProgress = enrollments.filter(
    (e) => e.progressPercent < 100 && !e.hasCertificate
  )
  const readyToClaim = enrollments.filter(
    (e) => e.progressPercent === 100 && !e.hasCertificate
  )

  const handleClaim = async (enrollment: Enrollment) => {
    setclaiming(enrollment.id)

    try {
      const res = await fetch("/api/certificates/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            enrollmentId: enrollment.id,
            courseId: enrollment.course_id,
            studentName, // ← now uses real name
            courseName: enrollment.courseName,
            issuedBy: "system",
            }),
      })

      const result = await res.json()

      if (result.success) {
        router.refresh()
      } else {
        alert(result.error ?? "Failed to issue certificate")
      }
    } catch {
      alert("Something went wrong")
    } finally {
      setclaiming(null)
    }
  }

  const handleShare = async (certificate: Certificate) => {
    const url = `${window.location.origin}/certificate/${certificate.id}`
    if (navigator.share) {
      await navigator.share({
        title: `${certificate.course_name} Certificate`,
        text: `I just earned a certificate in ${certificate.course_name} from Korva Tech Hub!`,
        url,
      })
    } else {
      await navigator.clipboard.writeText(url)
      alert("Certificate link copied!")
    }
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Certificates</h1>
        <p className="text-muted-foreground">Track your certifications and achievements.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Earned", value: certificates.length.toString(), icon: Trophy, color: "text-accent" },
          { label: "Ready to Claim", value: readyToClaim.length.toString(), icon: Award, color: "text-green-400" },
          { label: "In Progress", value: inProgress.length.toString(), icon: Award, color: "text-primary" },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-card border-border">
              <CardContent className="pt-6">
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Ready to Claim */}
      {readyToClaim.length > 0 && (
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-foreground mb-4">Ready to Claim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readyToClaim.map((enrollment) => (
              <Card key={enrollment.id} className="bg-card border-2 border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{enrollment.courseName}</h3>
                    <Badge className="bg-green-500/20 text-green-400">100% Complete</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    You have completed all {enrollment.totalLessons} lessons. Claim your certificate now!
                  </p>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-500 text-white"
                    onClick={() => handleClaim(enrollment)}
                    disabled={claiming === enrollment.id}
                  >
                    {claiming === enrollment.id ? "Issuing..." : "Claim Certificate"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Earned Certificates */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Your Certificates</h2>
        {certificates.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="text-center py-12">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No certificates earned yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Complete all lessons in a course to earn your certificate.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                      <h3 className="text-lg font-bold text-foreground">{cert.course_name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Issued {new Date(cert.issued_at).toLocaleDateString("en-NG", {
                          day: "numeric", month: "long", year: "numeric"
                        })}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">
                        {cert.certificate_number}
                      </p>
                    </div>
                    <Badge className="bg-accent/20 text-accent shrink-0">Earned</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => router.push(`/certificate/${cert.id}`)}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => handleShare(cert)}
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>

      {/* In Progress */}
      {inProgress.length > 0 && (
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-foreground mb-4">In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgress.map((enrollment) => (
              <Card key={enrollment.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{enrollment.courseName}</h3>
                    <Badge className="bg-primary/20 text-primary">
                      {enrollment.progressPercent}%
                    </Badge>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                      style={{ width: `${enrollment.progressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {enrollment.completedLessons} / {enrollment.totalLessons} lessons completed
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}