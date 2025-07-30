import React from 'react'
import Image from 'next/image'

export default function ClientReviews() {
    return (
        <div className="container py-8 sm:py-12 lg:py-20">
            <div className="mx-auto mb-8 w-full space-y-1.5 text-center md:max-w-[472px] lg:space-y-2.5">
                <h2 className="inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-xl font-semibold tracking-tight text-transparent lg:text-[28px]/9">
                    Loved by hundreds
                </h2>
                <p className="text-sm font-medium lg:px-9 lg:text-base">
                    We are proud to have helped hundreds of customers around the
                    world.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3 xl:gap-[30px]">
                <div className="flex flex-col gap-4 xl:gap-[30px]">
                    <div className="space-y-3 rounded-[20px] border border-border p-5 sm:space-y-5">
                        <div className="flex gap-2.5">
                            <div className="size-10 overflow-hidden rounded-xl">
                                <Image
                                    src="/images/profile1.png"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    alt="User"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-sm/[18px] font-semibold text-primary">
                                    Thomas Patterson
                                </h3>
                                <p className="text-xs/4 font-medium">
                                    Front End Developer
                                </p>
                            </div>
                        </div>
                        <p className="text-sm/5 font-medium lg:text-base/[26px]">
                            sbthemes is my go-to for&nbsp;
                            <span className="rounded-md bg-gray/[0.07] p-px text-primary lg:p-[3px]">
                                top-quality
                            </span>
                            &nbsp; web design templates 🎉
                        </p>
                        {/* <div className="flex gap-1.5">
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-border text-border" />
                        </div> */}
                        {/* <p className="text-xs/[14px] font-medium">
                            February 9, 2015
                        </p> */}
                    </div>
                    <div className="space-y-3 rounded-[20px] border border-border p-5 sm:space-y-5">
                        <div className="flex gap-2.5">
                            <div className="size-10 overflow-hidden rounded-xl">
                                <Image
                                    src="/images/profile2.png"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    alt="User"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-sm/[18px] font-semibold text-primary">
                                    Isabella Wilson
                                </h3>
                                <p className="text-xs/4 font-medium">
                                    UI/UX Designer
                                </p>
                            </div>
                        </div>
                        <p className="text-sm/5 font-medium lg:text-base/[26px]">
                            Great selection at sbthemes&nbsp;
                            <span className="rounded-md bg-gray/[0.07] p-px text-primary lg:p-[3px]">
                                I found the perfect fit for my business in no
                                time
                            </span>
                            &nbsp; available.
                        </p>

                        {/* <p className="text-xs/[14px] font-medium">
                            April 28, 2016
                        </p> */}
                    </div>
                    <div className="space-y-3 rounded-[20px] border border-border p-5 sm:space-y-5">
                        <div className="flex gap-2.5">
                            <div className="size-10 overflow-hidden rounded-xl">
                                <Image
                                    src="/images/profile3.png"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    alt="User"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-sm/[18px] font-semibold text-primary">
                                    Thomas Lee
                                </h3>
                                <p className="text-xs/4 font-medium">
                                    Chief Executive Officer
                                </p>
                            </div>
                        </div>
                        <p className="text-sm/5 font-medium lg:text-base/[26px]">
                            Fantastic templates from sbthemes with&nbsp;
                            <span className="rounded-md bg-gray/[0.07] p-px text-primary lg:p-[3px]">
                                excellent support
                            </span>
                            &nbsp;my website has never looked better
                        </p>
                        {/* <div className="flex gap-1.5">
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-border text-border" />
                        </div>
                        <p className="text-xs/[14px] font-medium">
                            May 6, 2012
                        </p> */}
                    </div>
                </div>
                <div className="flex flex-col gap-4 xl:gap-[30px]">
                    <div className="space-y-3 rounded-[20px] border border-border p-5 sm:space-y-5">
                        <div className="flex gap-2.5">
                            <div className="size-10 overflow-hidden rounded-xl">
                                <Image
                                    src="/images/profile4.png"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    alt="User"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-sm/[18px] font-semibold text-primary">
                                    Hazel Simmons
                                </h3>
                                <p className="text-xs/4 font-medium">
                                    Human Resource Manager
                                </p>
                            </div>
                        </div>
                        <p className="text-sm/5 font-medium lg:text-base/[26px]">
                            As an early user of sbthemes&apos; theme templates,
                            it has been an amazing investment of time.&nbsp;
                            <span className="rounded-md bg-gray/[0.07] p-px text-primary lg:p-[3px]">
                                The templates are top-notch and an affordable
                                alternative to other UI libraries out there.
                            </span>
                            &nbsp; They’re very easy to customize, and iterating
                            over received feedback is at the core of their
                            product. I&apos;m excited to check out Nexadash and
                            the additional templates to come!
                        </p>
                        {/* <div className="flex gap-1.5">
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-border text-border" />
                        </div>
                        <p className="text-xs/[14px] font-medium">
                            August 7, 2017
                        </p> */}
                    </div>
                    <div className="space-y-3 rounded-[20px] border border-border p-5 sm:space-y-5">
                        <div className="flex gap-2.5">
                            <div className="size-10 overflow-hidden rounded-xl">
                                <Image
                                    src="/images/profile5.png"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    alt="User"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-sm/[18px] font-semibold text-primary">
                                    Sophie Ray
                                </h3>
                                <p className="text-xs/4 font-medium">
                                    Senior Developer
                                </p>
                            </div>
                        </div>
                        <p className="text-sm/5 font-medium lg:text-base/[26px]">
                            The UI on sbthemes’ templates is&nbsp;
                            <span className="rounded-md bg-gray/[0.07] p-px text-primary lg:p-[3px]">
                                sleek and modern
                            </span>
                            &nbsp;. My clients love it!
                        </p>
                        {/* <div className="flex gap-1.5">
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-border text-border" />
                            <Star className="size-3.5 shrink-0 fill-border text-border" />
                        </div>
                        <p className="text-xs/[14px] font-medium">
                            July 14, 2015
                        </p> */}
                    </div>
                </div>
                <div className="flex flex-col gap-4 xl:gap-[30px]">
                    <div className="space-y-3 rounded-[20px] border border-border p-5 sm:space-y-5">
                        <div className="flex gap-2.5">
                            <div className="size-10 overflow-hidden rounded-xl">
                                <Image
                                    src="/images/profile6.png"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    alt="User"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-sm/[18px] font-semibold text-primary">
                                    Charles Martinez
                                </h3>
                                <p className="text-xs/4 font-medium">
                                    Freelance Designer
                                </p>
                            </div>
                        </div>
                        <p className="text-sm/5 font-medium lg:text-base/[26px]">
                            Absolutely&nbsp;
                            <span className="rounded-md bg-gray/[0.07] p-px text-primary lg:p-[3px]">
                                loving the components!
                            </span>
                            &nbsp;They’re so intuitive and versatile. Excited to
                            see what’s next! 🙌&quot;
                        </p>
                        {/* <p className="text-xs/[14px] font-medium">
                            August 24, 2013
                        </p> */}
                    </div>
                    <div className="space-y-3 rounded-[20px] border border-border p-5 sm:space-y-5">
                        <div className="flex gap-2.5">
                            <div className="size-10 overflow-hidden rounded-xl">
                                <Image
                                    src="/images/profile7.png"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    alt="User"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-sm/[18px] font-semibold text-primary">
                                    Victoria Hughes
                                </h3>
                                <p className="text-xs/4 font-medium">
                                    Startup Founder
                                </p>
                            </div>
                        </div>
                        <p className="text-sm/5 font-medium lg:text-base/[26px]">
                            sbthemes transformed my website simple to use
                            with&nbsp;
                            <span className="rounded-md bg-gray/[0.07] p-px text-primary lg:p-[3px]">
                                stunning results
                            </span>
                        </p>
                        {/* <div className="flex gap-1.5">
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                            <Star className="size-3.5 shrink-0 fill-secondary text-secondary" />
                        </div>
                        <p className="text-xs/[14px] font-medium">
                            May 20, 2015
                        </p> */}
                    </div>
                    <div className="space-y-3 rounded-[20px] border border-border p-5 sm:space-y-5">
                        <div className="flex gap-2.5">
                            <div className="size-10 overflow-hidden rounded-xl">
                                <Image
                                    src="/images/profile8.png"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    alt="User"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-sm/[18px] font-semibold text-primary">
                                    David Carter
                                </h3>
                                <p className="text-xs/4 font-medium">
                                    Marketing Manager
                                </p>
                            </div>
                        </div>
                        <p className="text-sm/5 font-medium lg:text-base/[26px]">
                            The ease of use with sbthemes templates is a&nbsp;
                            <span className="rounded-md bg-gray/[0.07] p-px text-primary lg:p-[3px]">
                                game-changer
                            </span>
                            &nbsp;. I had my site up in minutes!
                        </p>

                        {/* <p className="text-xs/[14px] font-medium">
                            November 28, 2015
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
