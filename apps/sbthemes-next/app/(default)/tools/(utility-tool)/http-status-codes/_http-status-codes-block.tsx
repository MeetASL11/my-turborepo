'use client'

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'

const statusCodesList = {
    '1XX informational response': [
        {
            code: '100',
            name: 'Continue',
            description: 'Client can continue with the request.',
        },
        {
            code: '101',
            name: 'Switching protocols',
            description: 'Protocols are switching as requested by the client.',
        },
        {
            code: '102',
            name: 'Processing',
            description:
                'Server is processing the request but no response is available yet.',
        },
        {
            code: '103',
            name: 'Early hints',
            description:
                'Server provides hints to the client to preload resources before the final response.',
        },
    ],
    '2XX success': [
        {
            code: '200',
            name: 'Ok',
            description: 'Request succeeded.Resource returned.',
        },
        {
            code: '201',
            name: 'Created',
            description: 'Resource successfully created.',
        },
        {
            code: '202',
            name: 'Accepted',
            description: 'Request accepted, but not yet processed.',
        },
        {
            code: '203',
            name: 'Non-Authoritative Information',
            description: 'Information returned from a third-party source.',
        },
        {
            code: '204',
            name: 'No Content',
            description: 'Request succeeded, but no content returned.',
        },
        {
            code: '205',
            name: 'Reset Content',
            description: 'Client should reset the document view.',
        },
        {
            code: '206',
            name: 'Partial Content',
            description: 'Partial resource returned, often used for downloads.',
        },
        {
            code: '207',
            name: 'Multi-Status',
            description:
                'Provides the statuses of multiple resources, depending on how many sub-requests were made. ',
        },
        {
            code: '208',
            name: 'Already Reported',
            description:
                'The members of a DAV element have already been listed and won’t be included (repeated) again. ',
        },
        {
            code: '226',
            name: 'IM Used',
            description:
                'The server completed a GET request. And the response indicates one or more instance-manipulation in results.',
        },
    ],
    '3XX redirection': [
        {
            code: '300',
            name: 'Multiple Choices',
            description: 'Request has multiple possible responses.',
        },
        {
            code: '301',
            name: 'Moved Permanently',
            description:
                'The target resource has a new permanent URL.All future references will be redirected to that new URL.',
        },
        {
            code: '302',
            name: 'Found',
            description:
                'The requested resource has temporarily moved to a new URL.',
        },
        {
            code: '303',
            name: 'See Other',
            description:
                'Resource has permanently moved to a new URL. The browser displays the new URL.',
        },
        {
            code: '304',
            name: 'Not Modified',
            description:
                'The response is unchanged, so the client can use the cached version of the resource.',
        },
        {
            code: '305',
            name: 'Use Proxy',
            description:
                'The requested resource is available only through a proxy, the address for which is provided in the response.',
        },
        {
            code: '306',
            name: 'Switch Proxy',
            description:
                'No longer used. Originally meant "Subsequent requests should use the specified proxy."',
        },
        {
            code: '307',
            name: 'Temporary Redirect',
            description:
                'The request should be repeated with a different URI, but future requests should continue to use the original URI.',
        },
        {
            code: '308',
            name: 'Permanent Redirect',
            description:
                'The request and all future requests should be repeated using another URI.',
        },
    ],
    '4XX client error': [
        {
            code: '400',
            name: 'Bad Request',
            description:
                'The server can’t or won’t process the request due to a client error. ',
        },
        {
            code: '401',
            name: 'Unauthorized',
            description:
                'The user doesn’t have valid authentication credentials to get the requested resource.',
        },
        {
            code: '402',
            name: 'Payment Required',
            description:
                'Reserved for future use, this code was initially intended for digital payment systems but is rarely used and lacks a standard convention.',
        },
        {
            code: '403',
            name: 'Forbidden',
            description:
                'The client doesn’t have access rights to the content.',
        },
        {
            code: '404',
            name: 'Not Found',
            description:
                'The server can’t find the requested resource, and no redirection has been set.',
        },
        {
            code: '405',
            name: 'Method Not Allowed',
            description:
                'A request method is not supported for the requested resource.',
        },
        {
            code: '406',
            name: 'Not Acceptable',
            description:
                'The server doesn’t find any content that satisfies the criteria given according to the Accept headers requested.',
        },
        {
            code: '407',
            name: 'Proxy Authentication Required',
            description:
                'A client must  must authenticate the proxy before continue.',
        },
        {
            code: '408',
            name: 'Request Timeout',
            description: 'The server timed out waiting for the request.',
        },
        {
            code: '409',
            name: 'Conflict',
            description:
                'The server can’t fulfill the request because there’s a conflict with the resource.',
        },
        {
            code: '410',
            name: 'Gone',
            description:
                'The content requested has been permanently deleted from the server and will not be reinstated in future.',
        },
        {
            code: '411',
            name: 'Length Required',
            description:
                'The server rejects the request because it requires a defined content-Length header field.',
        },
        {
            code: '412',
            name: 'Precondition Failed',
            description:
                'The resource has preconditions in the header fields that the given data fails to meet. ',
        },
        {
            code: '413',
            name: 'Payload Too Large',
            description:
                'The client’s request is larger than the server’s defined limits, and the server refuses to process it. ',
        },
        {
            code: '414',
            name: 'URI Too Long',
            description:
                'The URI provided was too long for the server to process.',
        },
        {
            code: '415',
            name: 'Unsupported Media Type',
            description:
                'The request entity has a media type which the server or resource does not support.',
        },
        {
            code: '416',
            name: 'Range Not Satisfiable',
            description:
                'The server can’t fulfill the value indicated in the request’s Range header field.',
        },
        {
            code: '417',
            name: 'Expectation Failed',
            description:
                'The server cannot meet the requirements of the Expect request-header field.',
        },
        {
            code: '418',
            name: 'I’m a teapot',
            description:
                'The server refuses the attempt to brew coffee with a teapot.',
        },
        {
            code: '421',
            name: 'Misdirected Request',
            description:
                'A request to a server that can’t produce a response. ',
        },
        {
            code: '422',
            name: 'Unprocessable Entity',
            description:
                'The request was well-formed but was unable to be followed due to semantic errors.',
        },
        {
            code: '423',
            name: 'Locked',
            description: 'The resource that is being accessed is locked.',
        },

        {
            code: '424',
            name: 'Failed Dependency',
            description: 'The request failed due to previous requests.',
        },
        {
            code: '425',
            name: 'Too Early',
            description:
                'The server is unwilling to process a request that might be replayed.',
        },
        {
            code: '426',
            name: 'Update Required',
            description:
                'It indicates that the client should upgrades to a different protocol.',
        },
        {
            code: '428',
            name: 'Precondition Required',
            description: 'The server needs the request to be conditional.',
        },
        {
            code: '429',
            name: 'Too Many Requests',
            description:
                'The user has sent too many requests in a given amount of time.',
        },
        {
            code: '431',
            name: 'Request Header Fields Too Large',
            description:
                'The server can’t process the request because the header fields are too large.',
        },
        {
            code: '451',
            name: 'Unavailable For Legal Reasons',
            description:
                'The user requests a resource the server can’t legally provide. ',
        },
    ],
    '5XX server error': [
        {
            code: '500',
            name: 'Internal Server Error',
            description:
                'The server has encountered an unexpected error and cannot complete the request.',
        },
        {
            code: '501',
            name: 'Not Implemented',
            description:
                'The server can’t fulfill the request or doesn’t recognize the request method.',
        },
        {
            code: '502',
            name: 'Bad Gateway',
            description: '',
        },
        {
            code: '503',
            name: 'Service Unavailable',
            description:
                'The server is unable to process the request. This often occurs when a server is overloaded or down for maintenance.',
        },
        {
            code: '504',
            name: 'Gateway Timeout',
            description:
                'The server was acting as a gateway or proxy and timed out, waiting for a response.',
        },
        {
            code: '505',
            name: 'HTTP Version Not Supported',
            description:
                'The server doesn’t support the HTTP version in the request.',
        },
        {
            code: '506',
            name: 'Variant Also Negotiates',
            description: 'The server has an internal configuration error.',
        },
        {
            code: '507',
            name: 'Insufficient Storage',
            description:
                'The server is unable to store the representation needed to complete the request.',
        },
        {
            code: '508',
            name: 'Loop Detected',
            description:
                'The server detected an infinite loop while processing the request.',
        },
        {
            code: '510',
            name: 'Not Extended',
            description:
                'Further extensions to the request are required for the server to fulfill it.',
        },
        {
            code: '511',
            name: 'Network Authentication Required',
            description:
                'The client needs to authenticate to gain network access.',
        },
    ],
}

const HttpStatusCodesBlock = () => {
    const [filter, setFilter] = useState('')

    const filteredCodes = Object.entries(statusCodesList)?.reduce(
        (acc: any, [title, codes]) => {
            const filtered = codes?.filter(
                ({ code, name, description }) =>
                    code?.includes(filter) ||
                    name?.toLowerCase().includes(filter.toLowerCase()) ||
                    description?.toLowerCase().includes(filter.toLowerCase()),
            )

            if (!!filtered?.length) {
                acc.push({ title, codes: filtered })
            }

            return acc
        },
        [],
    )

    return (
        <div className="container my-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 lg:space-y-5 lg:p-8 xl:col-span-2">
                <Input
                    type="text"
                    placeholder="Search http status code..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />

                {filteredCodes.map((code: any) => (
                    <div key={code?.title}>
                        <div className="mb-3 text-lg text-black md:text-xl">
                            {code?.title}
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            {!!code?.codes?.length &&
                                code?.codes?.map((code: any) => (
                                    <div
                                        key={code?.code}
                                        className="space-y-2 rounded-xl border border-border bg-white p-3"
                                    >
                                        <div className="text-md flex gap-2 font-semibold text-black">
                                            <div>{code?.code}</div>
                                            <div>{code?.name}</div>
                                        </div>
                                        <div className='text-sm/snug'>{code?.description}</div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HttpStatusCodesBlock
