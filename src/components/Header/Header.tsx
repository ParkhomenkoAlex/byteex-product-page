import {useEffect, useState} from 'react'
import {sanityClient} from '../../lib/sanity'

type HeaderContent = {
    desktopText: string
    mobileText: string
}

function Header() {
    const [headerContent, setHeaderContent] = useState<HeaderContent | null>(null)

    useEffect(() => {
        sanityClient
            .fetch<HeaderContent | null>(
                `*[_type == "header"][0]{desktopText, mobileText}`,
            )
            .then(setHeaderContent)
            .catch((error) => {
                console.error('Failed to load header:', error)
            })
    }, [])

    return (
        <header className="flex h-9 items-center justify-center bg-[#FDFBF7] px-4">
            {headerContent && (
                <>
                    <p className="hidden text-center text-[11px] font-normal leading-[35px] tracking-[0.08em] text-black md:block">
                        {headerContent.desktopText}
                    </p>

                    <p className="block text-center text-[11px] font-normal leading-[35px] tracking-[0.08em] text-black md:hidden">
                        {headerContent.mobileText}
                    </p>
                </>
            )}
        </header>
    )
}

export default Header