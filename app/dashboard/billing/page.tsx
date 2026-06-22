'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Check, Download } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function BillingPage() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and payment methods.
        </p>
      </motion.div>

      {/* Current Plan */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Current Plan</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Pro Plan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Unlimited access to all courses and features
                </p>
              </div>
              <Badge className="bg-accent/20 text-accent">Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 py-4 border-y border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Next Billing Date</p>
                <p className="font-semibold text-foreground">July 15, 2026</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Billing Cycle</p>
                <p className="font-semibold text-foreground">Monthly</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="font-semibold text-foreground">₦50,000/month</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" variant="outline">
                Change Plan
              </Button>
              <Button className="flex-1" variant="outline">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Plans Comparison */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">All Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Basic',
              price: 'Free',
              description: 'Get started',
              features: [
                'Access to core courses',
                'Limited projects',
                'Community support',
              ],
              current: false,
            },
            {
              name: 'Pro',
              price: '₦50,000',
              period: '/month',
              description: 'Most popular',
              features: [
                'All courses unlimited',
                'Advanced projects',
                'Priority support',
                '1-on-1 mentoring',
                'Certificate of completion',
              ],
              current: true,
            },
            {
              name: 'Elite',
              price: '₦100,000',
              period: '/month',
              description: 'Premium experience',
              features: [
                'Everything in Pro',
                'Career coaching',
                'Job placement',
                'Portfolio review',
                'Interview preparation',
              ],
              current: false,
            },
          ].map((plan, idx) => (
            <Card
              key={idx}
              className={`bg-card border-2 ${
                plan.current ? 'border-accent' : 'border-border'
              } hover:border-primary/50 transition-colors`}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={plan.current ? 'default' : 'outline'}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Billing History */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Billing History</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="space-y-3">
              {[
                { date: 'June 15, 2026', amount: '₦50,000', status: 'Paid', invoice: '001' },
                { date: 'May 15, 2026', amount: '₦50,000', status: 'Paid', invoice: '002' },
                { date: 'April 15, 2026', amount: '₦50,000', status: 'Paid', invoice: '003' },
              ].map((invoice, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">
                      Invoice #{invoice.invoice}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-foreground">
                      {invoice.amount}
                    </span>
                    <Badge className="bg-accent/20 text-accent">
                      {invoice.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Method */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Payment Method</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <CreditCard className="w-8 h-8 text-accent" />
                <div>
                  <p className="font-semibold text-foreground">Mastercard</p>
                  <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Expires</p>
                <p className="font-semibold text-foreground">12/25</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Update Payment
              </Button>
              <Button variant="outline" className="flex-1">
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
