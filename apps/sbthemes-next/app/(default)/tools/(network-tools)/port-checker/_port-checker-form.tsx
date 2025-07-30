'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

const PortList = [
    { value: '21', label: '21 FTP' },
    { value: '22', label: '22 SSH' },
    { value: '23', label: '23 Telnet' },
    { value: '25', label: '25 SMTP' },
    { value: '53', label: '53 DNS' },
    { value: '80', label: '80 HTTP' },
    { value: '110', label: '110 POP3' },
    { value: '115', label: '115 SFTP' },
    { value: '135', label: '135 RPC' },
    { value: '139', label: '139 NetBIOS' },
    { value: '143', label: '143 IMAP' },
    { value: '194', label: '194 IRC' },
    { value: '443', label: '443 SSL' },
    { value: '445', label: '445 SMB' },
    { value: '1433', label: '1433 MSSQL' },
    { value: '2083', label: '2083 RADSEC' },
    { value: '3306', label: '3306 MySQL' },
    { value: '3389', label: '3389 Remote Desktop' },
    { value: '5632', label: '5632 PCAnywhere' },
    { value: '5900', label: '5900 VNC' },
]

const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/\S*)?$/
const domainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/
const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

type IForm = {
    value: string
    port: string
}

const PortCheckerForm = () => {
    const [result, setResult] = useState<any>(null)
    const {
        watch,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            value: '',
            port: '21',
        },
    })

    const identifyInputType = (value: string) => {
        if (ipRegex.test(value)) {
            return 'ip'
        } else if (urlRegex.test(value)) {
            return 'url'
        } else if (domainRegex.test(value)) {
            return 'domain'
        } else {
            return ''
        }
    }

    const validate = async (data: IForm) => {
        if (!data.port || !data.value) {
            toast({
                title: 'Please enter a port or domain or IP',
                variant: 'error',
            })
            return
        }

        if (!identifyInputType(data.value)) {
            toast({
                title: 'Please enter valid port or domain or IP',
                variant: 'error',
            })
            return
        }

        if (identifyInputType(data.value) === 'url') {
            let domain = null
            if (
                data.value.startsWith('http://') ||
                data.value.startsWith('https://')
            ) {
                domain = new URL(data.value)?.hostname
            } else {
                domain = data.value
            }

            try {
                const { data } = await axios.get('/api/get-ip', {
                    params: {
                        domain: domain,
                    },
                })
                return data?.ip
            } catch {}
        }

        return watch('value')
    }

    const checkPort = async (data: IForm) => {
        const ip = await validate(data)
        if (!!ip)
            try {
                const { data } = await axios.get(
                    `/api/check-port?ip=${ip}&port=${watch('port')}`,
                )
                setResult(data)
            } catch {}
    }

    return (
        <div className="container my-5 max-w-5xl gap-5 lg:my-14">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8">
                <form className="space-y-5" onSubmit={handleSubmit(checkPort)}>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                                Enter IP or domain
                            </label>
                            <div className="flex gap-2.5">
                                <Input
                                    type="text"
                                    value={watch('value')}
                                    placeholder="Enter IP or domain"
                                    onChange={(e) => {
                                        setValue('value', e.target.value)
                                        setResult(null)
                                    }}
                                    className="w-full p-2 md:p-3"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                                    Port number
                                </label>
                                <div className="flex gap-2.5">
                                    <Input
                                        type="text"
                                        value={watch('port')}
                                        className="w-full p-2 md:p-3"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <Select
                                    value={watch('port')}
                                    onValueChange={(e) => {
                                        setResult(null)
                                        setValue('port', e)
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PortList.map((format) => (
                                            <SelectItem
                                                key={format.value}
                                                value={format.value}
                                            >
                                                {format.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Button type="submit" loading={isSubmitting}>
                            Check
                        </Button>
                    </div>
                </form>

                {!!result && result?.status === 'SUCCESS' && (
                    <div className="flex gap-1 rounded-md bg-white p-4">
                        <div className="font-semibold text-black">
                            {result?.ip}
                        </div>
                        <div>
                            port {'-'}
                            {result?.port}
                        </div>
                        <div className="font-semibold text-black/50">
                            {!!result?.isPortOpen ? (
                                <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-success"></div>
                                    <div>Open</div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-danger"></div>
                                    <div>Blocked</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PortCheckerForm
