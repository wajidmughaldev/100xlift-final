import { NextResponse } from 'next/server'

type LeadFormPayload = {
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

const emailJsApiUrl = 'https://api.emailjs.com/api/v1.0/email/send'

const sendEmailJsEmail = async ({
  serviceId,
  templateId,
  publicKey,
  privateKey,
  templateParams,
}: {
  serviceId: string
  templateId: string
  publicKey: string
  privateKey?: string
  templateParams: Record<string, unknown>
}) => {
  const payload: Record<string, unknown> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: templateParams,
  }

  if (privateKey) {
    payload.accessToken = privateKey
  }

  const response = await fetch(emailJsApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`EmailJS error: ${errorText}`)
  }
}

const normalizeValue = (value?: string) => value?.trim() || 'Not specified'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadFormPayload

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID
    const publicKey = process.env.EMAILJS_PUBLIC_KEY
    const privateKey = process.env.EMAILJS_PRIVATE_KEY
    const adminTemplateId = process.env.EMAILJS_ADMIN_TEMPLATE_ID
    const confirmationTemplateId =
      process.env.EMAILJS_CONFIRMATION_TEMPLATE_ID
    const notifyToEmail = process.env.EMAILJS_TO_EMAIL || '100xlift@gmail.com'

    if (
      !serviceId ||
      !publicKey ||
      !adminTemplateId ||
      !confirmationTemplateId
    ) {
      return NextResponse.json(
        {
          error:
            'Email service is not configured. Add EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_ADMIN_TEMPLATE_ID, and EMAILJS_CONFIRMATION_TEMPLATE_ID.',
        },
        { status: 500 }
      )
    }

    const services = body.services?.filter(Boolean).join(', ') || 'Not specified'
    const adminSubject =
      body.source === 'proposal-modal'
        ? `New proposal request from ${body.name}`
        : `New website form lead from ${body.name}`

    const sharedParams = {
      source: body.source,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: normalizeValue(body.phone),
      company: normalizeValue(body.company),
      website: normalizeValue(body.website),
      project_type: normalizeValue(body.projectType),
      budget: normalizeValue(body.budget),
      timeline: normalizeValue(body.timeline),
      details: normalizeValue(body.details),
      services,
    }

    await Promise.all([
      sendEmailJsEmail({
        serviceId,
        templateId: adminTemplateId,
        publicKey,
        privateKey,
        templateParams: {
          ...sharedParams,
          to_email: notifyToEmail,
          reply_to: body.email.trim(),
          subject: adminSubject,
        },
      }),
      sendEmailJsEmail({
        serviceId,
        templateId: confirmationTemplateId,
        publicKey,
        privateKey,
        templateParams: {
          ...sharedParams,
          to_email: body.email.trim(),
          reply_to: notifyToEmail,
          subject: 'We received your request - 100XLift',
        },
      }),
    ])

    return NextResponse.json({
      message: 'Your request has been sent successfully.',
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to send your request right now.',
      },
      { status: 500 }
    )
  }
}
