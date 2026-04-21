export type LeadFormPayload = {
  source: 'proposal-modal' | 'project-start'
  name: string
  email: string
  phone?: string
  company?: string
  website?: string
  projectType?: string
  budget?: string
  timeline?: string
  details?: string
  services?: string[]
}

type LeadFormResponse = {
  message?: string
  error?: string
}

export async function submitLeadForm(payload: LeadFormPayload) {
  const response = await fetch('/api/forms/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as LeadFormResponse

  if (!response.ok) {
    throw new Error(data.error || 'Unable to send your request right now.')
  }

  return data
}
