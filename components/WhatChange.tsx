import React from 'react'
import FeatureStrip from './FeatureStrip'
import { Compass, ShieldCheck, ShoppingCart, TriangleAlert, UserRound } from 'lucide-react'
import SectionIntro from '@/components/SectionIntro'
import SectionSpacer from './SectionSpacer'
import ProblemHighlightCard from './ProblemHighlightCard'



const WhatChange = () => {

    const problemList = [
        {
            order: 1,
            text: 'Stronger trust',
            icon: <ShieldCheck className="size-[18px] text-black" strokeWidth={2.2} />,
            label: 'Trust',

        },
        {
            order: 2,
            text: ' Better lead quality ',
            icon: <UserRound className="size-[18px] text-black" strokeWidth={2.2} />,
            label: 'Leads',

        },
        {
            order: 3,
            text: 'Clearer positioning',
            icon: <Compass className="size-[18px] text-black" strokeWidth={2.2} />,
            label: 'Position',

        },
        {
            order: 4,
            text: 'Easier sales',
            icon: <ShoppingCart className="size-[18px] text-black" strokeWidth={2.2} />,
            label: 'Sales',

        },



    ]

    return (
        <div className='text-center'>
            <SectionIntro
                topContent={
                    <FeatureStrip
                        text="What changes?"
                        icon={<TriangleAlert size={16} strokeWidth={2} />}
                    />
                }
                title="What a stronger digital presence actually does"
                description={
                    <>
                        When your website, messaging, and brand presentation work together, your business becomes easier to trust,  easier to understand, and easier to choose.
                    </>
                }
            />

            <SectionSpacer />
            <div className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-0">
                {problemList.map((list) => (
                    <ProblemHighlightCard
                        key={list.order}
                        number={list.order}
                        text={list.text}
                        icon={list.icon}
                        label={list.label}
                        hideFooter
                        className="w-full"
                    />
                ))}
            </div>

        </div>
    )
}

export default WhatChange
