'use client'
import React, { useEffect, useState } from 'react'

import CopyToClipboard from '@/components/ui/copy-to-clipboard'

const KeycodeInfoBlock = () => {
    const [currentEvent, setCurrentEvent] = useState<any | null>(null)

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            setCurrentEvent(event)
        }

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    const getModifier = () => {
        if (currentEvent?.ctrlKey) {
            return 'Ctrl'
        } else if (currentEvent?.altKey) {
            return 'Alt'
        } else if (currentEvent?.shiftKey) {
            return 'Shift'
        } else if (currentEvent?.metaKey) {
            return 'Meta'
        } else {
            return 'None'
        }
    }

    return (
        <div className="container my-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 lg:space-y-4 lg:p-8 xl:col-span-2">
                <div className="rounded-xl border border-border bg-white p-7 text-center">
                    {!!currentEvent?.key && (
                        <div className="mb-3 text-2xl font-bold text-black">
                            {currentEvent?.key}
                        </div>
                    )}
                    <div>Press the key to get information.</div>
                </div>
                {!!currentEvent && (
                    <div className="space-y-2">
                        <div className="flex">
                            <div className="w-[30%] rounded-lg border bg-white p-3">
                                Key:
                            </div>
                            <div className="flex w-[70%] items-center justify-between gap-3">
                                <div className="flex-1 rounded-lg border bg-white p-3">
                                    {currentEvent?.key}
                                </div>
                                <CopyToClipboard
                                    text={currentEvent?.key}
                                    btnClass="p-3"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%] rounded-lg border bg-white p-3">
                                Keycode:
                            </div>
                            <div className="flex w-[70%] items-center justify-between gap-3">
                                <div className="flex-1 rounded-lg border bg-white p-3">
                                    {currentEvent?.keyCode}
                                </div>
                                <CopyToClipboard
                                    text={currentEvent?.keyCode.toString()}
                                    btnClass="p-3"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%] rounded-lg border bg-white p-3">
                                Code:
                            </div>
                            <div className="flex w-[70%] items-center justify-between gap-3">
                                <div className="flex-1 rounded-lg border bg-white p-3">
                                    {currentEvent?.code}
                                </div>
                                <CopyToClipboard
                                    text={currentEvent?.code}
                                    btnClass="p-3"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%] rounded-lg border bg-white p-3">
                                Location:
                            </div>
                            <div className="flex w-[70%] items-center justify-between gap-3">
                                <div className="flex-1 rounded-lg border bg-white p-3">
                                    {currentEvent?.location}
                                </div>
                                <CopyToClipboard
                                    text={currentEvent?.location.toString()}
                                    btnClass="p-3"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%] rounded-lg border bg-white p-3">
                                Modifiers:
                            </div>
                            <div className="flex w-[70%] items-center justify-between gap-3">
                                <div className="flex-1 rounded-lg border bg-white p-3">
                                    {getModifier()}
                                </div>
                                <CopyToClipboard
                                    text={getModifier()}
                                    btnClass="p-3"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default KeycodeInfoBlock
