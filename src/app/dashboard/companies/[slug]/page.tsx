'use client'

import { companies } from '@/lib/data/companies'
import CompanyDetailView from '@/components/CompanyDetailView'
import { useRouter } from 'next/navigation'
import { use } from 'react'

export default function CompanySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const unwrappedParams = use(params)
  const company = companies.find((c) => c.slug === unwrappedParams.slug)

  if (!company) {
    return (
      <div className="page active">
        <div className="page-header">
          <div>
            <div className="page-title">Company Not Found</div>
            <div className="page-sub">The company you are looking for does not exist in our records.</div>
          </div>
        </div>
        <button type="button" className="btn-primary" onClick={() => router.push('/dashboard/companies')}>
          Back to Companies
        </button>
      </div>
    )
  }

  return <CompanyDetailView company={company} onBack={() => router.push('/dashboard/companies')} />
}
