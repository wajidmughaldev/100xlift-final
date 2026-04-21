import React from 'react'
import FeatureStrip from './FeatureStrip'
import { Globe, MessageSquareText, Palette, TriangleAlert, TrendingDown } from 'lucide-react'
import SectionIntro from '@/components/SectionIntro'
import SectionSpacer from './SectionSpacer'
import ProblemHighlightCard from './ProblemHighlightCard'



const TheRealProblem = () => {

    const problemList = [
        {
            order: 1,
            text: 'Outdated website Looks less credible',
            icon: <Globe className="size-[18px] text-black" strokeWidth={2.2} />,
            label: 'Credibility',

        },
        {
            order: 2,
            text: 'Unclear messaging Visitors do not quickly understand your value  ',
            icon: <MessageSquareText className="size-[18px] text-black" strokeWidth={2.2} />,
            label: 'Clarity',

        },
        {
            order: 3,
            text: 'Inconsistent branding Brand feels scattered',
            icon: <Palette className="size-[18px] text-black" strokeWidth={2.2} />,
            label: 'Brand',

        },
        {
            order: 4,
            text: 'Weak conversion path Traffic comes in but too few real inquiries happen',
            icon: <TrendingDown className="size-[18px] text-black" strokeWidth={2.2} />,
            label: 'Conversion',

        },



    ]

    return (
        <div className='text-center'>
            <SectionIntro
                topContent={
                    <FeatureStrip
                        text="The real problem"
                        icon={<TriangleAlert size={16} strokeWidth={2} />}
                    />
                }
                title="Why good businesses still lose leads online?"
                description={
                    <>
                        Most businesses do not have a traffic problem first. They have a trust,
                        <br />
                        clarity, and conversion problem.
                    </>
                }
            />

            <SectionSpacer />
            <div className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-0">
                {problemList.map((list) => (
                    <ProblemHighlightCard
                        key={list.order}
                        number={list.order}
                        text={list.text}
                        icon={list.icon}
                        label={list.label}
                        className="w-full"
                    />
                ))}
            </div>

        </div>
    )
}

export default TheRealProblem
