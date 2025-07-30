'use client'

import React, { use } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ColorPicker from '@/components/ui/color-picker'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { toast } from '@/components/ui/use-toast'
import helper from '@/lib/helper'
import { DialogTitle } from '@radix-ui/react-dialog'

type IForm = {
    label: string
    value: string
    patternType?: string
    patternColor?: string
    backgroundColor?: string
    backgroundColorDisplay?: boolean
    secondaryColor?: string
    tertiaryColor?: string
    useSecondaryColor?: boolean
    useTertiaryColor?: boolean
    patternSize?: number
    backgroundSizeDisplay?: boolean
    lineWidth?: number
    dotSize?: number
    backgroundImage?: string
    backgroundPosition?: string
    backgroundSize?: string
    background?: string
    backgroundBlendMode?: string
}

const patternTypes: IForm[] = [
    {
        label: 'Checks',
        value: 'Checks',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        backgroundImage:
            'repeating-conic-gradient($patternColor 0% 25%, $backgroundColor 0% 50%)',
        backgroundPosition: '0 0, $patternSize $patternSize',
        backgroundSize: '$patternSize-2 $patternSize-2',
    },
    {
        label: 'Diamonds',
        value: 'Diamonds',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background:
            'repeating-conic-gradient(from 45deg, $patternColor 0% 25%, $backgroundColor 0% 50%)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Grid',
        value: 'Grid',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        lineWidth: 2,
        backgroundImage:
            'linear-gradient($patternColor $lineWidth, transparent $lineWidth), linear-gradient(to right, $patternColor $lineWidth, transparent $lineWidth)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Dot',
        value: 'Dot',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        dotSize: 2,
        backgroundImage:
            'radial-gradient($patternColor $dotSize, transparent $dotSize)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Cross Dots',
        value: 'Cross Dots',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        dotSize: 2,
        backgroundImage:
            'radial-gradient($patternColor $dotSize, transparent $dotSize), radial-gradient($patternColor $dotSize, transparent $dotSize)',
        backgroundSize: '$patternSize $patternSize',
        backgroundPosition: '0 0, $patternSize-0.5 $patternSize-0.5',
    },
    {
        label: 'Vertical Lines',
        value: 'Vertical Lines',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        lineWidth: 2,
        backgroundImage:
            'repeating-linear-gradient(to right, $patternColor, $patternColor $lineWidth, transparent $lineWidth, transparent)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Horizontal Lines',
        value: 'Horizontal Lines',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        lineWidth: 2,
        backgroundImage:
            'repeating-linear-gradient(0deg, $patternColor, $patternColor $lineWidth, transparent $lineWidth, transparent)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Diagonal Lines',
        value: 'Diagonal Lines',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        lineWidth: 2,
        backgroundImage:
            'repeating-linear-gradient(45deg, $patternColor 0, $patternColor $lineWidth, transparent $lineWidth, transparent 50%)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Vertical Stripes',
        value: 'Vertical Stripes',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        backgroundImage:
            'linear-gradient(90deg, transparent 50%, $patternColor 50%)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Horizontal Stripes',
        value: 'Horizontal Stripes',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        backgroundImage:
            'linear-gradient(0deg, transparent 50%, $patternColor 50%)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Diagonal Stripes',
        value: 'Diagonal Stripes',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent $patternSize, $patternColor $patternSize, $patternColor $patternSize-2)',
    },
    {
        label: 'Crosses',
        value: 'Crosses',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        lineWidth: 2,
        background:
            'radial-gradient(circle, transparent 20%, $backgroundColor 20%, $backgroundColor 80%, transparent 80%, transparent) 0% 0% / $patternSize-2 $patternSize-2, radial-gradient(circle, transparent 20%, $backgroundColor 20%, $backgroundColor 80%, transparent 80%, transparent) $patternSize $patternSize / $patternSize-2 $patternSize-2, linear-gradient($patternColor $lineWidth, transparent $lineWidth) 0px -$lineWidth-0.5 / $patternSize $patternSize, linear-gradient(90deg, $patternColor $lineWidth, $backgroundColor $lineWidth) -$lineWidth-0.5 0px / $patternSize $patternSize $backgroundColor',
        backgroundSize:
            '$patternSize-2 $patternSize-2, $patternSize-2 $patternSize-2, $patternSize $patternSize, $patternSize $patternSize',
    },
    {
        label: 'Pluses',
        value: 'Pluses',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `conic-gradient(at 10% 50%,#0000 75%,$patternColor 0),
      conic-gradient(at 10% 50%,#0000 75%,$patternColor 0) calc(1*$patternSize) calc(3*$patternSize),
      conic-gradient(at 10% 50%,#0000 75%,$patternColor 0) calc(2*$patternSize) calc(1*$patternSize),
      conic-gradient(at 10% 50%,#0000 75%,$patternColor 0) calc(3*$patternSize) calc(4*$patternSize),
      conic-gradient(at 10% 50%,#0000 75%,$patternColor 0) calc(4*$patternSize) calc(2*$patternSize),
      conic-gradient(at 50% 10%,#0000 75%,$patternColor 0) 0 calc(4*$patternSize),
      conic-gradient(at 50% 10%,#0000 75%,$patternColor 0) calc(1*$patternSize) calc(2*$patternSize),
      conic-gradient(at 50% 10%,#0000 75%,$patternColor 0) calc(2*$patternSize) 0,
      conic-gradient(at 50% 10%,#0000 75%,$patternColor 0) calc(3*$patternSize) calc(3*$patternSize),
      conic-gradient(at 50% 10%,#0000 75%,$patternColor 0) calc(4*$patternSize) calc(1*$patternSize),
      $backgroundColor`,
        backgroundSize: '$patternSize-5 $patternSize-5',
    },
    {
        label: 'Equilateral Triangles',
        value: 'Equilateral Triangles',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        backgroundImage:
            'repeating-conic-gradient(from 30deg, $patternColor 0% 60deg, $backgroundColor 0% 120deg)',
        backgroundSize: '$patternSize $patternSize-2-35%',
    },
    {
        label: 'Right Triangles',
        value: 'Right Triangles',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        backgroundImage:
            'linear-gradient(45deg, $patternColor 50%, transparent 50%)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Mixed Triangles',
        value: 'Mixed Triangles',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        conic-gradient(from 150deg at 50% 33%,#0000,$patternColor .5deg 60deg,#0000 60.5deg)
        calc($patternSize/2) calc($patternSize/1.4),
        conic-gradient(from -30deg at 50% 66%,#0000,$patternColor-use-$secondaryColor .5deg 60deg,$backgroundColor 60.5deg)`,
        backgroundSize: '$patternSize calc($patternSize/1.154)',
    },
    {
        label: 'Pies',
        value: 'Pies',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        backgroundImage:
            'radial-gradient(ellipse farthest-corner at $patternSize $patternSize, $patternColor, $patternColor 50%, $backgroundColor 50%)',
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Nested Squares v1',
        value: 'Nested Squares v1',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        linear-gradient(45deg,#0000 calc(25%/3), $patternColor 0 calc(50%/3),
        #0000 0 calc(250%/3), $patternColor 0 calc(275%/3),
        #0000 0),linear-gradient( 45deg,$patternColor calc(25%/3), #0000 0 calc(50%/3),
        $patternColor 0 25%, #0000 0 75%,
        $patternColor 0 calc(250%/3), #0000 0 calc(275%/3),
        $patternColor 0),
        linear-gradient(-45deg,#0000 calc(25%/3), $patternColor 0 calc(50%/3),
        #0000 0 calc(250%/3), $patternColor 0 calc(275%/3),
        #0000 0),linear-gradient(-45deg,$patternColor calc(25%/3), #0000 0 calc(50%/3),
        $patternColor 0 25%, #0000 0 75%,
        $patternColor 0 calc(250%/3), #0000 0 calc(275%/3),
        $patternColor 0)
        $backgroundColor`,
        backgroundSize: '$patternSize-2 $patternSize-2',
        backgroundPosition: '0 0, $patternSize $patternSize',
    },
    {
        label: 'Nested Squares v2',
        value: 'Nested Squares v2',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        repeating-linear-gradient( 45deg,#0000 calc(-650%/13) calc(50%/13),$patternColor 0 calc(100%/13),
        #0000 0 calc(150%/13),$patternColor 0 calc(200%/13),
        #0000 0 calc(250%/13),$patternColor 0 calc(300%/13)),repeating-linear-gradient( 45deg,#0000 calc(-650%/13) calc(50%/13),$patternColor 0 calc(100%/13),
        #0000 0 calc(150%/13),$patternColor 0 calc(200%/13),
        #0000 0 calc(250%/13),$patternColor 0 calc(300%/13)) $patternSize $patternSize,
        repeating-linear-gradient(-45deg,#0000 calc(-650%/13) calc(50%/13),$patternColor 0 calc(100%/13),
        #0000 0 calc(150%/13),$patternColor 0 calc(200%/13),
        #0000 0 calc(250%/13),$patternColor 0 calc(300%/13)),repeating-linear-gradient(-45deg,#0000 calc(-650%/13) calc(50%/13),$patternColor 0 calc(100%/13),
        #0000 0 calc(150%/13),$patternColor 0 calc(200%/13),
        #0000 0 calc(250%/13),$patternColor 0 calc(300%/13)) $patternSize $patternSize $backgroundColor`,
        backgroundSize: '$patternSize-2 $patternSize-2',
    },
    {
        label: 'Snakes',
        value: 'Snakes',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        conic-gradient(at 62.5% 12.5%, $patternColor 25%, #0000 0) calc($patternSize/-8) calc($patternSize/2),
        conic-gradient(at 62.5% 12.5%, $patternColor 25%, #0000 0) calc(-3*$patternSize/8) calc($patternSize/4),
        conic-gradient(at 87.5% 62.5%, $patternColor 25%, #0000 0) calc(3*$patternSize/8) calc($patternSize/4),
        conic-gradient(at 87.5% 62.5%, $patternColor 25%, #0000 0) calc($patternSize/-8) 0,
        conic-gradient(at 25% 12.5%, $patternColor 25%, #0000 0) 0 calc($patternSize/-4),
        conic-gradient(at 25% 12.5%, $patternColor 25%, #0000 0) calc($patternSize/-4) 0,
        conic-gradient(at 87.5% 87.5%, $patternColor 25%, #0000 0) calc($patternSize/8) 0
        $backgroundColor`,
        backgroundSize: '$patternSize $patternSize',
    },
    {
        label: 'Bars',
        value: 'Bars',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        linear-gradient(135deg,#0000 20.5%,$backgroundColor 0 29.5%,#0000 0) 0 $patternSize-0.5,
        linear-gradient( 45deg,#0000 8%,$backgroundColor 0 17%, #0000 0 58%) $patternSize 0,
        linear-gradient(135deg,#0000 8%,$backgroundColor 0 17%, #0000 0 58%,$backgroundColor 0 67%,#0000 0),
        linear-gradient( 45deg,#0000 8%,$backgroundColor 0 17%, #0000 0 58%,$backgroundColor 0 67%,#0000 0 83%,$backgroundColor 0 92%,#0000 0),
        $patternColor`,
        backgroundSize: '$patternSize-2 $patternSize-2',
        backgroundColorDisplay: false,
    },
    {
        label: 'Long Bars',
        value: 'Long Bars',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        linear-gradient(135deg,#0000 18.75%,$backgroundColor 0 31.25%,#0000 0),
        repeating-linear-gradient(45deg,$backgroundColor -6.25% 6.25%,$patternColor 0 18.75%)`,
        backgroundSize: '$patternSize-2 $patternSize-2',
        backgroundColorDisplay: false,
    },
    {
        label: 'Post it',
        value: 'Post it',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        conic-gradient(from 116.56deg at calc(100%/3) 0, #0000 90deg,$backgroundColor 0),
        conic-gradient(from -63.44deg at calc(200%/3) 100%, #0000 90deg,$backgroundColor 0)
        $patternColor`,
        backgroundSize: '$patternSize $patternSize',
        backgroundColorDisplay: false,
    },
    {
        label: 'Mountains',
        value: 'Mountains',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        conic-gradient(from 135deg,$patternColor 90deg,#0000 0) $patternSize calc($patternSize/2),
        conic-gradient(from 135deg,$backgroundColor 90deg,#0000 0),
        conic-gradient(from 135deg at 50% 0,$patternColor 90deg,#0000 0) $backgroundColor`,
        backgroundSize: '$patternSize-2 $patternSize',
        backgroundColorDisplay: false,
    },
    {
        label: 'Hexagons',
        value: 'Hexagons',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        conic-gradient(from 90deg at 2px 2px,#0000 25%,$backgroundColor 0) -1px -1px,
        linear-gradient(-45deg,$backgroundColor 15%,$patternColor 0 28%,#0000 0 72%,$patternColor 0 85%,$backgroundColor 0),linear-gradient(45deg,$backgroundColor 15%,$patternColor 0 28%,#0000 0 72%,$patternColor 0 85%,$backgroundColor 0),
        conic-gradient(from 90deg at 40% 40%,$backgroundColor 25%,$patternColor 0)
        calc($patternSize/-5) calc($patternSize/-5)`,
        backgroundSize: '$patternSize $patternSize',
        backgroundColorDisplay: false,
    },
    {
        label: 'Net v1',
        value: 'Net v1',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient(farthest-side at -33.33% 50%,#0000 52%,$patternColor 54% 57%,#0000 59%) 0 calc($patternSize-4/2),
        radial-gradient(farthest-side at 50% 133.33%,#0000 52%,$patternColor 54% 57%,#0000 59%) calc($patternSize-4/2) 0,
        radial-gradient(farthest-side at 133.33% 50%,#0000 52%,$patternColor 54% 57%,#0000 59%),
        radial-gradient(farthest-side at 50% -33.33%,#0000 52%,$patternColor 54% 57%,#0000 59%),
        $backgroundColor`,
        backgroundSize:
            'calc($patternSize-4/4.667) $patternSize-4,$patternSize-4 calc($patternSize-4/4.667)',
        backgroundColorDisplay: false,
    },
    {
        label: 'Net v2',
        value: 'Net v2',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient(35.36% 35.36% at 100% 25%,#0000 66%,$patternColor 68% 70%,#0000 72%) $patternSize $patternSize/calc(2*$patternSize) calc(2*$patternSize),
        radial-gradient(35.36% 35.36% at 0    75%,#0000 66%,$patternColor 68% 70%,#0000 72%) $patternSize $patternSize/calc(2*$patternSize) calc(2*$patternSize),
        radial-gradient(35.36% 35.36% at 100% 25%,#0000 66%,$patternColor 68% 70%,#0000 72%) 0 0/calc(2*$patternSize) calc(2*$patternSize),
        radial-gradient(35.36% 35.36% at 0    75%,#0000 66%,$patternColor 68% 70%,#0000 72%) 0 0/calc(2*$patternSize) calc(2*$patternSize),
        repeating-conic-gradient($backgroundColor 0 25%,#0000 0 50%) 0 0/calc(2*$patternSize) calc(2*$patternSize),
        radial-gradient(#0000 66%,$patternColor 68% 70%,#0000 72%) 0 calc($patternSize/2)/$patternSize $patternSize
        $backgroundColor`,
        backgroundSizeDisplay: false,
    },
    {
        label: 'Steps',
        value: 'Steps',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        $patternSize $patternSize/calc(2*$patternSize) calc(2*$patternSize) conic-gradient(at calc(500%/6) 50%,$backgroundColor 25%,#0000 0),0 0/calc(2*$patternSize) calc(2*$patternSize) conic-gradient(at calc(500%/6) 50%,$backgroundColor 25%,#0000 0),
        $patternSize $patternSize/calc(2*$patternSize) calc(2*$patternSize) conic-gradient(at calc(200%/3) 50%,#adafff-use-$secondaryColor 25%,#0000 0),0 0/calc(2*$patternSize) calc(2*$patternSize) conic-gradient(at calc(200%/3) 50%,#adafff-use-$secondaryColor 25%,#0000 0),
        repeating-conic-gradient($patternColor 0 25%,#0000 0 50%) 0 0/calc(2*$patternSize) calc(2*$patternSize),
        linear-gradient($patternColor calc(100%/3),#adafff-use-$secondaryColor 0 calc(200%/3),$backgroundColor 0)
        0 0/$patternSize $patternSize`,
        backgroundColorDisplay: false,
        backgroundSizeDisplay: false,
    },
    {
        label: 'Tablecloth',
        value: 'Tablecloth',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `repeating-linear-gradient(transparent, transparent $patternSize-0.25, $patternColor $patternSize-0.25, $patternColor $patternSize-0.375, transparent $patternSize-0.375, transparent $patternSize-0.5, $patternColor $patternSize-0.375, $patternColor $patternSize, transparent $patternSize, transparent $patternSize-1.125, $patternColor $patternSize-1.125, $patternColor $patternSize-1.25, transparent $patternSize-1.25, transparent $patternSize-2), repeating-linear-gradient(90deg, transparent, transparent $patternSize-0.25, $patternColor $patternSize-0.25, $patternColor $patternSize-0.375, transparent $patternSize-0.375, transparent $patternSize-0.5, $patternColor $patternSize-0.375, $patternColor $patternSize, transparent $patternSize, transparent $patternSize-1.125, $patternColor $patternSize-1.125, $patternColor $patternSize-1.25, transparent $patternSize-1.25, transparent $patternSize-2), $backgroundColor`,
        backgroundSizeDisplay: false,
        backgroundBlendMode: 'multiply',
    },
    {
        label: 'Hamper',
        value: 'Hamper',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        conic-gradient(at $patternSize-0.5 calc(100% - $patternSize-0.5),#0000 270deg,$patternColor 0) calc($patternSize-0.5 + $patternSize-0.375) 0,
        linear-gradient(#adafff-use-$secondaryColor $patternSize-0.5,#0000 0) 0 $patternSize-0.375,
        conic-gradient(at $patternSize-0.5 calc(100% - $patternSize-0.5),#0000 90deg,#adafff-use-$secondaryColor 0 180deg, $patternColor 0),
        $backgroundColor`,
        backgroundSize:
            'calc(2*($patternSize-0.5 + $patternSize-0.375)) calc(2*($patternSize-0.5 + $patternSize-0.375))',
        backgroundColorDisplay: false,
    },
    {
        label: 'Knitting',
        value: 'Knitting',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,
        background: `
        conic-gradient(at 50% calc(100%/6),$patternColor 60deg,#0000 0),
        conic-gradient(at calc(100%/6) 50%,#0000 240deg,$patternColor 0),
        conic-gradient(from 180deg at calc(100%/6) calc(500%/6),$patternColor 60deg,#0000 0),
        conic-gradient(from 180deg at calc(500%/6),#0000 240deg,$patternColor 0) calc(4*.866*$patternSize-0.5) 0,
        repeating-linear-gradient(-150deg,#adafff-use-$secondaryColor 0 calc(100%/6),#0000   0 50%),
        repeating-linear-gradient(-30deg, #fff-use-$tertiaryColor 0 calc(100%/6),$backgroundColor 0 50%)`,
        backgroundSize:
            'calc(6*.866*$patternSize-0.5) calc(3*$patternSize-0.5)',
        backgroundColorDisplay: false,
    },
    {
        label: 'Wind Rose',
        value: 'Wind Rose',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        conic-gradient(from -45deg at calc(100%/3) calc(100%/3), $backgroundColor 90deg, #0000 0),
        conic-gradient(from -135deg at calc(100%/3) calc(2*100%/3), $backgroundColor 90deg, $patternColor 0 135deg, #0000 0),
        conic-gradient(from 135deg at calc(2*100%/3) calc(2*100%/3), $backgroundColor 90deg, $patternColor 0 135deg, #0000 0),
        conic-gradient(from 45deg at calc(2*100%/3) calc(100%/3), $backgroundColor 90deg, $patternColor 0 135deg, #0000 0,$backgroundColor 0 225deg,$patternColor 0)`,
        backgroundSize: '$patternSize-2 $patternSize-2',
        backgroundColorDisplay: false,
    },
    {
        label: 'Fences',
        value: 'Fences',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient(27% 29% at right, #0000 83%,$patternColor 85% 99%,#0000 101%) calc($patternSize/2) $patternSize,
        radial-gradient(27% 29% at left, #0000 83%,$patternColor 85% 99%,#0000 101%) calc($patternSize/-2) $patternSize,
        radial-gradient(29% 27% at top, #0000 83%,$patternColor 85% 99%,#0000 101%) 0 calc($patternSize/2),
        radial-gradient(29% 27% at bottom, #0000 83%,$patternColor 85% 99%,#0000 101%) 0 calc($patternSize/-2)
        $backgroundColor`,
        backgroundSize: '$patternSize-2 $patternSize-2',
        backgroundColorDisplay: false,
    },
    {
        label: 'Polka dot',
        value: 'Polka dot',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        conic-gradient($backgroundColor 25%,#0000 0) 0 0/calc(2*$patternSize) calc($patternSize/9.5),
        conic-gradient($backgroundColor 25%,#0000 0) 0 0/calc($patternSize/9.5) calc(2*$patternSize),
        repeating-conic-gradient(#0000 0 25%,$backgroundColor 0 50%)
         $patternSize 0 /calc(2*$patternSize) calc(2*$patternSize),
        radial-gradient(50% 50%,$patternColor 98%,$backgroundColor)
         0 0/$patternSize $patternSize`,
        backgroundColorDisplay: false,
        backgroundSizeDisplay: false,
    },
    {
        label: 'Broken dots',
        value: 'Broken dots',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient($patternColor 49%,#0000 50%) calc($patternSize/-2) calc($patternSize/2),
        repeating-conic-gradient(from 45deg,$backgroundColor 0 25%,#0000 0 50%)
          calc($patternSize/2) calc($patternSize/2),
        radial-gradient($patternColor 49%,#0000 50%),radial-gradient($patternColor 49%,#0000 50%) $patternSize $patternSize $backgroundColor`,
        backgroundSize: 'calc(2*$patternSize) calc(2*$patternSize)',
        backgroundColorDisplay: false,
    },
    {
        label: 'Connected Nodes',
        value: 'Connected Nodes',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,

        background: `
        radial-gradient(#adafff-use-$secondaryColor 24%,#0000 25%),
        radial-gradient(#fff-use-$tertiaryColor 30%,#0000 32%) calc($patternSize/2) calc($patternSize/2),
        repeating-conic-gradient(from 30deg,$backgroundColor 0 30deg,$patternColor 0 90deg)`,
        backgroundSize: '$patternSize $patternSize',
        backgroundColorDisplay: false,
    },
    {
        label: 'Connected Squares',
        value: 'Connected Squares',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        calc( .9*$patternSize) calc( .9*$patternSize)/calc(2*$patternSize) calc(2*$patternSize) conic-gradient(at 20% 20%,#0000 75%,$backgroundColor 0),
        calc(-.1*$patternSize) calc(-.1*$patternSize)/calc(2*$patternSize) calc(2*$patternSize) conic-gradient(at 20% 20%,#0000 75%,$backgroundColor 0),
        calc( .7*$patternSize) calc( .7*$patternSize)/calc(2*$patternSize) calc(2*$patternSize) conic-gradient(at 40% 40%,#0000 75%,$patternColor 0),
        calc(-.3*$patternSize) calc(-.3*$patternSize)/calc(2*$patternSize) calc(2*$patternSize) conic-gradient(at 40% 40%,#0000 75%,$patternColor 0),
        conic-gradient(from 90deg at 20% 20%,$backgroundColor 25%,$patternColor 0)
         0 0/$patternSize $patternSize`,
        backgroundColorDisplay: false,
        backgroundSizeDisplay: false,
    },
    {
        label: 'Overlaying Circles',
        value: 'Overlaying Circles',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `repeating-radial-gradient(circle, transparent, transparent $patternSize-0.35, $patternColor $patternSize-0.35, $patternColor $patternSize-0.45), repeating-radial-gradient(circle, transparent, transparent $patternSize-0.35, $patternColor-use-$secondaryColor $patternSize-0.35, $patternColor-use-$secondaryColor $patternSize-0.45), $backgroundColor`,
        backgroundSize: '$patternSize-2 $patternSize-2',
        backgroundPosition:
            '0 0, $patternSize $patternSize, $patternSize-2 $patternSize',
    },
    {
        label: 'Hypnotic v1',
        value: 'Hypnotic v1',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient(50% 50% at 100% 0,$backgroundColor 0%  5% ,$patternColor 6%  15%,$backgroundColor 16% 25%,$patternColor 26% 35%,$backgroundColor 36% 45%,
         $patternColor 46% 55%,$backgroundColor 56% 65%,$patternColor 66% 75%,$backgroundColor 76% 85%,$patternColor 86% 95%,
         #0000 96%),
        radial-gradient(50% 50% at 0 100%,$backgroundColor 0%  5% ,$patternColor 6%  15%,$backgroundColor 16% 25%,$patternColor 26% 35%,$backgroundColor 36% 45%,
         $patternColor 46% 55%,$backgroundColor 56% 65%,$patternColor 66% 75%,$backgroundColor 76% 85%,$patternColor 86% 95%,
         #0000 96%),
        radial-gradient(50% 50%,$backgroundColor 0%  5% ,$patternColor 6%  15%,$backgroundColor 16% 25%,$patternColor 26% 35%,$backgroundColor 36% 45%,
         $patternColor 46% 55%,$backgroundColor 56% 65%,$patternColor 66% 75%,$backgroundColor 76% 85%,$patternColor 86% 95%,
         #0000 96%),
        radial-gradient(50% 50%,$backgroundColor 0%  5% ,$patternColor 6%  15%,$backgroundColor 16% 25%,$patternColor 26% 35%,$backgroundColor 36% 45%,
         $patternColor 46% 55%,$backgroundColor 56% 65%,$patternColor 66% 75%,$backgroundColor 76% 85%,$patternColor 86% 95%,
         #0000 96%) $patternSize $patternSize`,
        backgroundSize: '$patternSize-2 $patternSize-2',
    },
    {
        label: 'Hypnotic v2',
        value: 'Hypnotic v2',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient($patternSize-2 at 100% 0, $backgroundColor 6.25%, $patternColor 6.3% 18.75%, $backgroundColor 18.8% 31.25%, $patternColor 31.3% 43.75%, $backgroundColor 43.8% 56.25%, $patternColor 56.3% 68.75%, #0000 0),
        radial-gradient($patternSize-2 at 0 0, $backgroundColor 6.25%, $patternColor 6.3% 18.75%, $backgroundColor 18.8% 31.25%, $patternColor 31.3% 43.75%, $backgroundColor 43.8% 56.25%, $patternColor 56.3% 68.75%, #0000 0),
        radial-gradient($patternSize-2 at 0 100%, $backgroundColor 6.25%, $patternColor 6.3% 18.75%, $backgroundColor 18.8% 31.25%, $patternColor 31.3% 43.75%, $backgroundColor 43.8% 56.25%, $patternColor 56.3% 68.75%, #0000 0),
        radial-gradient($patternSize-2 at 100% 100%, $backgroundColor 6.25%, $patternColor 6.3% 18.75%, $backgroundColor 18.8% 31.25%, $patternColor 31.3% 43.75%, $backgroundColor 43.8% 56.25%, $patternColor 56.3% 68.75%, #0000 0) $backgroundColor`,
        backgroundSize: '$patternSize-2 $patternSize-2',
    },
    {
        label: 'Hypnotic v3',
        value: 'Hypnotic v3',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient(100% 100% at 100% 100%, #0000 46%,$patternColor 47% 53%,#0000 54%) $patternSize $patternSize,
        radial-gradient(100% 100% at 0 0, #0000 46%,$patternColor 47% 53%,#0000 54%) $patternSize $patternSize,
        radial-gradient(100% 100%, #0000 22%, $patternColor 23% 29%, #0000 30% 34%, $patternColor 35% 41%, #0000 42%)
        $backgroundColor`,
        backgroundSize: '$patternSize-2 $patternSize-2',
        backgroundColorDisplay: false,
    },
    {
        label: 'Honeycomb',
        value: 'Honeycomb',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient(circle farthest-side at 0% 50%,$backgroundColor 23.5%,#0000 0)$patternSize-1.05 $patternSize-1.5,
        radial-gradient(circle farthest-side at 0% 50%,$patternColor 24%,#0000 0)$patternSize-0.95 $patternSize-1.5,
        linear-gradient($backgroundColor 14%,#0000 0, #0000 85%,$backgroundColor 0)0 0,
        linear-gradient(150deg,$backgroundColor 24%,$patternColor 0,$patternColor 26%,#0000 0,#0000 74%,$patternColor 0,$patternColor 76%,$backgroundColor 0)0 0,
        linear-gradient(30deg,$backgroundColor 24%,$patternColor 0,$patternColor 26%,#0000 0,#0000 74%,$patternColor 0,$patternColor 76%,$backgroundColor 0)0 0,
        linear-gradient(90deg,$patternColor 2%,$backgroundColor 0,$backgroundColor 98%,$patternColor 0%)0 0 $backgroundColor`,
        backgroundSize: '$patternSize-2 $patternSize-3',
    },
    {
        label: 'Carpet',
        value: 'Carpet',
        patternColor: '#474bff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        conic-gradient(from -45deg,$patternColor 90deg,#0000 0 180deg,#adafff-use-$secondaryColor 0 270deg,#0000 0)
            0 calc($patternSize/2)/$patternSize $patternSize,
        conic-gradient(from 135deg at 50% 0,$patternColor 90deg,#adafff-use-$secondaryColor 0)
            0 0/calc(2*$patternSize) $patternSize`,
        backgroundSizeDisplay: false,
        backgroundColorDisplay: false,
    },
    {
        label: 'Hearts',
        value: 'Hearts',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient(at 80% 80%,$patternColor 25.4%,#0000 26%),
        radial-gradient(at 20% 80%,$patternColor 25.4%,#0000 26%),
        conic-gradient(from -45deg at 50% 41%,$patternColor 90deg,$backgroundColor 0)
          $patternSize-0.5 0`,
        backgroundSize: '$patternSize $patternSize',
        backgroundColorDisplay: false,
    },
    {
        label: 'Stars',
        value: 'Stars',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        conic-gradient(from 162deg at calc($patternSize * .5)  calc($patternSize * .68), $patternColor 36deg, #0000 0),
        conic-gradient(from 18deg  at calc($patternSize * .19) calc($patternSize * .59), $patternColor 36deg, #0000 0),
        conic-gradient(from 306deg at calc($patternSize * .81) calc($patternSize * .59), $patternColor 36deg, #0000 0),
        $backgroundColor`,
        backgroundSize: 'calc($patternSize + 1.3px) calc($patternSize + 1.3px)',
        backgroundPosition: '0 calc($patternSize * 0.35)',
        backgroundColorDisplay: false,
    },
    {
        label: 'Ninja Blades',
        value: 'Ninja Blades',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `
        radial-gradient($patternSize at calc(100% + calc($patternSize*.866)) 50%,$patternColor 99%, #0000 101%) 0 calc(-5*$patternSize/2),
        radial-gradient($patternSize at calc(100% + calc($patternSize*.866)) 50%,$patternColor 99%, #0000 101%) calc(-2*calc($patternSize*.866)) calc($patternSize/2),
        radial-gradient($patternSize at 100% 50%,$backgroundColor 99%, #0000 101%) 0 calc(-2*$patternSize),
        radial-gradient($patternSize,$patternColor 99%, #0000 101%) calc($patternSize*.866) calc(-5*$patternSize/2),
        radial-gradient($patternSize,$backgroundColor 99%, #0000 101%) calc($patternSize*.866) calc( 5*$patternSize/2),
        radial-gradient($patternSize at 100% 100%,$patternColor 99%, #0000 101%) 0 calc(-1*$patternSize),
        radial-gradient($patternSize at 0%   50% ,$patternColor 99%, #0000 101%) 0 calc(-4*$patternSize),
        radial-gradient($patternSize,$backgroundColor 99%, #0000 101%) calc(-1*calc($patternSize*.866)) calc(-7*$patternSize/2),
        radial-gradient($patternSize,$patternColor 99%, #0000 101%) calc(-1*calc($patternSize*.866)) calc(-5*$patternSize/2),
        radial-gradient($patternSize at 100% 50%,$backgroundColor 99%, #0000 101%) calc(-2*calc($patternSize*.866)) $patternSize,
        radial-gradient($patternSize,$patternColor 99%, #0000 101%) calc(-1*calc($patternSize*.866)) calc($patternSize/ 2),
        radial-gradient($patternSize,$backgroundColor 99%, #0000 101%) calc(-1*calc($patternSize*.866)) calc($patternSize/-2),
        radial-gradient($patternSize,$patternColor 99%, #0000 101%) 0 calc(-1*$patternSize),
        radial-gradient($patternSize,$backgroundColor 99%, #0000 101%) calc($patternSize*.866) calc($patternSize/-2),
        radial-gradient($patternSize,$patternColor 99%, #0000 101%) calc($patternSize*.866) calc($patternSize/ 2)
        $backgroundColor`,
        backgroundSize: 'calc(4*calc($patternSize*.866)) calc(6*$patternSize)',
        backgroundColorDisplay: false,
    },
    {
        label: 'Peppers',
        value: 'Peppers',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        radial-gradient(calc(1.28*$patternSize + $patternSize-0.375/2) at left 50% bottom calc(-.8*$patternSize),$patternColor calc(100% - $patternSize-0.375),$backgroundColor calc(101% - $patternSize-0.375) 100%,#0000 101%) calc(2*$patternSize) calc(-1*calc(1.5*$patternSize + $patternSize-0.375)),
        radial-gradient(calc(1.28*$patternSize + $patternSize-0.375/2) at left 50% bottom calc(-.8*$patternSize),#adafff-use-$secondaryColor calc(100% - $patternSize-0.375),$backgroundColor calc(101% - $patternSize-0.375) 100%,#0000 101%) calc(-1*$patternSize) calc(calc(1.5*$patternSize + $patternSize-0.375)/-2),
        radial-gradient(calc(1.28*$patternSize + $patternSize-0.375/2) at left 50% top    calc(-.8*$patternSize),#adafff-use-$secondaryColor calc(100% - $patternSize-0.375),$backgroundColor calc(101% - $patternSize-0.375) 100%,#0000 101%) 0 calc(1.5*$patternSize + $patternSize-0.375),
        radial-gradient(calc(1.28*$patternSize + $patternSize-0.375/2) at left 50% top    calc(-.8*$patternSize),$patternColor calc(100% - $patternSize-0.375),$backgroundColor calc(101% - $patternSize-0.375) 100%,#0000 101%) $patternSize calc(calc(1.5*$patternSize + $patternSize-0.375)/ 2),
        linear-gradient($patternColor 50%,#adafff-use-$secondaryColor 0)`,
        backgroundSize:
            'calc(4*$patternSize) calc(1.5*$patternSize + $patternSize-0.375)',
        backgroundColorDisplay: false,
    },
    {
        label: 'Lemons',
        value: 'Lemons',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        radial-gradient(calc(1.28 * $patternSize + $patternSize-0.25/2) at top 50% right calc(-.8*$patternSize), $patternColor calc(99.5% - $patternSize-0.25),$backgroundColor calc(101% - $patternSize-0.25) 99.5%,#0000 101%) calc(-1*calc(1.8 * $patternSize + $patternSize-0.25)) $patternSize,
        radial-gradient(calc(1.28 * $patternSize + $patternSize-0.25/2) at top 50% left calc(-.8*$patternSize), #adafff-use-$secondaryColor calc(99.5% - $patternSize-0.25),$backgroundColor calc(101% - $patternSize-0.25) 99.5%,#0000 101%) calc(1.8 * $patternSize + $patternSize-0.25)  calc(-1*$patternSize),
        radial-gradient(calc(1.28 * $patternSize + $patternSize-0.25/2) at top 50% right calc(-.8*$patternSize), #adafff-use-$secondaryColor calc(99.5% - $patternSize-0.25),$backgroundColor calc(101% - $patternSize-0.25) 99.5%,#0000 101%) calc(calc(1.8 * $patternSize + $patternSize-0.25)/-2) calc(-1*$patternSize),
        radial-gradient(calc(1.28 * $patternSize + $patternSize-0.25/2) at top 50% left calc(-.8*$patternSize), $patternColor calc(99.5% - $patternSize-0.25),$backgroundColor calc(101% - $patternSize-0.25) 99.5%,#0000 101%) calc(calc(1.8 * $patternSize + $patternSize-0.25)/ 2) $patternSize,
        linear-gradient(90deg, $patternColor 50%, #adafff-use-$secondaryColor 0)`,
        backgroundSize:
            'calc(1.8 * $patternSize + $patternSize-0.25) $patternSize-4',
        backgroundColorDisplay: false,
    },
    {
        label: 'Candy Stripes',
        value: 'Candy Stripes',
        patternColor: '#474bff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        radial-gradient(25% 25% at 25% 25%,$patternColor 99%,#0000 101%) $patternSize $patternSize/calc(2*$patternSize) calc(2*$patternSize),
        radial-gradient(25% 25% at 25% 25%,$patternColor 99%,#0000 101%) 0 0/calc(2*$patternSize) calc(2*$patternSize),
        radial-gradient(50% 50%,#adafff-use-$secondaryColor 98%,#0000) 0 0/$patternSize $patternSize,
        repeating-conic-gradient(#adafff-use-$secondaryColor 0 25%,$patternColor 0 50%)
          calc(.5*$patternSize) 0/calc(2*$patternSize) $patternSize`,
        backgroundColorDisplay: false,
        backgroundSizeDisplay: false,
    },
    {
        label: 'Spaghetti',
        value: 'Spaghetti',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `radial-gradient(at bottom right, $patternColor 0, $patternColor $patternSize-0.25, $patternColor-rgb,0.2) $patternSize-0.25, $patternColor-rgb,0.2) $patternSize-0.5, $patternColor-rgb,0.75) $patternSize-0.5, $patternColor-rgb,0.75) $patternSize-0.75, $patternColor-rgb,0.25) $patternSize-0.75, $patternColor-rgb,0.25) $patternSize, $patternColor-rgb,0.3) $patternSize, $patternColor-rgb,0.3) $patternSize-1.25, $patternColor-rgb,0.75) $patternSize-1.25, $patternColor-rgb,0.75) $patternSize-1.5, $patternColor-rgb,0.2) $patternSize-1.5, $patternColor-rgb,0.2) $patternSize-1.75, transparent $patternSize-1.75, transparent $patternSize-2), radial-gradient(at top left, transparent 0, transparent $patternSize-0.25, $patternColor-rgb,0.2) $patternSize-0.25, $patternColor-rgb,0.2) $patternSize-0.5, $patternColor-rgb,0.75) $patternSize-0.5, $patternColor-rgb,0.75) $patternSize-0.75, $patternColor-rgb,0.3) $patternSize-0.75, $patternColor-rgb,0.3) $patternSize, $patternColor-rgb,0.25) $patternSize, $patternColor-rgb,0.25) $patternSize-1.25, $patternColor-rgb,0.75) $patternSize-1.25, $patternColor-rgb,0.75) $patternSize-1.5, $patternColor-rgb,0.2) $patternSize-1.5, $patternColor-rgb,0.2) $patternSize-1.75, $patternColor $patternSize-1.75, $patternColor $patternSize-2, transparent $patternSize-2, transparent $patternSize-5)`,
        backgroundSize:
            '$patternSize-2 $patternSize-2, $patternSize-2 $patternSize-2',
        backgroundBlendMode: 'multiply',
    },
    {
        label: 'Water Drop',
        value: 'Water Drop',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        backgroundImage: `radial-gradient(circle at center center, $patternColor, $backgroundColor), repeating-radial-gradient(circle at center center, $patternColor, $patternColor-use-$secondaryColor, $patternSize, transparent $patternSize-2, transparent $patternSize)`,
        backgroundBlendMode: 'multiply',
        backgroundSizeDisplay: false,
    },
    {
        label: 'Waves',
        value: 'Waves',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, $backgroundColor $patternSize), repeating-linear-gradient($patternColor, $patternColor-use-$secondaryColor)`,
        backgroundSizeDisplay: false,
    },
    {
        label: 'Zigzag',
        value: 'Zigzag',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `linear-gradient(135deg, $patternColor 25%, transparent 25%) -$patternSize 0, linear-gradient(225deg, $patternColor 25%, transparent 25%) -$patternSize 0, linear-gradient(315deg, $patternColor 25%, transparent 25%), linear-gradient(45deg, $patternColor 25%, transparent 25%)`,
        backgroundSize: '$patternSize-2 $patternSize-2',
    },
    {
        label: 'Zigzag (3D)',
        value: 'Zigzag (3D)',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        background: `linear-gradient(135deg, $patternColor 25%, transparent 25%) -$patternSize 0/ $patternSize-2 $patternSize-2, linear-gradient(225deg, $patternColor-rgb,0.5) 25%, transparent 25%) -$patternSize 0/ $patternSize-2 $patternSize-2, linear-gradient(315deg, $patternColor 25%, transparent 25%) 0 0/ $patternSize-2 $patternSize-2, linear-gradient(45deg, $patternColor-rgb,0.5) 25%, $backgroundColor 25%) 0 0/ $patternSize-2 $patternSize-2`,
        backgroundSizeDisplay: false,
    },
    {
        label: 'Adjacent Cubes v1 (3D)',
        value: 'Adjacent Cubes v1 (3D)',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        patternSize: 32,
        backgroundImage: `linear-gradient(30deg, $patternColor 12%, transparent 12.5%, transparent 87%, $patternColor 87.5%, $patternColor), linear-gradient(150deg, $patternColor 12%, transparent 12.5%, transparent 87%, $patternColor 87.5%, $patternColor), linear-gradient(30deg, $patternColor 12%, transparent 12.5%, transparent 87%, $patternColor 87.5%, $patternColor), linear-gradient(150deg, $patternColor 12%, transparent 12.5%, transparent 87%, $patternColor 87.5%, $patternColor), linear-gradient(60deg, $patternColor-rgb,0.5) 25%, transparent 25.5%, transparent 75%, $patternColor-rgb,0.5) 75%, $patternColor-rgb,0.5)), linear-gradient(60deg, $patternColor-rgb,0.5) 25%, transparent 25.5%, transparent 75%, $patternColor-rgb,0.5) 75%, $patternColor-rgb,0.5))`,
        backgroundSize: '$patternSize-2 $patternSize-3.5',
        backgroundPosition:
            '0 0, 0 0, $patternSize $patternSize-1.75, $patternSize $patternSize-1.75, 0 0, $patternSize $patternSize-1.75',
    },
    {
        label: 'Adjacent Cubes v2 (3D)',
        value: 'Adjacent Cubes v2 (3D)',
        patternColor: '#474bff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,
        background: `
        repeating-conic-gradient(from 30deg,#0000 0 120deg,#fff-use-$tertiaryColor 0 180deg)
         $patternSize-2 $patternSize-1.154,
        repeating-conic-gradient(from 30deg,$patternColor 0 60deg,#adafff-use-$secondaryColor 0 120deg,#fff-use-$tertiaryColor 0 180deg)`,
        backgroundSize: '$patternSize-4 $patternSize-2.3',
        backgroundColorDisplay: false,
    },
    {
        label: 'Discrete Cubes (3D)',
        value: 'Discrete Cubes (3D)',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,
        background: `linear-gradient(135deg, $backgroundColor 16.66%, transparent 0 83.33%, $backgroundColor 0), conic-gradient(from 45deg at 66.66% 33.33%, $patternColor 135deg, $patternColor-rgb,0.75)-use-$secondaryColor 0% 225deg, $patternColor-rgb,0.5)-use-$tertiaryColor 0%)`,
        backgroundSize: '$patternSize-2 $patternSize-2',
    },
    {
        label: 'Nested Cubes (3D)',
        value: 'Nested Cubes (3D)',
        patternColor: '#474bff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,
        background: `
        conic-gradient(from 0deg at calc(500%/6) calc(100%/3),#fff-use-$tertiaryColor 0 120deg,#0000 0),
        conic-gradient(from -120deg at calc(100%/6) calc(100%/3),#adafff-use-$secondaryColor 0 120deg,#0000 0),
        conic-gradient(from 120deg at calc(100%/3) calc(500%/6),$patternColor 0 120deg,#0000 0),
        conic-gradient(from 120deg at calc(200%/3) calc(500%/6),$patternColor 0 120deg,#0000 0),
        conic-gradient(from -180deg at calc(100%/3) 50%,#adafff-use-$secondaryColor  60deg,$patternColor 0 120deg,#0000 0),
        conic-gradient(from 60deg at calc(200%/3) 50%,$patternColor  60deg,#fff-use-$tertiaryColor 0 120deg,#0000 0),
        conic-gradient(from -60deg at 50% calc(100%/3),$patternColor 120deg,#adafff-use-$secondaryColor 0 240deg,#fff-use-$tertiaryColor 0)`,
        backgroundSize: '$patternSize-3.5 $patternSize-2',
        backgroundColorDisplay: false,
    },
    {
        label: 'Buildings (3D)',
        value: 'Buildings (3D)',
        patternColor: '#474bff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,
        background: `
        conic-gradient(from -60deg at 50% calc(100%/3),$patternColor 0 120deg,#0000 0),
        conic-gradient(from 120deg at 50% calc(200%/3),$patternColor 0 120deg,#0000 0),
        conic-gradient(from  60deg at calc(200%/3),$patternColor 60deg,#adafff-use-$secondaryColor 0 120deg,#0000 0),
        conic-gradient(from 180deg at calc(100%/3),#fff-use-$tertiaryColor 60deg,$patternColor 0 120deg,#0000 0),
        linear-gradient(90deg,#fff-use-$tertiaryColor calc(100%/6),#adafff-use-$secondaryColor 0 50%,
        #fff-use-$tertiaryColor 0 calc(500%/6), #adafff-use-$secondaryColor 0)`,
        backgroundSize: '$patternSize-3.5 $patternSize-2',
        backgroundColorDisplay: false,
    },
    {
        label: 'Rooms (3D)',
        value: 'Rooms (3D)',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        conic-gradient(from -116.36deg at 25% 75%,$backgroundColor 52.72deg,#0000 0), conic-gradient(from -116.36deg at 25% 75%,$backgroundColor 52.72deg,#0000 0) calc(3*$patternSize) calc($patternSize/2),
        conic-gradient(from   63.43deg at 75% 75%,$backgroundColor 52.72deg,#0000 0), conic-gradient(from   63.43deg at 75% 75%,$backgroundColor 52.72deg,#0000 0) calc(3*$patternSize) calc($patternSize/2),
        conic-gradient(
          #adafff-use-$secondaryColor   63.43deg ,$patternColor 0 116.36deg,
          #adafff-use-$secondaryColor 0 180deg   ,$patternColor 0 243.43deg,
          #adafff-use-$secondaryColor 0 296.15deg,$patternColor 0)`,
        backgroundSize: '$patternSize-2 $patternSize',
        backgroundColorDisplay: false,
    },
    {
        label: 'Tubes (3D)',
        value: 'Tubes (3D)',
        patternColor: '#474bff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,
        background: `
        linear-gradient(145deg,#adafff-use-$secondaryColor 10%,$patternColor 10.5% 19%,#0000 19.5% 80.5%,$patternColor 81% 89.5%,#fff-use-$tertiaryColor 90%),
        linear-gradient(145deg,#adafff-use-$secondaryColor 10%,$patternColor 10.5% 19%,#0000 19.5% 80.5%,$patternColor 81% 89.5%,#fff-use-$tertiaryColor 90%) calc($patternSize) $patternSize-2,
        linear-gradient(35deg,#adafff-use-$secondaryColor 10%,$patternColor 10.5% 19%,#0000 19.5% 80.5%,$patternColor 81% 89.5%,#fff-use-$tertiaryColor 90%),
        linear-gradient( 35deg,#adafff-use-$secondaryColor 10%,$patternColor 10.5% 19%,#0000 19.5% 80.5%,$patternColor 81% 89.5%,#fff-use-$tertiaryColor 90%) calc($patternSize) $patternSize-2,
        conic-gradient(from -90deg at 37.5% 50%,#0000 75%,#adafff-use-$secondaryColor 0) calc($patternSize/4) 0,
        conic-gradient(from -90deg at 37.5% 50%,#0000 75%,#fff-use-$tertiaryColor 0) calc($patternSize) 0,
        linear-gradient(90deg,#fff-use-$tertiaryColor 38%,#adafff-use-$secondaryColor 0 50%,#fff-use-$tertiaryColor 0 62%,#adafff-use-$secondaryColor 0)`,
        backgroundSize: '$patternSize-2 calc(2*$patternSize-2/3)',
        backgroundColorDisplay: false,
    },
    {
        label: 'Stairs (3D)',
        value: 'Stairs (3D)',
        patternColor: '#474bff',
        backgroundColor: '#47d3ff',
        secondaryColor: '#ff003d',
        patternSize: 32,
        background: `
        conic-gradient(at 50% 25%,#0000 75%,$backgroundColor 0),conic-gradient(at 50% 25%,#0000 75%,$backgroundColor 0) $patternSize $patternSize,
        conic-gradient(at 50% 25%,#0000 75%,$backgroundColor 0) calc(2*$patternSize) calc(2*$patternSize),
        conic-gradient(at 50% 25%,#0000 75%,$backgroundColor 0) calc(3*$patternSize) calc(3*$patternSize),
        repeating-linear-gradient(135deg,#adafff-use-$secondaryColor 0 12.5%,$patternColor 0 25%)`,
        backgroundSize: 'calc(4 * $patternSize) calc(4*$patternSize)',
        backgroundColorDisplay: false,
    },
    {
        label: 'Pyramids v1 (3D)',
        value: 'Pyramids v1 (3D)',
        patternColor: '#474bff',
        backgroundColor: '#e0e1ff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,
        background: `
        linear-gradient(315deg, transparent 75%, $patternColor 0)-$patternSize-0.5 0,
        linear-gradient(45deg, transparent 75%, $patternColor 0) $patternSize-0.5 0,
        linear-gradient(135deg, #adafff-use-$secondaryColor 50%, transparent 0) 0 0,
        linear-gradient(45deg, $backgroundColor 50%, #fff-use-$tertiaryColor 0) 0 0 #fff-use-$tertiaryColor`,
        backgroundSize: '$patternSize $patternSize',
        backgroundColorDisplay: false,
    },
    {
        label: 'Pyramids v2 (3D)',
        value: 'Pyramids v2 (3D)',
        patternColor: '#474bff',
        secondaryColor: '#ff003d',
        tertiaryColor: '#21bf73',
        patternSize: 32,
        background: `
        conic-gradient(from 75deg,#adafff-use-$secondaryColor   15deg ,$patternColor 0 30deg ,#0000 0 180deg, $patternColor 0 195deg,#adafff-use-$secondaryColor 0 210deg,#0000 0) calc(0.5*$patternSize) calc(0.5*$patternSize/0.577),
        conic-gradient(#adafff-use-$secondaryColor   30deg ,#fff-use-$tertiaryColor 0 75deg, #adafff-use-$secondaryColor 0 90deg, $patternColor 0 105deg, #fff-use-$tertiaryColor 0 150deg, $patternColor 0 180deg,#fff-use-$tertiaryColor 0 210deg, #adafff-use-$secondaryColor 0 256deg, $patternColor 0 270deg,#adafff-use-$secondaryColor 0 286deg, $patternColor 0 331deg,#fff-use-$tertiaryColor 0)`,
        backgroundSize: '$patternSize calc($patternSize/0.577)',
        backgroundColorDisplay: false,
    },
]

const customHexToRgbOpacity = (color: string) => {
    // Remove '#' if present
    color = color.replace(/^#/, '')

    // Parse the r, g, b values
    let r = parseInt(color.slice(0, 2), 16)
    let g = parseInt(color.slice(2, 4), 16)
    let b = parseInt(color.slice(4, 6), 16)

    // Return the RGB string without the alpha value
    return `rgba(${r}, ${g}, ${b}`
}

const filterCSS = (text: string, css: IForm) => {
    if (!text) return ''
    return text
        ?.replaceAll(
            '$patternColor-rgb,0.75)-use-$secondaryColor',
            !!css.useSecondaryColor
                ? css?.secondaryColor!
                : `${customHexToRgbOpacity(css?.patternColor! || '#000000')},0.75)`,
        )
        ?.replaceAll(
            '$patternColor-rgb,0.5)-use-$tertiaryColor',
            !!css.useTertiaryColor
                ? css?.tertiaryColor!
                : `${customHexToRgbOpacity(css?.patternColor! || '#000000')},0.5)`,
        )
        ?.replaceAll(
            '$patternColor-use-$secondaryColor',
            !!css.useSecondaryColor ? css?.secondaryColor! : css?.patternColor!,
        )
        ?.replaceAll(
            '$backgroundColor-use-$tertiaryColor',
            !!css.useTertiaryColor
                ? css?.tertiaryColor!
                : css?.backgroundColor!,
        )
        ?.replaceAll(
            '#adafff-use-$secondaryColor',
            !!css.useSecondaryColor ? css?.secondaryColor! : '#adafff',
        )
        ?.replaceAll(
            '#fff-use-$tertiaryColor',
            !!css.useTertiaryColor ? css?.tertiaryColor! : '#fff',
        )
        ?.replaceAll(
            '$patternColor-rgb',
            customHexToRgbOpacity(css?.patternColor! || '#000000'),
        )
        ?.replaceAll('$backgroundColor', css?.backgroundColor || '')
        ?.replaceAll('$secondaryColor', css?.secondaryColor || '')
        ?.replaceAll('$patternColor', css?.patternColor || '')
        ?.replaceAll('$tertiaryColor', css?.tertiaryColor || '')
        ?.replaceAll(
            '$patternSize-2-35%',
            Math.floor(
                Number(css?.patternSize!) * 2 -
                    Number(css?.patternSize!) * 0.35,
            )?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-0.35',
            Math.floor(Number(css?.patternSize!) * 0.35)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-0.45',
            Math.floor(Number(css?.patternSize!) * 0.45)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-0.75',
            Math.floor(Number(css?.patternSize!) * 0.75)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-0.95',
            Math.floor(Number(css?.patternSize!) * 0.95)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-0.375',
            Math.floor(Number(css?.patternSize!) * 0.375)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-1.05',
            Math.floor(Number(css?.patternSize!) * 1.05)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-1.125',
            Math.floor(Number(css?.patternSize!) * 1.125)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-1.154',
            Math.floor(Number(css?.patternSize!) * 1.154)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-1.75',
            Math.floor(Number(css?.patternSize!) * 1.75)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-1.25',
            Math.floor(Number(css?.patternSize!) * 1.25)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-0.25',
            Math.floor(Number(css?.patternSize!) * 0.25)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-1.5',
            Math.floor(Number(css?.patternSize!) * 1.5)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-3.5',
            Math.floor(Number(css?.patternSize!) * 3.5)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-3',
            Math.floor(Number(css?.patternSize!) * 3)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-2.25',
            Math.floor(Number(css?.patternSize!) * 2.25)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-2.3',
            Math.floor(Number(css?.patternSize!) * 2.3)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-2',
            (Number(css?.patternSize!) * 2)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize-0.5',
            (Number(css?.patternSize!) * 0.5)?.toString() + 'px',
        )
        .replaceAll(
            '$patternSize-4',
            (Number(css?.patternSize!) * 4)?.toString() + 'px',
        )
        .replaceAll(
            '$patternSize-5',
            (Number(css?.patternSize!) * 5)?.toString() + 'px',
        )
        ?.replaceAll(
            '$patternSize',
            Number(css?.patternSize!)?.toString() + 'px',
        )
        ?.replaceAll(
            '$dotSize-2',
            (Number(css?.dotSize!) * 2)?.toString() + 'px',
        )
        .replaceAll(
            '$dotSize-0.5',
            (Number(css?.dotSize!) * 0.5)?.toString() + 'px',
        )
        ?.replaceAll('$dotSize', Number(css?.dotSize!)?.toString() + 'px')
        ?.replaceAll(
            '$lineWidth-2',
            (Number(css?.lineWidth!) * 2)?.toString() + 'px',
        )
        ?.replaceAll(
            '$lineWidth-0.5',
            (Number(css?.lineWidth!) * 0.5)?.toString() + 'px',
        )
        ?.replaceAll('$lineWidth', Number(css?.lineWidth!)?.toString() + 'px')
}

const getCSS = (css: IForm) => {
    return `${
        css?.backgroundImage
            ? `background-image: ${filterCSS(css?.backgroundImage, css)};`
            : ''
    }
${css?.background ? `background: ${filterCSS(css?.background, css)};` : ''}
${css?.backgroundPosition ? `background-position: ${filterCSS(css?.backgroundPosition, css)};` : ''}
${css?.backgroundSize && css.backgroundSizeDisplay ? `background-size: ${filterCSS(css?.backgroundSize, css)};` : ''}
${css?.backgroundBlendMode ? `background-blend-mode: ${filterCSS(css?.backgroundBlendMode, css)};` : ''}
${css?.backgroundColor && css.backgroundColorDisplay ? `background-color: ${css?.backgroundColor};` : ''}`.replace(
        /^\s*[\r\n]/gm,
        '',
    )
}

const CSSBackgroundPatternGeneratorForm = () => {
    const {
        register,
        control,
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        defaultValues: {
            ...patternTypes[0],
            patternType: patternTypes[0].value,
            backgroundColorDisplay: true,
            backgroundSizeDisplay: true,
        },
    })

    const copyToClipboard = (text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                toast({
                    title: 'Copied to clipboard!',
                    variant: 'success',
                })
            })
        }
    }

    const shuffleColors = () => {
        setValue('patternColor', helper.generateRandomColor())
        setValue('backgroundColor', helper.generateRandomColor())
        setValue('secondaryColor', helper.generateRandomColor())
        setValue('tertiaryColor', helper.generateRandomColor())
    }

    const currentPatternType = patternTypes.find(
        (type) => type.value === watch('patternType'),
    )

    const cssData = watch()

    const textCode = getCSS(cssData)

    return (
        <div className="container">
            <style jsx>
                {`
                    .gradient-bg {
                        ${textCode}
                    }
                `}
            </style>

            <div className="mx-auto my-5 w-full max-w-5xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form className="space-y-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center gap-3 text-sm font-medium text-black">
                            <div className="gradient-bg relative flex aspect-square w-full max-w-[400px] items-center justify-center overflow-auto rounded-lg shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]"></div>
                            <div className="flex justify-center gap-5 lg:col-span-3">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            type="button"
                                            variant={'outline-general'}
                                        >
                                            View full screen
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="h-full w-full max-w-full border-none bg-transparent p-10 [&>.dialog-close]:text-white">
                                        <DialogTitle className='hidden'></DialogTitle>
                                        <div className="gradient-bg relative flex w-full items-center justify-center overflow-auto rounded-lg shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]"></div>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    type="button"
                                    variant={'outline-general'}
                                    onClick={shuffleColors}
                                >
                                    Shuffle colors
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10 lg:col-span-2 lg:flex-row">
                            <div className="grow space-y-5">
                                <div>
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Pattern type
                                    </label>
                                    <Select
                                        value={watch('patternType')}
                                        onValueChange={(val) => {
                                            const selectedPatternType =
                                                patternTypes?.find(
                                                    (type) =>
                                                        type.value === val,
                                                )
                                            setValue('patternType', val)

                                            setValue(
                                                'patternColor',
                                                !!selectedPatternType?.patternColor
                                                    ? selectedPatternType?.patternColor
                                                    : '',
                                            )

                                            setValue(
                                                'background',
                                                !!selectedPatternType?.background
                                                    ? selectedPatternType?.background
                                                    : '',
                                            )

                                            setValue(
                                                'backgroundImage',
                                                !!selectedPatternType?.backgroundImage
                                                    ? selectedPatternType?.backgroundImage
                                                    : '',
                                            )

                                            setValue(
                                                'backgroundPosition',
                                                !!selectedPatternType?.backgroundPosition
                                                    ? selectedPatternType?.backgroundPosition
                                                    : '',
                                            )

                                            setValue(
                                                'backgroundSize',
                                                !!selectedPatternType?.backgroundSize
                                                    ? selectedPatternType?.backgroundSize
                                                    : '',
                                            )

                                            setValue(
                                                'backgroundColor',
                                                !!selectedPatternType?.backgroundColor
                                                    ? selectedPatternType?.backgroundColor
                                                    : '',
                                            )

                                            setValue(
                                                'secondaryColor',
                                                !!selectedPatternType?.secondaryColor
                                                    ? selectedPatternType?.secondaryColor
                                                    : '',
                                            )

                                            setValue(
                                                'tertiaryColor',
                                                !!selectedPatternType?.tertiaryColor
                                                    ? selectedPatternType?.tertiaryColor
                                                    : '',
                                            )
                                            selectedPatternType?.useSecondaryColor !==
                                                undefined &&
                                                setValue(
                                                    'useSecondaryColor',
                                                    selectedPatternType?.useSecondaryColor,
                                                )
                                            selectedPatternType?.useTertiaryColor !==
                                                undefined &&
                                                setValue(
                                                    'useTertiaryColor',
                                                    selectedPatternType?.useTertiaryColor,
                                                )

                                            setValue(
                                                'patternSize',
                                                !!selectedPatternType?.patternSize
                                                    ? selectedPatternType?.patternSize
                                                    : undefined,
                                            )

                                            setValue(
                                                'lineWidth',
                                                !!selectedPatternType?.lineWidth
                                                    ? selectedPatternType?.lineWidth
                                                    : undefined,
                                            )

                                            setValue(
                                                'dotSize',
                                                !!selectedPatternType?.dotSize
                                                    ? selectedPatternType?.dotSize
                                                    : undefined,
                                            )

                                            setValue(
                                                'backgroundColorDisplay',
                                                selectedPatternType?.backgroundColorDisplay !==
                                                    undefined
                                                    ? selectedPatternType?.backgroundColorDisplay
                                                    : true,
                                            )

                                            setValue(
                                                'backgroundSizeDisplay',
                                                selectedPatternType?.backgroundSizeDisplay !==
                                                    undefined
                                                    ? selectedPatternType?.backgroundSizeDisplay
                                                    : true,
                                            )

                                            setValue(
                                                'backgroundBlendMode',
                                                !!selectedPatternType?.backgroundBlendMode
                                                    ? selectedPatternType?.backgroundBlendMode
                                                    : undefined,
                                            )
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select pattern type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {patternTypes.map((type, key) => {
                                                const modifiedType = {
                                                    ...type,
                                                    patternColor: '#000000',
                                                    backgroundColor: '#f3f4f6',
                                                    secondaryColor: '#4b5563',
                                                    tertiaryColor: '#e5e7eb',
                                                    patternSize: 5,
                                                    lineWidth: 1,
                                                    dotSize: 1,
                                                    backgroundColorDisplay:
                                                        type.backgroundColorDisplay ??
                                                        true,
                                                    backgroundSizeDisplay:
                                                        type.backgroundSizeDisplay ??
                                                        true,
                                                    useSecondaryColor:
                                                        type.useSecondaryColor ??
                                                        true,
                                                    useTertiaryColor:
                                                        type.useTertiaryColor ??
                                                        true,
                                                }
                                                return (
                                                    <SelectItem
                                                        key={key}
                                                        value={type.value}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className={`select-bg-${key} block size-6 rounded-lg`}
                                                                style={{
                                                                    ...(modifiedType?.background && {
                                                                        background:
                                                                            filterCSS(
                                                                                modifiedType.background,
                                                                                modifiedType,
                                                                            ),
                                                                    }),
                                                                    ...(modifiedType?.backgroundImage && {
                                                                        backgroundImage:
                                                                            filterCSS(
                                                                                modifiedType.backgroundImage,
                                                                                modifiedType,
                                                                            ),
                                                                    }),
                                                                    ...(modifiedType?.backgroundPosition && {
                                                                        backgroundPosition:
                                                                            filterCSS(
                                                                                modifiedType.backgroundPosition,
                                                                                modifiedType,
                                                                            ),
                                                                    }),
                                                                    ...(modifiedType?.backgroundSize &&
                                                                        modifiedType?.backgroundSizeDisplay && {
                                                                            backgroundSize:
                                                                                filterCSS(
                                                                                    modifiedType.backgroundSize,
                                                                                    modifiedType,
                                                                                ),
                                                                        }),
                                                                    ...(modifiedType?.backgroundColor &&
                                                                        modifiedType?.backgroundColorDisplay && {
                                                                            backgroundColor:
                                                                                filterCSS(
                                                                                    modifiedType.backgroundColor,
                                                                                    modifiedType,
                                                                                ),
                                                                        }),
                                                                    ...(modifiedType?.backgroundBlendMode && {
                                                                        backgroundBlendMode:
                                                                            filterCSS(
                                                                                modifiedType.backgroundBlendMode,
                                                                                modifiedType,
                                                                            ),
                                                                    }),
                                                                }}
                                                            ></span>
                                                            <span>
                                                                {type.label}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-5 lg:grid-cols-2">
                                    {!!currentPatternType?.patternColor && (
                                        <ColorPicker
                                            labelName="Pattern color"
                                            value={watch('patternColor')}
                                            placeholder="#ffffff"
                                            onColorChange={(val: string) => {
                                                setValue('patternColor', val)
                                            }}
                                        />
                                    )}
                                    {!!currentPatternType?.backgroundColor && (
                                        <ColorPicker
                                            labelName="Background color"
                                            value={watch('backgroundColor')}
                                            placeholder="#ffffff"
                                            onColorChange={(val: string) => {
                                                setValue('backgroundColor', val)
                                            }}
                                        />
                                    )}
                                </div>

                                {!!currentPatternType?.secondaryColor && (
                                    <div className="grid gap-5 lg:grid-cols-2">
                                        <ColorPicker
                                            disabled={
                                                !watch('useSecondaryColor')
                                            }
                                            labelName="Secondary color"
                                            value={watch('secondaryColor')}
                                            placeholder="#ffffff"
                                            onColorChange={(val: string) => {
                                                setValue('secondaryColor', val)
                                            }}
                                        />

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="useSecondaryColor"
                                                checked={watch(
                                                    'useSecondaryColor',
                                                )}
                                                onCheckedChange={(value) => {
                                                    setValue(
                                                        'useSecondaryColor',
                                                        !watch(
                                                            'useSecondaryColor',
                                                        ),
                                                    )
                                                }}
                                            />

                                            <label
                                                htmlFor="useSecondaryColor"
                                                className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Use secondary color
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {!!currentPatternType?.tertiaryColor && (
                                    <div className="grid gap-5 lg:grid-cols-2">
                                        <ColorPicker
                                            disabled={
                                                !watch('useTertiaryColor')
                                            }
                                            labelName="Tertiary color"
                                            value={watch('tertiaryColor')}
                                            placeholder="#ffffff"
                                            onColorChange={(val: string) => {
                                                setValue('tertiaryColor', val)
                                            }}
                                        />

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="useTertiaryColor"
                                                checked={watch(
                                                    'useTertiaryColor',
                                                )}
                                                onCheckedChange={(value) => {
                                                    setValue(
                                                        'useTertiaryColor',
                                                        !watch(
                                                            'useTertiaryColor',
                                                        ),
                                                    )
                                                }}
                                            />

                                            <label
                                                htmlFor="useTertiaryColor"
                                                className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Use tertiary color
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {!!currentPatternType?.patternSize && (
                                    <div>
                                        <label className="block text-sm font-medium text-black">
                                            Pattern size
                                        </label>
                                        <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                            <Slider
                                                value={[
                                                    watch('patternSize') || 1,
                                                ]}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'patternSize',
                                                        value[0],
                                                    )
                                                }
                                                min={10}
                                                max={100}
                                                step={1}
                                            />
                                            <span className="min-w-10 shrink-0 text-start">
                                                {watch('patternSize')}px
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {!!currentPatternType?.lineWidth && (
                                    <div>
                                        <label className="block text-sm font-medium text-black">
                                            Line width
                                        </label>
                                        <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                            <Slider
                                                value={[
                                                    watch('lineWidth') || 1,
                                                ]}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'lineWidth',
                                                        value[0],
                                                    )
                                                }
                                                min={0.5}
                                                max={10}
                                                step={0.5}
                                            />
                                            <span className="min-w-10 shrink-0 text-start">
                                                {watch('lineWidth')}px
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {!!currentPatternType?.dotSize && (
                                    <div>
                                        <label className="block text-sm font-medium text-black">
                                            Dot size
                                        </label>
                                        <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                            <Slider
                                                value={[watch('dotSize') || 1]}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'dotSize',
                                                        value[0],
                                                    )
                                                }
                                                min={0.5}
                                                max={10}
                                                step={0.5}
                                            />
                                            <span className="min-w-10 shrink-0 text-start">
                                                {watch('dotSize')}px
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="prose max-w-full lg:col-span-3">
                            <div className="flex w-full rounded-xl bg-white px-4 py-3 text-sm/[18px] font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                                <pre className="my-0 bg-white py-0">
                                    <code className="text-black">
                                        {textCode}
                                    </code>
                                </pre>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 lg:col-span-3">
                            <Button
                                type="button"
                                variant={'outline-general'}
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button
                                type="button"
                                onClick={() => copyToClipboard(textCode)}
                            >
                                Copy
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CSSBackgroundPatternGeneratorForm
