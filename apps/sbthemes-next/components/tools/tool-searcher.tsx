'use client'

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'

type ToolSearcherProps = {
    search: string
    onSearch: (query: string) => void
}

const ToolSearcher = ({ search, onSearch }: ToolSearcherProps) => {
    return (
        <div className="mx-auto mt-10 flex max-w-lg gap-5">
            <Input
                type="text"
                placeholder="Search tools..."
                className="w-full"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    )
}

export default ToolSearcher
