import Image from "next/image"
import FeatureStrip from "./FeatureStrip"
import IconStrip from "./IconStrip"
import { CircleDot, CircleQuestionMark } from "lucide-react"
import SectionIntro from "./SectionIntro"

const Whyus = () => {
    const iconItems = [
        { href: "https://www.facebook.com/profile.php?id=61586106101272", label: "Facebook", iconSrc: "/icons/facebook.png" },
        { href: "https://www.linkedin.com/company/110819732", label: "LinkedIn", iconSrc: "/icons/linkedin.png" },
        { href: "https://instagram.com", label: "Instagram", iconSrc: "/icons/instagram.png" },
        { href: "mailto:100xlift@gmail.com", label: "Email", iconSrc: "/icons/email.png" },
        { href: "tel:+923361815141", label: "Phone", iconSrc: "/icons/phone-call.png" },
        { href: "https://wa.me/923361815141", label: "WhatsApp", iconSrc: "/icons/whatsapp.png" },
    ]

    return (
        <section className="mx-auto flex w-full max-w-[1160px] flex-col gap-10 px-4 py-6 text-[var(--page-fg)] lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
            <div className="order-1 lg:hidden">
                <SectionIntro
                    topContent={
                        <FeatureStrip
                            className="mx-auto justify-center"
                            text="Why us"
                            icon={<CircleQuestionMark size={16} strokeWidth={2} />}
                        />
                    }
                    title="We do not just make things look better. We make them work harder."
                    description="Most agencies sell disconnected deliverables. We look at the full customer-facing system so your website, messaging, branding, and visibility work together instead of pulling in different directions."
                    className="gap-0"
                />
            </div>

            <div className="order-2 w-full lg:order-1">
                <Image
                    src="/whyus.png"
                    alt="Why us showcase"
                    width={760}
                    height={760}
                    className="mx-auto h-auto w-full max-w-[760px] object-contain lg:max-w-none"
                />
            </div>

            <div className="order-3 flex w-full flex-col gap-4 text-center lg:order-2 lg:text-left">
                <div className="hidden lg:block">
                    <FeatureStrip
                        className="mx-auto justify-center lg:mx-0 lg:justify-start"
                        text="Why us"
                        icon={<CircleQuestionMark size={16} strokeWidth={2} />}
                    />
                </div>

                <h2 className="hidden max-w-[680px] text-balance text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.05em] lg:block lg:text-[3rem]">
                    We do not just make things look better.
                    <br className="hidden sm:block" />
                    {" "}We make them work harder.
                </h2>

                <p className="hidden text-balance text-[0.98rem] leading-7 text-[var(--muted-fg)] lg:block lg:max-w-[640px] lg:text-[1.08rem]">
                    Most agencies sell disconnected deliverables. We look at the full customer-facing system so your website, messaging, branding, and visibility work together instead of pulling in different directions.
                </p>

                <ul className="flex flex-col gap-3 text-left">
                    <li className="flex items-start gap-2 text-[0.98rem] leading-6 sm:text-[1rem]">
                        <CircleDot size={16} strokeWidth={2} className="mt-1 shrink-0 text-[#BFEF2E]" />
                        <span>Strategy and execution under one roof</span>
                    </li>
                    <li className="flex items-start gap-2 text-[0.98rem] leading-6 sm:text-[1rem]">
                        <CircleDot size={16} strokeWidth={2} className="mt-1 shrink-0 text-[#BFEF2E]" />
                        <span>Built for trust, clarity, and lead flow</span>
                    </li>
                    <li className="flex items-start gap-2 text-[0.98rem] leading-6 sm:text-[1rem]">
                        <CircleDot size={16} strokeWidth={2} className="mt-1 shrink-0 text-[#BFEF2E]" />
                        <span>Practical work without bloated process</span>
                    </li>
                </ul>

                <IconStrip
                    items={iconItems}
                    className="justify-start pt-3 lg:justify-start"
                    openInNewTab={false}
                />
            </div>
        </section>
    )
}

export default Whyus
