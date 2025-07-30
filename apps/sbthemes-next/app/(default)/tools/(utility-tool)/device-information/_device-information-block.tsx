'use client'
import React, { useEffect, useState } from 'react'

const DeviceInformationBlock = () => {
    const [mounted, setMounted] = useState(true)

    useEffect(() => {
        setMounted(false)
    }, [])

    const getAllDeviceInfo = () => {
        if (typeof window !== 'undefined') {
            const deviceInfo = {
                screen: {
                    width: window.screen.width,
                    height: window.screen.height,
                    colorDepth: window.screen.colorDepth,
                    pixelRatio: window.devicePixelRatio,
                    orientation: screen.orientation
                        ? screen.orientation.type
                        : 'N/A',
                    orientationAngle: screen.orientation
                        ? screen.orientation.angle
                        : 'N/A',
                    availWidth: window.screen.availWidth,
                    availHeight: window.screen.availHeight,
                    windowSize: {
                        width: window.innerWidth,
                        height: window.innerHeight,
                    },
                },
                device: {
                    vendor: navigator.vendor,
                    languages: navigator.languages,
                    platform: navigator.platform,
                    userAgent: navigator.userAgent,
                },
            }
            return deviceInfo
        }
        return null
    }

    const deviceInfo = getAllDeviceInfo()

    return (
        !mounted && (
            <div className="container my-5 grid grid-cols-1 gap-5 lg:my-14 xl:grid-cols-2">
                <div className="rounded-2xl border border-border bg-gray-100 p-4 lg:p-8 xl:grid-cols-2">
                    <div className="mb-5 text-xl font-bold text-primary">
                        Screen
                    </div>
                    {!!deviceInfo && (
                        <div className="grid grid-cols-1 gap-2.5 sm:gap-4 sm:grid-cols-2 xl:grid-cols-2">
                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    Screen size
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {deviceInfo?.screen?.availWidth} x{' '}
                                    {deviceInfo?.screen?.availHeight}
                                </div>
                            </div>

                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    Orientation
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {deviceInfo?.screen?.orientation}
                                </div>
                            </div>

                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    {' '}
                                    Orientation angle
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {' '}
                                    {deviceInfo?.screen?.orientationAngle}
                                </div>
                            </div>
                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    Color depth
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {deviceInfo?.screen?.colorDepth}
                                </div>
                            </div>

                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    Pixel ratio
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {deviceInfo?.screen?.pixelRatio}
                                </div>
                            </div>

                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    Window size
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {deviceInfo?.screen?.windowSize?.width} x{' '}
                                    {deviceInfo?.screen?.windowSize?.height}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="rounded-2xl border border-border bg-gray-100 p-4 lg:p-8 xl:grid-cols-2">
                    <div className="mb-5 text-xl font-bold text-primary">
                        Device
                    </div>
                    {!!deviceInfo && (
                        <div className="grid grid-cols-1 gap-2.5 sm:gap-4 sm:grid-cols-2 xl:grid-cols-2">
                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    Browser vendor
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {deviceInfo?.device?.vendor}
                                </div>
                            </div>
                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    Languages
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {deviceInfo?.device?.languages?.join(', ')}
                                </div>
                            </div>
                            <div className="flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                                <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                    Platform
                                </label>
                                <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                    {deviceInfo?.device?.platform}
                                </div>
                            </div>
                        </div>
                    )}
                    {!!deviceInfo && (
                        <div className="mt-2.5 sm:mt-5 flex grow flex-col overflow-hidden rounded-xl border border-border bg-white">
                            <label className="block border-b border-border py-1.5 px-2 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                                User agent
                            </label>
                            <div className="px-2 py-2.5 text-xl font-semibold text-black sm:p-4">
                                {deviceInfo?.device?.userAgent}
                            </div>
                        </div>  
                    )}
                </div>
            </div>
        )
    )
}

export default DeviceInformationBlock
