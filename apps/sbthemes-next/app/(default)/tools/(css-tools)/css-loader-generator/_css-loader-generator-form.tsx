'use client'

import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import LoaderCard from '@/app/(default)/tools/(css-tools)/css-loader-generator/_loader-card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

type ILoader = {
    name: string
    category: string
    primaryColor: string
    secondaryColor?: string
    size: string
    speed: string
    code: string
}

export type ILoaderForm = {
    category: string
    loaders: ILoader[]
}

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

const categories = [
    {
        label: 'Spinners',
        value: 'Spinners',
    },
    {
        label: 'Progress Loaders',
        value: 'Progress Loaders',
    },
    {
        label: 'Dot Loaders',
        value: 'Dot Loaders',
    },
    {
        label: 'Bar Loaders',
        value: 'Bar Loaders',
    },
    {
        label: 'Shape Loaders',
        value: 'Shape Loaders',
    },
    {
        label: 'Flipping Loaders',
        value: 'Flipping Loaders',
    },
    {
        label: 'Colorful Loaders',
        value: 'Colorful Loaders',
    },
    {
        label: 'Pulse Loaders',
        value: 'Pulse Loaders',
    },
    {
        label: 'Hypnotic Loaders',
        value: 'Hypnotic Loaders',
    },
    {
        label: 'Blob Loaders',
        value: 'Blob Loaders',
    },
]

export const sizeOptions = [
    {
        label: 'Mini',
        value: 'Mini',
        calculation: 3, // 8*3 = 24
    },
    {
        label: 'Small',
        value: 'Small',
        calculation: 5, // 8*5 = 40
    },
    {
        label: 'Medium',
        value: 'Medium',
        calculation: 7, // 8*7 = 56
    },
    {
        label: 'Large',
        value: 'Large',
        calculation: 9, // 8*9 = 72
    },
    {
        label: 'Huge',
        value: 'Huge',
        calculation: 11, // 8*11 = 88
    },
]

export const speedOptions = [
    {
        label: 'Very Slow',
        value: 'Very Slow',
        calculation: 14, // 0.1*14 = 1.4
    },
    {
        label: 'Slow',
        value: 'Slow',
        calculation: 12, // 0.1*12 = 1.2
    },
    {
        label: 'Average',
        value: 'Average',
        calculation: 10, // 0.1*10 = 1
    },
    {
        label: 'Fast',
        value: 'Fast',
        calculation: 8, // 0.1*8 = 0.8
    },
    {
        label: 'Very Fast',
        value: 'Very Fast',
        calculation: 6, // 0.1*6 = 0.6
    },
]

const loaders: ILoader[] = [
    // Spinners
    {
        name: 'Basic',
        category: 'Spinners',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   border: $(size-1.285)px solid $secondaryColor;
   border-color: $secondaryColor;
   border-right-color: $primaryColor;
   animation: spinner-d3wgkg $(speed-0.1)s infinite linear;
}

@keyframes spinner-d3wgkg {
   to {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Comet',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   background: conic-gradient(#0000 10%,$primaryColor);
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - $(size-1.285)px),#000 0);
   animation: spinner-zp9dbg $(speed-0.1)s infinite linear;
}

@keyframes spinner-zp9dbg {
   to {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Rounded Head Comet',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   background: radial-gradient(farthest-side,$primaryColor 94%,#0000) top/$(size-1.285)px $(size-1.285)px no-repeat,
          conic-gradient(#0000 30%,$primaryColor);
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - $(size-1.285)px),#000 0);
   animation: spinner-c7wet2 $(speed-0.1)s infinite linear;
}

@keyframes spinner-c7wet2 {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Material UI',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   border: $(size-1.285)px solid $primaryColor;
   animation: spinner-bulqg1 $(speed-0.08)s infinite linear alternate,
        spinner-oaa3wk $(speed-0.16)s infinite linear;
}

@keyframes spinner-bulqg1 {
   0% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
   }

   12.5% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
   }

   25% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
   }

   50% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
   }

   62.5% {
      clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
   }

   75% {
      clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
   }

   100% {
      clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
   }
}

@keyframes spinner-oaa3wk {
   0% {
      transform: scaleY(1) rotate(0deg);
   }

   49.99% {
      transform: scaleY(1) rotate(135deg);
   }

   50% {
      transform: scaleY(-1) rotate(0deg);
   }

   100% {
      transform: scaleY(-1) rotate(-135deg);
   }
}
</style>`,
    },
    {
        name: 'Counter Arcs',
        category: 'Spinners',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   display: grid;
   animation: spinner-plncf9 $(speed-0.4)s infinite;
}

.spinner::before,
.spinner::after {
   content: "";
   grid-area: 1/1;
   border: $(size-1.285)px solid;
   border-radius: 50%;
   border-color: $primaryColor $primaryColor #0000 #0000;
   mix-blend-mode: darken;
   animation: spinner-plncf9 $(speed-0.1)s infinite linear;
}

.spinner::after {
   border-color: #0000 #0000 $secondaryColor $secondaryColor;
   animation-direction: reverse;
}

@keyframes spinner-plncf9 {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Circular Tube',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border: $(size-1.6)px $primaryColor double;
   border-left-style: solid;
   border-radius: 50%;
   animation: spinner-aib1d7 $(speed-0.075)s infinite linear;
}

@keyframes spinner-aib1d7 {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Dot Ring',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-1.6)px;
   height: $(size-1.6)px;
   animation: spinner-z355kx $(speed-0.1)s infinite linear;
   border-radius: $(size-1.6)px;
   box-shadow: $(size-4)px 0px 0 0 $primaryColor, $(size-2.485)px $(size-3.114)px 0 0 $primaryColor, -$(size-0.885)px $(size-3.885)px 0 0 $primaryColor, -$(size-3.6)px $(size-1.714)px 0 0 $primaryColor, -$(size-3.6)px -$(size-1.714)px 0 0 $primaryColor, -$(size-0.885)px -$(size-3.885)px 0 0 $primaryColor, $(size-2.485)px -$(size-3.114)px 0 0 $primaryColor;
}

@keyframes spinner-z355kx {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Half Ring',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-1.6)px;
   height: $(size-1.6)px;
   border-radius: $(size-1.6)px;
   box-shadow: $(size-4)px 0px 0 0 $(primaryColorRgb-0.2), $(size-3.242)px $(size-2.357)px 0 0 $(primaryColorRgb-0.4), $(size-1.24)px $(size-3.8)px 0 0 $(primaryColorRgb-0.6), -$(size-1.24)px $(size-3.8)px 0 0 $(primaryColorRgb-0.8), -$(size-3.242)px $(size-2.357)px 0 0 $primaryColor;
   animation: spinner-b87k6z $(speed-0.1)s infinite linear;
}

@keyframes spinner-b87k6z {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Scaling Dot Ring',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   --d: $(size-3.52)px;
   width: $(size-0.64)px;
   height: $(size-0.64)px;
   border-radius: 50%;
   color: $primaryColor;
   box-shadow: calc(1*var(--d))      calc(0*var(--d))     0 0,
          calc(0.707*var(--d))  calc(0.707*var(--d)) 0 $(size-0.16)px,
          calc(0*var(--d))      calc(1*var(--d))     0 $(size-0.32)px,
          calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 $(size-0.48)px,
          calc(-1*var(--d))     calc(0*var(--d))     0 $(size-0.64)px,
          calc(-0.707*var(--d)) calc(-0.707*var(--d))0 $(size-0.8)px,
          calc(0*var(--d))      calc(-1*var(--d))    0 $(size-0.96)px;
   animation: spinner-a90wxe $(speed-0.1)s infinite steps(8);
}

@keyframes spinner-a90wxe {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Circular Bar',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   display: grid;
   border-radius: 50%;
   -webkit-mask: radial-gradient(farthest-side,#0000 40%,$primaryColor 41%);
   background: linear-gradient(0deg ,$(primaryColorRgb-0.5) 50%,$(primaryColorRgb-1) 0) center/$(size-0.64)px 100%,
        linear-gradient(90deg,$(primaryColorRgb-0.25) 50%,$(primaryColorRgb-0.75) 0) center/100% $(size-0.64)px;
   background-repeat: no-repeat;
   animation: spinner-d3o0rx $(speed-0.1)s infinite steps(12);
}

.spinner::before,
.spinner::after {
   content: "";
   grid-area: 1/1;
   border-radius: 50%;
   background: inherit;
   opacity: 0.915;
   transform: rotate(30deg);
}

.spinner::after {
   opacity: 0.83;
   transform: rotate(60deg);
}

@keyframes spinner-d3o0rx {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Circular Square',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   padding: $(size-0.16)px;
   background: conic-gradient(#0000 10%,$primaryColor) content-box;
   -webkit-mask: repeating-conic-gradient(#0000 0deg,#000 1deg 20deg,#0000 21deg 36deg),
        radial-gradient(farthest-side,#0000 calc(100% - $(size-1.28)px),#000 calc(100% - $(size-1.28)px));
   -webkit-mask-composite: destination-in;
   mask-composite: intersect;
   animation: spinner-d55elj $(speed-0.1)s infinite steps(10);
}

@keyframes spinner-d55elj {
   to {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Mexican Wave',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   position: absolute;
   width: $(size-1.28)px;
   height: $(size-1.28)px;
}

.spinner div {
   position: absolute;
   width: 50%;
   height: 150%;
   background: $primaryColor;
   transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
   animation: spinner-fzua35 $(speed-0.1)s calc(var(--delay) * $(speed-0.1)s) infinite ease;
}

.spinner div:nth-child(1) {
   --delay: 0.1;
   --rotation: 36;
   --translation: 150;
}

.spinner div:nth-child(2) {
   --delay: 0.2;
   --rotation: 72;
   --translation: 150;
}

.spinner div:nth-child(3) {
   --delay: 0.3;
   --rotation: 108;
   --translation: 150;
}

.spinner div:nth-child(4) {
   --delay: 0.4;
   --rotation: 144;
   --translation: 150;
}

.spinner div:nth-child(5) {
   --delay: 0.5;
   --rotation: 180;
   --translation: 150;
}

.spinner div:nth-child(6) {
   --delay: 0.6;
   --rotation: 216;
   --translation: 150;
}

.spinner div:nth-child(7) {
   --delay: 0.7;
   --rotation: 252;
   --translation: 150;
}

.spinner div:nth-child(8) {
   --delay: 0.8;
   --rotation: 288;
   --translation: 150;
}

.spinner div:nth-child(9) {
   --delay: 0.9;
   --rotation: 324;
   --translation: 150;
}

.spinner div:nth-child(10) {
   --delay: 1;
   --rotation: 360;
   --translation: 150;
}

@keyframes spinner-fzua35 {
   0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
      transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
   }

   50% {
      transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
   }
}
</style>`,
    },
    {
        name: 'Double Arc',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   border: $(size-1.28)px solid;
   border-color: $primaryColor #0000;
   animation: spinner-0tkp9a $(speed-0.1)s infinite;
}

@keyframes spinner-0tkp9a {
   to {
      transform: rotate(.5turn);
   }
}
</style>`,
    },
    {
        name: 'Quadruple Arc',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   background: $primaryColor;
   -webkit-mask: repeating-conic-gradient(#0000 0deg,#000 1deg 70deg,#0000 71deg 90deg),
        radial-gradient(farthest-side,#0000 calc(100% - $(size-1.44)px),#000 calc(100% - $(size-1.28)px));
   -webkit-mask-composite: destination-in;
   mask-composite: intersect;
   animation: spinner-mv2oco $(speed-0.1)s infinite;
}

@keyframes spinner-mv2oco {
   to {
      transform: rotate(.5turn);
   }
}
</style>`,
    },
    {
        name: 'Alarm',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   position: relative;
}

.spinner::before,
.spinner::after {
   content: '';
   border-radius: 50%;
   position: absolute;
   transform: translate(-50%, -50%);
}

.spinner::before {
   width: $(size-2.24)px;
   height: $(size-2.24)px;
   background: $primaryColor;
}

.spinner::after {
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-y7ej37 $(speed-0.1)s infinite linear;
   border: $(size-1.6)px solid $primaryColor;
   border-left-color: transparent;
   border-right-color: transparent;
}

@keyframes spinner-y7ej37 {
   to {
      transform: translate(-50%, -50%) rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Chase',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   position: relative;
   width: $(size-3.2)px;
   height: $(size-3.2)px;
}

.spinner::before,
.spinner::after {
   content: '';
   width: 100%;
   height: 100%;
   display: block;
   animation: spinner-b4c8mmsm $(speed-0.05)s backwards, spinner-49opz7sm $(speed-0.125)s $(speed-0.05)s infinite ease;
   border: $(size-0.8)px solid $primaryColor;
   border-radius: 50%;
   box-shadow: 0 -$(size-4.8)px 0 -$(size-0.8)px $primaryColor;
   position: absolute;
}

.spinner::after {
   animation-delay: 0s, $(speed-0.125)s;
}

@keyframes spinner-b4c8mmsm {
   from {
      box-shadow: 0 0 0 -$(size-0.8)px $primaryColor;
   }
}

@keyframes spinner-49opz7sm {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Borders',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   position: relative;
   width: $(size-8)px;
   height: $(size-8)px;
   display: flex;
   align-items: center;
   justify-content: center;
}

.spinner::before,
.spinner::after {
   border: $(size-0.96)px solid $primaryColor;
   border-radius: 50%;
   position: absolute;
   content: '';
   display: block;
}

.spinner::before {
   width: $(size-4.8)px;
   height: $(size-4.8)px;
   border-bottom-color: transparent;
   border-left-color: transparent;
   animation: spinner-1o3y8q $(speed-0.075)s infinite linear reverse;
}

.spinner::after {
   animation: spinner-1o3y8q $(speed-0.05)s infinite linear;
   height: $(size-8)px;
   width: $(size-8)px;
   border-right-color: transparent;
   border-top-color: transparent;
}

@keyframes spinner-1o3y8q {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Siblings',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   display: flex;
   align-items: center;
   width: $(size-12)px;
   height: $(size-8)px;
}

.spinner::before,
.spinner::after {
   content: '';
   border: $(size-0.96)px solid $primaryColor;
   border-radius: 50%;
   display: block;
}

.spinner::before {
   width: $(size-4)px;
   height: $(size-4)px;
   animation: spinner-lsyq73 $(speed-0.075)s infinite linear reverse;
   border-left-color: transparent;
}

.spinner::after {
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-lsyq73 $(speed-0.15)s infinite linear;
   border-right-color: transparent;
}

@keyframes spinner-lsyq73 {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Dot in a Tube',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   background: radial-gradient(farthest-side,$primaryColor 95%,#0000) 50% $(size-0.16)px/$(size-1.92)px $(size-1.92)px no-repeat,
        radial-gradient(farthest-side,#0000 calc(100% - $(size-2.24)px),$(primaryColorRgb-0.1) 0);
   animation: spinner-aur408 $(speed-0.1)s infinite linear;
}

@keyframes spinner-aur408 {
   to {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Dot in Infinite Path',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   position: relative;
   width: $(size-8)px;
   height: $(size-8)px;
}

.spinner > div {
   width: 100%;
   height: 100%;
   border-radius: 50%;
   border: $(size-1.92)px solid $(primaryColorRgb-0.1);
   position: absolute;
   top: 0;
   left: 0;
   animation: spinner-g7vlvwsm $(speed-0.065)s linear infinite;
   z-index: 0;
}

.spinner > div::before {
   content: '';
   height: $(size-1.92)px;
   width: $(size-1.92)px;
   border-radius: 50%;
   background: $primaryColor;
   position: absolute;
   top: 50%;
   animation: spinner-h1vps1sm $(speed-0.13)s infinite reverse steps(1);
   transform: translate(calc(2 * var(--translate-2)), calc(var(--translate) * 1%));
   z-index: 1;
}

.spinner > div:nth-of-type(1) {
   --translate: -50;
   --translate-2: calc($(size-8)px / 8);
}

.spinner > div:nth-of-type(1)::before {
   right: 0;
}

.spinner > div:nth-of-type(2) {
   --translate: 50;
   --translate-2: calc(-$(size-8)px / 8);
   animation-delay: $(speed-0.065)s;
   animation-direction: reverse;
   transform: translate($(size-3.04)px, 0);
}

.spinner > div:nth-of-type(2)::before {
   left: 0;
   transform: translate(calc(-$(size-8)px / 4), -50%);
   animation-direction: normal;
}

@keyframes spinner-h1vps1sm {
   0% {
      opacity: 0;
   }

   50% {
      opacity: 1;
   }
}

@keyframes spinner-g7vlvwsm {
   from {
      transform: translate(calc(var(--translate) * 1%), 0) translate(calc(var(--translate-2)), 0) rotate(0deg);
   }

   to {
      transform: translate(calc(var(--translate) * 1%), 0) translate(calc(var(--translate-2)), 0) rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Arcs in Infinite Path',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   position: relative;
   width: $(size-8)px;
   height: $(size-8)px;
}

.spinner::before,
.spinner::after {
   content: '';
   width: 100%;
   height: 100%;
   animation: spinner-rfi6tk $(speed-0.1)s infinite linear;
   box-sizing: border-box;
   border: $(size-1.6)px solid $(primaryColorRgb-0.1);
   border-radius: 50%;
   position: absolute;
}

.spinner::before {
   animation-direction: reverse;
   border-right-color: $primaryColor;
   right: calc(50% - $(size-0.8)px);
}

.spinner::after {
   border-left-color: $primaryColor;
   left: calc(50% - $(size-0.8)px);
}

@keyframes spinner-rfi6tk {
   0% {
      transform: rotate(0deg);
   }

   50%, 100% {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Race',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   display: grid;
   border: $(size-0.64)px solid #0000;
   border-radius: 50%;
   border-right-color: $primaryColor;
   animation: spinner-a4dj62 $(speed-0.1)s infinite linear;
}

.spinner::before,
.spinner::after {
   content: "";
   grid-area: 1/1;
   margin: $(size-0.32)px;
   border: inherit;
   border-radius: 50%;
   animation: spinner-a4dj62 $(speed-0.2)s infinite;
}

.spinner::after {
   margin: $(size-1.28)px;
   animation-duration: $(speed-0.3)s;
}

@keyframes spinner-a4dj62 {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Nested Arc',
        category: 'Spinners',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   display: grid;
   border: $(size-0.64)px solid #0000;
   border-radius: 50%;
   border-color: $secondaryColor #0000;
   animation: spinner-e04l1k $(speed-0.1)s infinite linear;
}

.spinner::before,
.spinner::after {
   content: "";
   grid-area: 1/1;
   margin: $(size-0.32)px;
   border: inherit;
   border-radius: 50%;
}

.spinner::before {
   border-color: $primaryColor #0000;
   animation: inherit;
   animation-duration: $(speed-0.05)s;
   animation-direction: reverse;
}

.spinner::after {
   margin: $(size-1.28)px;
}

@keyframes spinner-e04l1k {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Windmill',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   display: grid;
   color: $primaryColor;
   background: linear-gradient(currentColor 0 0) center/100% $(size-0.48)px,
          linear-gradient(currentColor 0 0) center/$(size-0.48)px 100%;
   background-repeat: no-repeat;
   animation: spinner-slq5ph $(speed-0.2)s infinite;
}

.spinner::before,
.spinner::after {
   content: "";
   grid-area: 1/1;
   background: repeating-conic-gradient(#0000 0 35deg,currentColor 0 90deg);
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - $(size-0.48)px),#000 0);
   border-radius: 50%;
}

.spinner::after {
   margin: 20%;
}

@keyframes spinner-slq5ph {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Double Dot',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-0.8)px;
   height: $(size-0.8)px;
   animation: spinner-xp626r $(speed-0.1)s infinite;
   border-radius: 50%;
   box-shadow: $(size-3.2)px 0 0 $(size-0.8)px $primaryColor, -$(size-3.2)px 0 0 $(size-0.8)px $primaryColor;
}

@keyframes spinner-xp626r {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: '4-Dot',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   --c: radial-gradient(farthest-side,$primaryColor 92%,#0000);
   background: var(--c) 50% 0,
          var(--c) 50% 100%,
          var(--c) 100% 50%,
          var(--c) 0    50%;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   animation: spinner-kh173p $(speed-0.1)s infinite;
}

@keyframes spinner-kh173p {
   to {
      transform: rotate(.5turn);
   }
}
</style>`,
    },
    {
        name: '8-Dot',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   display: grid;
}

.spinner::before,
.spinner::after {
   content: "";
   grid-area: 1/1;
   background: var(--c) 50%  0,
        var(--c) 50%  100%,
        var(--c) 100% 50%,
        var(--c) 0    50%;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   animation: spinner-3hs4a3 $(speed-0.1)s infinite;
}

.spinner::before {
   --c: radial-gradient(farthest-side,$primaryColor 92%,#0000);
   margin: $(size-0.64)px;
   background-size: $(size-1.28)px $(size-1.28)px;
   animation-timing-function: linear;
}

.spinner::after {
   --c: radial-gradient(farthest-side,$primaryColor 92%,#0000);
}

@keyframes spinner-3hs4a3 {
   100% {
      transform: rotate(.5turn);
   }
}
</style>`,
    },
    {
        name: 'Meet up',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   width: $(size-1.6)px;
   height: $(size-1.6)px;
   animation: spinner-o824ag $(speed-0.1)s infinite linear;
}

.spinner div {
   position: absolute;
   width: 100%;
   height: 100%;
   background: $primaryColor;
   border-radius: 50%;
   animation: spinner-vse6n7 $(speed-0.125)s infinite ease;
}

.spinner div:nth-child(1) {
   --rotation: 90;
}

.spinner div:nth-child(2) {
   --rotation: 180;
}

.spinner div:nth-child(3) {
   --rotation: 270;
}

.spinner div:nth-child(4) {
   --rotation: 360;
}

@keyframes spinner-vse6n7 {
   0%, 100% {
      transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
   }

   50% {
      transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
   }
}

@keyframes spinner-o824ag {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Pan-out Circle',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   --radius: $(size-4.8);
   --size: $(size-2.4);
   position: relative;
   width: calc(var(--size) * 1px);
   height: calc(var(--size) * 1px);
}

.spinner div {
   position: absolute;
   width: 100%;
   height: 100%;
   background: $primaryColor;
   border-radius: 50%;
   transform: rotate(calc(var(--angle) * 1deg)) translate(0, calc(var(--radius) * 0px));
   animation: spinner-19rk4d $(speed-0.15)s calc(var(--delay) * $(speed-0.12)s) infinite ease;
}

.spinner div:nth-child(1) {
   --angle: 45;
   --delay: 0.1;
}

.spinner div:nth-child(2) {
   --angle: 90;
   --delay: 0.2;
}

.spinner div:nth-child(3) {
   --angle: 135;
   --delay: 0.3;
}

.spinner div:nth-child(4) {
   --angle: 180;
   --delay: 0.4;
}

.spinner div:nth-child(5) {
   --angle: 225;
   --delay: 0.5;
}

.spinner div:nth-child(6) {
   --angle: 270;
   --delay: 0.6;
}

.spinner div:nth-child(7) {
   --angle: 315;
   --delay: 0.7;
}

.spinner div:nth-child(8) {
   --angle: 360;
   --delay: 0.8;
}

@keyframes spinner-19rk4d {
   0%, 30%, 50%, 100% {
      transform: rotate(calc(var(--angle) * 1deg)) translate(0, calc(var(--radius) * 0px)) scale(0);
   }

   40% {
      transform: rotate(calc(var(--angle) * 1deg)) translate(0, calc(var(--radius) * 1px)) scale(1);
   }
}
</style>`,
    },
    {
        name: 'Gyro',
        category: 'Spinners',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   position: relative;
   width: $(size-3.2)px;
   height: $(size-3.2)px;
}

.spinner::before,
.spinner::after {
   --radius: 250;
   content: '';
   position: absolute;
   width: 100%;
   height: 100%;
   animation: spinner-w7nm60 $(speed-0.2)s infinite linear;
   background: $primaryColor;
   border-radius: 50%;
}

.spinner::before {
   --radius: -250;
   background: $secondaryColor;
}

@keyframes spinner-w7nm60 {
   0% {
      transform: scale(1) rotate(0deg) translateY(calc(var(--radius) * 1%));
   }

   50% {
      transform: scale(0.5) rotate(1440deg) translateY(0);
   }

   100% {
      transform: scale(1) rotate(2920deg) translateY(calc(var(--radius) * 1%));
   }
}
</style>`,
    },
    {
        name: 'Whirl',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-4.8)px;
   height: $(size-4.8)px;
   animation: spinner-98imc8 $(speed-0.2)s infinite linear;
   background-color: $primaryColor;
   border-radius: 50%;
}

@keyframes spinner-98imc8 {
   0% {
      transform: scale(0) rotate(-45deg) translateY(0);
   }

   50% {
      transform: scale(1.25) rotate(960deg) translateY(100%);
   }

   100% {
      transform: scale(0) rotate(2000deg) translateY(0);
   }
}
</style>`,
    },
    {
        name: 'Orbit',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-c601d3 $(speed-0.1)s infinite;
   background-color: $primaryColor;
   border-radius: 50%;
}

@keyframes spinner-c601d3 {
   0% {
      opacity: 0;
      transform: scale(0) translateX(-300%);
   }

   50% {
      opacity: 1;
      transform: scale(1.25) translateX(0);
   }

   100% {
      opacity: 0;
      transform: scale(0) translateX(300%);
   }
}
</style>`,
    },
    {
        name: 'Rotary',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-4)px;
   height: $(size-4)px;
   animation: spinner-4aro8p $(speed-0.1)s infinite linear;
   background-color: $primaryColor;
   border-radius: 50%;
}

@keyframes spinner-4aro8p {
   0% {
      transform: rotate(0deg) translateX(150%) scale(1);
   }

   25% {
      transform: rotate(90deg) translateX(150%) scale(0);
   }

   75% {
      transform: rotate(270deg) translateX(150%) scale(1.5);
   }

   100% {
      transform: rotate(360deg) translateX(150%) scale(1);
   }
}
</style>`,
    },
    {
        name: 'Flashlight',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   position: relative;
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-xza56z $(speed-0.2)s infinite linear;
}

.spinner::before,
.spinner::after {
   content: '';
   position: absolute;
   top: 50%;
   left: 50%;
   background: $primaryColor;
   border-radius: 50%;
   animation: spinner-lqsq3g $(speed-0.125)s infinite ease;
}

.spinner::before {
   height: 75%;
   width: 75%;
   transform-origin: -40% -80%;
}

.spinner::after {
   height: 50%;
   width: 50%;
   transform-origin: 40% 80%;
}

@keyframes spinner-xza56z {
   to {
      transform: rotate(360deg);
   }
}

@keyframes spinner-lqsq3g {
   0%, 100% {
      transform: translate(-50%, -50%) scale(1);
   }

   50% {
      transform: translate(-50%, -50%) scale(0);
   }
}
</style>`,
    },
    {
        name: 'Follow The Leader - Circle',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   position: relative;
   width: $(size-2.24)px;
   height: $(size-2.24)px;
}

.spinner div {
   animation: spinner-4t3wzl $(speed-0.1875)s infinite backwards;
   background-color: $primaryColor;
   border-radius: 50%;
   height: 100%;
   position: absolute;
   width: 100%;
}

.spinner div:nth-child(1) {
   animation-delay: $(speed-0.015)s;
   background-color: $(primaryColorRgb-0.9);
}

.spinner div:nth-child(2) {
   animation-delay: $(speed-0.03)s;
   background-color: $(primaryColorRgb-0.8);
}

.spinner div:nth-child(3) {
   animation-delay: $(speed-0.045)s;
   background-color: $(primaryColorRgb-0.7);
}

.spinner div:nth-child(4) {
   animation-delay: $(speed-0.06)s;
   background-color: $(primaryColorRgb-0.6);
}

.spinner div:nth-child(5) {
   animation-delay: $(speed-0.075)s;
   background-color: $(primaryColorRgb-0.5);
}

@keyframes spinner-4t3wzl {
   0% {
      transform: rotate(0deg) translateY(-200%);
   }

   60%, 100% {
      transform: rotate(360deg) translateY(-200%);
   }
}
</style>`,
    },
    {
        name: 'Follow The Leader - Line',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   position: relative;
   width: $(size-2.24)px;
   height: $(size-2.24)px;
}

.spinner div {
   width: 100%;
   height: 100%;
   background-color: $primaryColor;
   border-radius: 50%;
   animation: spinner-4t3wzl $(speed-0.125)s infinite backwards;
}

.spinner div:nth-child(1) {
   animation-delay: $(speed-0.015)s;
   background-color: $(primaryColorRgb-0.9);
}

.spinner div:nth-child(2) {
   animation-delay: $(speed-0.03)s;
   background-color: $(primaryColorRgb-0.8);
}

.spinner div:nth-child(3) {
   animation-delay: $(speed-0.045)s;
   background-color: $(primaryColorRgb-0.7);
}

.spinner div:nth-child(4) {
   animation-delay: $(speed-0.06)s;
   background-color: $(primaryColorRgb-0.6);
}

.spinner div:nth-child(5) {
   animation-delay: $(speed-0.075)s;
   background-color: $(primaryColorRgb-0.5);
}

@keyframes spinner-4t3wzl {
   0% {
      transform: rotate(0deg) translateY(-200%);
   }

   60%, 100% {
      transform: rotate(360deg) translateY(-200%);
   }
}
</style>`,
    },
    {
        name: 'Spinning Coin',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-8k6ao5sm $(speed-0.3)s infinite;
   border-radius: 50%;
   background-color: $primaryColor;
   transform-origin: center;
}

@keyframes spinner-8k6ao5sm {
   0% {
      transform: perspective(160px) rotateY(0deg);
   }

   10% {
      transform: perspective(160px) rotateY(-65deg);
   }

   90%, 100% {
      transform: perspective(160px) rotateY(2880deg);
   }
}
</style>`,
    },
    {
        name: 'Spinning Coin Fall',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-2zdk3tsm $(speed-0.3)s infinite;
   border-radius: 50%;
   background-color: $primaryColor;
   transform-origin: center;
   opacity: 0;
}

@keyframes spinner-2zdk3tsm {
   0% {
      transform: perspective(160px) rotateY(0deg) rotateX(0deg);
   }

   10% {
      opacity: 1;
      transform: perspective(160px) rotateY(-65deg) rotateX(0deg);
   }

   70% {
      opacity: 1;
      transform: perspective(160px) rotateY(1440deg) rotateX(0deg);
   }

   90%, 100% {
      opacity: 1;
      transform: perspective(160px) rotateY(2880deg) rotateX(90deg);
   }
}
</style>`,
    },
    {
        name: 'Fidget',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-3419ln $(speed-0.2)s infinite ease;
   border-radius: 50%;
   background-color: $primaryColor;
}

@keyframes spinner-3419ln {
   10% {
      transform: skewX(60deg);
   }

   20% {
      transform: skewX(-60deg);
   }

   30% {
      transform: skewX(0deg);
   }

   40% {
      transform: skewY(60deg);
   }

   50% {
      transform: skewY(-60deg);
   }

   60% {
      transform: skewY(0);
   }
}
</style>`,
    },
    {
        name: 'Pie Chart',
        category: 'Spinners',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   background: repeating-conic-gradient($primaryColor 0 90deg,$secondaryColor 0 180deg);
   animation: spinner-a78xsi $(speed-0.1)s infinite linear;
}

@keyframes spinner-a78xsi {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Hypnotic',
        category: 'Spinners',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   --R: $(size-4)px;
   --g1: $primaryColor 96%, #0000;
   --g2: $secondaryColor 96%, #0000;
   width: calc(2*var(--R));
   height: calc(2*var(--R));
   border-radius: 50%;
   display: grid;
   -webkit-mask: linear-gradient(#000 0 0);
   animation: spinner-maxc6n $(speed-0.2)s infinite linear;
}

.spinner::before,
.spinner::after {
   content: "";
   grid-area: 1/1;
   width: 50%;
   background: radial-gradient(farthest-side,var(--g1)) calc(var(--R) + 0.866*var(--R) - var(--R)) calc(var(--R) - 0.5*var(--R)   - var(--R)),
        radial-gradient(farthest-side,var(--g1)) calc(var(--R) + 0.866*var(--R) - var(--R)) calc(var(--R) - 0.5*var(--R)   - var(--R)),
        radial-gradient(farthest-side,var(--g2)) calc(var(--R) + 0.5*var(--R)   - var(--R)) calc(var(--R) - 0.866*var(--R) - var(--R)),
        radial-gradient(farthest-side,var(--g1)) 0 calc(-1*var(--R)),
        radial-gradient(farthest-side,var(--g2)) calc(var(--R) - 0.5*var(--R)   - var(--R)) calc(var(--R) - 0.866*var(--R) - var(--R)),
        radial-gradient(farthest-side,var(--g1)) calc(var(--R) - 0.866*var(--R) - var(--R)) calc(var(--R) - 0.5*var(--R)   - var(--R)),
        radial-gradient(farthest-side,var(--g2)) calc(-1*var(--R))  0,
        radial-gradient(farthest-side,var(--g1)) calc(var(--R) - 0.866*var(--R) - var(--R)) calc(var(--R) + 0.5*var(--R)   - var(--R));
   background-size: calc(2*var(--R)) calc(2*var(--R));
   background-repeat: no-repeat;
}

.spinner::after {
   transform: rotate(180deg);
   transform-origin: right;
}

@keyframes spinner-maxc6n {
   100% {
      transform: rotate(-1turn);
   }
}
</style>`,
    },
    {
        name: 'Fat Plus',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   --s: $(size-1.28)px;
   width: $(size-8)px;
   height: $(size-8)px;
   background: $primaryColor;
   border-radius: 50%;
   animation: spinner-ehcge9 $(speed-0.2)s infinite linear;
   clip-path: polygon(0 0,calc(50% - var(--s)) 0,50% var(--s),calc(50% + var(--s)) 0,100% 0,100% calc(50% - var(--s)),calc(100% - var(--s)) 50%,100% calc(50% + var(--s)),100% 100%,calc(50% + var(--s)) 100%, 50% calc(100% - var(--s)),calc(50% - var(--s)) 100%,0 100%,0 calc(50% + var(--s)), var(--s) 50%, 0 calc(50% - var(--s)));
}

@keyframes spinner-ehcge9 {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Bar Spin',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   position: relative;
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-x0t3la $(speed-0.3)s infinite linear;
}

.spinner::before {
   content: '';
   display: block;
   height: $(size-8)px;
   width: $(size-1.6)px;
   animation: spinner-x0t3la $(speed-0.05)s infinite;
   background: $primaryColor;
   position: absolute;
   left: 50%;
   margin-left: -$(size-0.8)px;
}

@keyframes spinner-x0t3la {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Box Spin',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   position: relative;
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-yfb90w $(speed-0.3)s infinite linear;
}

.spinner::before {
   content: '';
   display: block;
   height: $(size-4)px;
   width: $(size-4)px;
   /*animation: spin $(speed-0.05)s infinite*/;
   background: $primaryColor;
   position: absolute;
   left: 50%;
   top: 50%;
   margin-left: -$(size-4)px;
   margin-top: -$(size-4)px;
}

@keyframes spinner-yfb90w {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Eight',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-4.8)px;
   height: $(size-4.8)px;
   background-color: $primaryColor;
   animation: spinner-3ockk4 $(speed-0.15)s infinite ease;
}

@keyframes spinner-3ockk4 {
   0% {
      transform: rotate(0deg);
      transform-origin: left bottom;
   }

   50% {
      transform-origin: left bottom;
      transform: rotate(360deg);
   }

   51% {
      transform-origin: right top;
   }

   100% {
      transform-origin: right top;
      transform: rotate(0deg);
   }
}
</style>`,
    },
    {
        name: 'Wind-up',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border: $(size-0.96)px solid $primaryColor;
   animation: spinner-kk2y8v $(speed-0.3)s infinite;
}

@keyframes spinner-kk2y8v {
   0% {
      transform: rotate(0deg);
   }

   10%, 15% {
      transform: rotate(-90deg);
   }

   20%, 25% {
      transform: rotate(-180deg);
   }

   30%, 35% {
      transform: rotate(-270deg);
   }

   40%, 50% {
      transform: rotate(-360deg);
   }

   100% {
      transform: rotate(720deg);
   }
}
</style>`,
    },
    {
        name: 'Book',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   position: relative;
   width: $(size-4.8)px;
   height: $(size-4.8)px;
   perspective: $(size-9.6)px;
}

.spinner div {
   width: 100%;
   height: 100%;
   background: $primaryColor;
   position: absolute;
   left: 50%;
   transform-origin: left;
   animation: spinner-16s03x $(speed-0.2)s infinite;
}

.spinner div:nth-child(1) {
   animation-delay: $(speed-0.015)s;
}

.spinner div:nth-child(2) {
   animation-delay: $(speed-0.03)s;
}

.spinner div:nth-child(3) {
   animation-delay: $(speed-0.045)s;
}

.spinner div:nth-child(4) {
   animation-delay: $(speed-0.06)s;
}

.spinner div:nth-child(5) {
   animation-delay: $(speed-0.075)s;
}

@keyframes spinner-16s03x {
   0% {
      transform: rotateY(0deg);
   }

   50%, 80% {
      transform: rotateY(-180deg);
   }

   90%, 100% {
      opacity: 0;
      transform: rotateY(-180deg);
   }
}
</style>`,
    },
    {
        name: 'Cube',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   animation: spinner-y0fdc1 $(speed-0.2)s infinite ease;
   transform-style: preserve-3d;
}

.spinner > div {
   background-color: $(primaryColorRgb-0.2);
   height: 100%;
   position: absolute;
   width: 100%;
   border: $(size-0.32)px solid $primaryColor;
}

.spinner div:nth-of-type(1) {
   transform: translateZ(-$(size-3.2)px) rotateY(180deg);
}

.spinner div:nth-of-type(2) {
   transform: rotateY(-270deg) translateX(50%);
   transform-origin: top right;
}

.spinner div:nth-of-type(3) {
   transform: rotateY(270deg) translateX(-50%);
   transform-origin: center left;
}

.spinner div:nth-of-type(4) {
   transform: rotateX(90deg) translateY(-50%);
   transform-origin: top center;
}

.spinner div:nth-of-type(5) {
   transform: rotateX(-90deg) translateY(50%);
   transform-origin: bottom center;
}

.spinner div:nth-of-type(6) {
   transform: translateZ($(size-3.2)px);
}

@keyframes spinner-y0fdc1 {
   0% {
      transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
   }

   50% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
   }

   100% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
   }
}
</style>`,
    },
    {
        name: 'Rotating Gear',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   display: grid;
   color: $primaryColor;
   background: radial-gradient(farthest-side, currentColor calc(100% - $(size-0.96)px),#0000 calc(100% - $(size-0.8)px) 0);
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - $(size-2.08)px),#000 calc(100% - $(size-1.92)px));
   border-radius: 50%;
   animation: spinner-sm4bhi $(speed-0.2)s infinite linear;
}

.spinner::before,
.spinner::after {
   content: "";
   grid-area: 1/1;
   background: linear-gradient(currentColor 0 0) center,
          linear-gradient(currentColor 0 0) center;
   background-size: 100% $(size-1.6)px,$(size-1.6)px 100%;
   background-repeat: no-repeat;
}

.spinner::after {
   transform: rotate(45deg);
}

@keyframes spinner-sm4bhi {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Rudder',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   color: $primaryColor;
   background: linear-gradient(currentColor 0 0) center/100% $(size-0.64)px,
          linear-gradient(currentColor 0 0) center/$(size-0.64)px 100%,
          radial-gradient(farthest-side,#0000 calc(100% - $(size-0.96)px),currentColor calc(100% - $(size-0.8)px)),
          radial-gradient(circle $(size-0.96)px,currentColor 94%,#0000 0);
   background-repeat: no-repeat;
   animation: spinner-mu2ebf $(speed-0.1)s infinite linear;
   position: relative;
}

.spinner::before {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: inherit;
   background: inherit;
   transform: rotate(45deg);
}

@keyframes spinner-mu2ebf {
   to {
      transform: rotate(.5turn);
   }
}
</style>`,
    },
    {
        name: 'Arrow Head',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   padding: $(size-0.96)px;
   background: conic-gradient(from 135deg at top,$primaryColor 90deg, #0000 0) 0 calc(50% - $(size-0.64)px)/$(size-2.72)px $(size-1.36)px,
          radial-gradient(farthest-side at bottom left,#0000 calc(100% - $(size-0.96)px),$primaryColor calc(100% - $(size-0.8)px) 99%,#0000) top right/50%  50% content-box content-box,
          radial-gradient(farthest-side at top,#0000 calc(100% - $(size-0.96)px),$primaryColor calc(100% - $(size-0.8)px) 99%,#0000) bottom   /100% 50% content-box content-box;
   background-repeat: no-repeat;
   animation: spinner-v8og74 $(speed-0.1)s infinite linear;
}

@keyframes spinner-v8og74 {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Solitaire Ring',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   padding: $(size-0.48)px;
   background: radial-gradient(farthest-side,$primaryColor 95%,#0000) 50% 0/$(size-1.92)px $(size-1.92)px no-repeat,
          radial-gradient(farthest-side,#0000 calc(100% - $(size-0.8)px),$primaryColor calc(100% - $(size-0.64)px)) content-box;
   animation: spinner-x3enp9 $(speed-0.15)s infinite;
}

@keyframes spinner-x3enp9 {
   to {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Centrifugal',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner"></div>

<style>
.spinner {
   width: $(size-8)px;
   height: $(size-8)px;
   border-radius: 50%;
   background: $primaryColor;
   -webkit-mask: radial-gradient(circle closest-side at 50% 40%,#0000 94%, #000);
   transform-origin: 50% 40%;
   animation: spinner-pl92zb $(speed-0.1)s infinite linear;
}

@keyframes spinner-pl92zb {
   100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Ring of Stars',
        category: 'Spinners',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
.spinner {
   position: relative;
   width: $(size-8)px;
   height: $(size-8)px;
   animation: spinner-3a5251 $(speed-0.125)s infinite linear;
}

.spinner div {
   position: absolute;
   top: 50%;
   left: 50%;
   width: 0;
   height: 0;
   border-left: $(size-0.52)px solid transparent;
   border-right: $(size-0.52)px solid transparent;
   border-bottom: $(size-1.54)px solid $primaryColor;
   transform-origin: center $(size-1.54)px;
}

.spinner div:before,
.spinner div:after {
   content: '';
   position: absolute;
   width: 0;
   height: 0;
   display: block;
   border-left: $(size-1.54)px solid transparent;
   border-right: $(size-1.54)px solid transparent;
   border-bottom: $(size-1.02)px solid $primaryColor;
}

.spinner div:before {
   transform: translate(-$(size-1.54)px, $(size-1.02)px) rotate(35deg);
}

.spinner div:after {
   transform: translate(-$(size-1.54)px, $(size-1.02)px) rotate(-35deg);
}

.spinner div:nth-child(1) {
   transform: translate(-50%, -$(size-1.54)px) rotate(51.42857deg) translate(0, 320%);
}

.spinner div:nth-child(2) {
   transform: translate(-50%, -$(size-1.54)px) rotate(102.85714deg) translate(0, 320%);
}

.spinner div:nth-child(3) {
   transform: translate(-50%, -$(size-1.54)px) rotate(154.28571deg) translate(0, 320%);
}

.spinner div:nth-child(4) {
   transform: translate(-50%, -$(size-1.54)px) rotate(205.71429deg) translate(0, 320%);
}

.spinner div:nth-child(5) {
   transform: translate(-50%, -$(size-1.54)px) rotate(257.14286deg) translate(0, 320%);
}

.spinner div:nth-child(6) {
   transform: translate(-50%, -$(size-1.54)px) rotate(308.57143deg) translate(0, 320%);
}

.spinner div:nth-child(7) {
   transform: translate(-50%, -$(size-1.54)px) rotate(360deg) translate(0, 320%);
}

@keyframes spinner-3a5251 {
   to {
      transform: rotate(360deg);
   }
}
</style>`,
    },

    // Progress Loaders

    {
        name: 'Rectangular',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-14.4)px;
   height: $(size-2.4)px;
   background: linear-gradient($primaryColor 0 0) left/0% 100% no-repeat
       $secondaryColor;
   animation: progress-jgv380 $(speed-0.2)s infinite linear;
}

@keyframes progress-jgv380 {
   100% {
      background-size: 100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Multi Square',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-14.4)px;
   height: $(size-2.4)px;
   -webkit-mask: linear-gradient(90deg,$primaryColor 70%,#0000 0) left/20% 100%;
   background: linear-gradient($primaryColor 0 0) left/0% 100% no-repeat
       $secondaryColor;
   animation: progress-422c3u $(speed-0.2)s infinite steps(6);
}

@keyframes progress-422c3u {
   100% {
      background-size: 120% 100%;
   }
}
</style>`,
    },
    {
        name: 'Painted',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-14.4)px;
   height: $(size-2.4)px;
   background: linear-gradient($primaryColor 50%,#0000 0),
        linear-gradient(#0000 50%,$primaryColor 0),
        linear-gradient($primaryColor 50%,#0000 0),
        linear-gradient(#0000 50%,$primaryColor 0),
        linear-gradient($primaryColor 50%,#0000 0),
        linear-gradient(#0000 50%,$primaryColor 0)
        $secondaryColor;
   background-size: calc(100%/6 + 1px) 200%;
   background-repeat: no-repeat;
   animation: progress-qh65fe $(speed-0.2)s infinite;
}

@keyframes progress-qh65fe {
   0% {
      background-position: 0% 100%, 20%   0%, 40% 100%, 60%   0%, 80% 100%, 100%   0%;
   }

   16.67% {
      background-position: 0%   0%, 20%   0%, 40% 100%, 60%   0%, 80% 100%, 100%   0%;
   }

   33.33% {
      background-position: 0%   0%, 20% 100%, 40% 100%, 60%   0%, 80% 100%, 100%   0%;
   }

   50% {
      background-position: 0%   0%, 20% 100%, 40%   0%, 60%   0%, 80% 100%, 100%   0%;
   }

   66.67% {
      background-position: 0%   0%, 20% 100%, 40%   0%, 60% 100%, 80% 100%, 100%   0%;
   }

   83.33% {
      background-position: 0%   0%, 20% 100%, 40%   0%, 60% 100%, 80%   0%, 100%   0%;
   }

   100% {
      background-position: 0%   0%, 20% 100%, 40%   0%, 60% 100%, 80%   0%, 100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Rounded Edge',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-14.4)px;
   height: $(size-2.4)px;
   border-radius: $(size-2.4)px;
   background: linear-gradient($primaryColor 0 0) left/0% 100% no-repeat $secondaryColor;
   animation: progress-c2d4ps $(speed-0.2)s infinite steps(10);
}

@keyframes progress-c2d4ps {
   100% {
      background-size: 110% 100%;
   }
}
</style>`,
    },
    {
        name: 'Spiral',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-14.4)px;
   height: $(size-2.4)px;
   border-radius: $(size-2.4)px;
   background: repeating-linear-gradient(135deg,$primaryColor 0 $(size-1.2)px,$(primaryColorRgb-0.75) 0 $(size-2.4)px) left/0%   100% no-repeat,
         repeating-linear-gradient(135deg,$(primaryColorRgb-0.2) 0 $(size-1.2)px,$(primaryColorRgb-0.1) 0 $(size-2.4)px) left/100% 100%;
   animation: progress-p43u5e $(speed-0.2)s infinite;
}

@keyframes progress-p43u5e {
   100% {
      background-size: 100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Bordered',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-19.2)px;
   height: $(size-3.52)px;
   border-radius: $(size-3.2)px;
   color: $primaryColor;
   border: $(size-0.32)px solid;
   position: relative;
}

.progress::before {
   content: "";
   position: absolute;
   margin: $(size-0.32)px;
   inset: 0 100% 0 0;
   border-radius: inherit;
   background: currentColor;
   animation: progress-pf82op $(speed-0.2)s infinite;
}

@keyframes progress-pf82op {
   100% {
      inset: 0;
   }
}
</style>`,
    },
    {
        name: 'Multi Diamond',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-14.88)px;
   height: $(size-2.88)px;
   -webkit-mask: conic-gradient(from 135deg at top   ,#0000,#000 .5deg 90deg,#0000 90.5deg) 0 0   ,
        conic-gradient(from -45deg at bottom,#0000,#000 .5deg 90deg,#0000 90.5deg) 0 100%;
   -webkit-mask-size: 25% 50%;
   -webkit-mask-repeat: repeat-x;
   background: linear-gradient($primaryColor 0 0) left/0% 100% no-repeat $secondaryColor;
   animation: progress-f21yn7 $(speed-0.2)s infinite linear;
}

@keyframes progress-f21yn7 {
   100% {
      background-size: 100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Multi Dot',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-14.4)px;
   height: $(size-2.4)px;
   -webkit-mask: radial-gradient(circle closest-side,$primaryColor 94%,#0000) left/20% 100%;
   background: linear-gradient($primaryColor 0 0) left/0% 100% no-repeat $secondaryColor;
   animation: progress-c3ir73 $(speed-0.2)s infinite steps(6);
}

@keyframes progress-c3ir73 {
   100% {
      background-size: 120% 100%;
   }
}
</style>`,
    },
    {
        name: 'Joined Dots',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-14.88)px;
   height: $(size-2.88)px;
   -webkit-mask: radial-gradient(circle closest-side,#000 94%,#0000) 0 0/25% 100%,
        linear-gradient(#000 0 0) center/calc(100% - $(size-1.44)px) calc(100% - $(size-1.44)px) no-repeat;
   background: linear-gradient($primaryColor 0 0) left/0% 100% no-repeat
       $secondaryColor;
   animation: progress-d7mi5a $(speed-0.2)s infinite linear;
}

@keyframes progress-d7mi5a {
   100% {
      background-size: 100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Striped Circle',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-9.6)px;
   height: $(size-9.6)px;
   border-radius: 50%;
   -webkit-mask: linear-gradient(0deg,#000 55%,#0000 0) bottom/100% 18.18%;
   background: linear-gradient($primaryColor 0 0) bottom/100% 0% no-repeat
       $secondaryColor;
   animation: progress-522wn2 $(speed-0.2)s infinite steps(7);
}

@keyframes progress-522wn2 {
   100% {
      background-size: 100% 115%;
   }
}
</style>`,
    },
    {
        name: 'Signal',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-9.6)px;
   height: $(size-8)px;
   -webkit-mask: linear-gradient(90deg,#000 70%,#0000 0) 0% 100% / 20% 20%,
          linear-gradient(90deg,#000 70%,#0000 0) 25% 100% / 20% 40%,
          linear-gradient(90deg,#000 70%,#0000 0) 50% 100% / 20% 60%,
          linear-gradient(90deg,#000 70%,#0000 0) 75% 100% / 20% 80%,
          linear-gradient(90deg,#000 70%,#0000 0) 100% 100% / 20% 100%;
   -webkit-mask-repeat: no-repeat;
   background: linear-gradient($primaryColor 0 0) left/0% 100% no-repeat $secondaryColor;
   animation: progress-0beb2c $(speed-0.2)s infinite steps(6);
}

@keyframes progress-0beb2c {
   100% {
      background-size: 120% 100%;
   }
}
</style>`,
    },
    {
        name: 'Rising Sun',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-19.2)px;
   height: $(size-9.6)px;
   border-radius: $(size-32)px $(size-32)px 0 0;
   -webkit-mask: repeating-radial-gradient(farthest-side at bottom ,#0000 0,#000 1px 12%,#0000 calc(12% + 1px) 20%);
   background: radial-gradient(farthest-side at bottom,$primaryColor 0 95%,#0000 0) bottom/0% 0% no-repeat
       $secondaryColor;
   animation: progress-e37qus $(speed-0.2)s infinite steps(6);
}

@keyframes progress-e37qus {
   100% {
      background-size: 120% 120%;
   }
}
</style>`,
    },
    {
        name: 'Time',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-9.6)px;
   height: $(size-9.6)px;
   border-radius: 50%;
   animation: progress-96zj2n $(speed-0.2)s infinite;
}

@keyframes progress-96zj2n {
   0% {
      background: conic-gradient($primaryColor 0     ,#0000 0);
   }

   12.5% {
      background: conic-gradient($primaryColor 45deg ,#0000 46deg);
   }

   25% {
      background: conic-gradient($primaryColor 90deg ,#0000 91deg);
   }

   37.5% {
      background: conic-gradient($primaryColor 135deg,#0000 136deg);
   }

   50% {
      background: conic-gradient($primaryColor 180deg,#0000 181deg);
   }

   62.5% {
      background: conic-gradient($primaryColor 225deg,#0000 226deg);
   }

   75% {
      background: conic-gradient($primaryColor 270deg,#0000 271deg);
   }

   87.5% {
      background: conic-gradient($primaryColor 315deg,#0000 316deg);
   }

   100% {
      background: conic-gradient($primaryColor 360deg,#0000 360deg);
   }
}
</style>`,
    },
    {
        name: 'Stop Watch',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-9.6)px;
   height: $(size-9.6)px;
   border: $(size-2.4)px solid $secondaryColor;
   border-radius: 50%;
   position: relative;
   transform: rotate(45deg);
}

.progress::before {
   content: "";
   position: absolute;
   inset: -$(size-2.4)px;
   border-radius: 50%;
   border: $(size-2.4)px solid $primaryColor;
   animation: progress-1tucza $(speed-0.2)s infinite linear;
}

@keyframes progress-1tucza {
   0% {
      clip-path: polygon(50% 50%,0 0,0    0,0    0   ,0    0   ,0    0   );
   }

   25% {
      clip-path: polygon(50% 50%,0 0,100% 0,100% 0   ,100% 0   ,100% 0   );
   }

   50% {
      clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%);
   }

   75% {
      clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0    100%,0    100%);
   }

   100% {
      clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0    100%,0    0   );
   }
}
</style>`,
    },
    {
        name: 'Wavy',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   --r1: 154%;
   --r2: 68.5%;
   width: $(size-9.6)px;
   height: $(size-9.6)px;
   border-radius: 50%;
   background: radial-gradient(var(--r1) var(--r2) at top   ,#0000 79.5%,$primaryColor 80%) center left,
        radial-gradient(var(--r1) var(--r2) at bottom,$primaryColor 79.5%,#0000 80%) center center,
        radial-gradient(var(--r1) var(--r2) at top   ,#0000 79.5%,$primaryColor 80%) center right,
        $secondaryColor;
   background-size: 50.5% 220%;
   background-position: -100% 0%,0% 0%,100% 0%;
   background-repeat: no-repeat;
   animation: progress-mbj53w $(speed-0.2)s infinite linear;
}

@keyframes progress-mbj53w {
   33% {
      background-position: 0% 33% ,100% 33% ,200% 33%;
   }

   66% {
      background-position: -100%  66%,0%   66% ,100% 66%;
   }

   100% {
      background-position: 0% 100%,100% 100%,200% 100%;
   }
}
</style>`,
    },
    {
        name: 'Hearth',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-10.24)px;
   height: $(size-10.24)px;
   background: linear-gradient($primaryColor 0 0) bottom/100% 0% no-repeat $secondaryColor;
   -webkit-mask: radial-gradient(circle at 60% 65%, #000 62%, #0000 65%) top left,
          radial-gradient(circle at 40% 65%, #000 62%, #0000 65%) top right,
          linear-gradient(to bottom left, #000 42%,#0000 43%) bottom left ,
          linear-gradient(to bottom right,#000 42%,#0000 43%) bottom right;
   -webkit-mask-size: 50% 50%;
   -webkit-mask-repeat: no-repeat;
   animation: progress-ofy9at $(speed-0.2)s infinite linear;
}

@keyframes progress-ofy9at {
   90%, 100% {
      background-size: 100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Hour Glass',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress">
  <div class="top"></div>
  <div class="bottom"></div>
</div>

<style>
.progress {
   height: $(size-12.8)px;
   width: $(size-6.4)px;
   animation: progress-qm7mjxsm $(speed-0.2)s ease infinite;
}

.top,
.bottom {
   background-color: $secondaryColor;
   background-image: linear-gradient($primaryColor, $primaryColor);
   background-size: $(size-6.4)px $(size-6.4)px;
   background-repeat: no-repeat;
   width: $(size-6.4)px;
   height: $(size-6.4)px;
}

.top {
   background-position: 0 0;
   animation: progress-sn28olsm $(speed-0.2)s ease infinite;
   -webkit-clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}

.bottom {
   background-position: 0 $(size-6.4)px;
   animation: progress-jxmr0asm $(speed-0.2)s ease infinite;
   -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.bottom::after {
   content: "";
   position: absolute;
   width: $(size-0.32)px;
   height: $(size-6.4)px;
   left: $(size-3.04)px;
   background-image: linear-gradient($primaryColor, transparent);
}

@keyframes progress-sn28olsm {
   95%, 100% {
      background-position: 0 $(size-6.4)px;
   }
}

@keyframes progress-jxmr0asm {
   95%, 100% {
      background-position: 0 0;
   }
}

@keyframes progress-qm7mjxsm {
   0%, 95% {
      transform: rotate(0deg);
   }

   100% {
      transform: rotate(180deg);
   }
}
</style>`,
    },
    {
        name: 'Circular Hour Glass',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   animation: progress-hfv6gj $(speed-0.4)s infinite;
   position: relative;
}

.progress:after,
.progress:before {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   background-size: 100% 300%;
   border-radius: 100%;
   border: $(size-0.64)px solid $secondaryColor;
   animation: progress-v6dzgy $(speed-0.4)s infinite ease-in-out;
   content: '';
   position: absolute;
   background-image: linear-gradient(0deg, transparent, transparent 50%, $primaryColor 50%, $primaryColor);
}

.progress:after {
   transform: translateY(-$(size-3.2)px);
}

.progress:before {
   animation-delay: -$(speed-0.2)s;
   animation-direction: reverse;
   transform: translateY($(size-3.2)px);
}

@keyframes progress-hfv6gj {
   0%, 40% {
      transform: rotate(-180deg);
   }

   50%, 90% {
      transform: rotate(0deg);
   }

   100% {
      transform: rotate(180deg);
   }
}

@keyframes progress-v6dzgy {
   0%, 10% {
      background-position: 0 90%;
   }

   40%, 60% {
      background-position: 0 10%;
   }

   90%, 100% {
      background-position: 0 -70%;
   }
}
</style>`,
    },
    {
        name: 'Pyramide',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-12.8)px;
   height: calc($(size-12.8)px*0.866);
   clip-path: polygon(50% 0,100% 100%,0 100%);
   color: $primaryColor;
   background: linear-gradient(currentColor 0 0),
        linear-gradient(currentColor 0 0),
        linear-gradient(currentColor 0 0),
        linear-gradient(currentColor 0 0),
        linear-gradient(currentColor 0 0);
   background-size: 100% calc(100%/5 + 1px);
   background-repeat: no-repeat;
   animation: progress-8pcql3 $(speed-0.2)s infinite;
}

@keyframes progress-8pcql3 {
   0% {
      background-position: 0 -50%,0 -50%,0 -50%,0 -50%,0 -50%;
   }

   20% {
      background-position: 0 100%,0 -50%,0 -50%,0 -50%,0 -50%;
   }

   40% {
      background-position: 0 100%,0 75% ,0 -50%,0 -50%,0 -50%;
   }

   60% {
      background-position: 0 100%,0 75% ,0 50% ,0 -50%,0 -50%;
   }

   80% {
      background-position: 0 100%,0 75% ,0 50% ,0 25% ,0 -50%;
   }

   100% {
      background-position: 0 100%,0 75% ,0 50% ,0 25% ,0 0%;
   }
}
</style>`,
    },
    {
        name: 'Pill',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-4.8)px;
   height: $(size-9.6)px;
   animation: progress-sze6ck $(speed-0.2)s infinite backwards;
   background: linear-gradient(0deg, $primaryColor, $primaryColor 50%, transparent 50%, transparent);
   background-size: 100% 200%;
   background-repeat: no-repeat;
   border: $(size-0.96)px solid $secondaryColor;
   border-radius: $(size-2.4)px;
}

@keyframes progress-sze6ck {
   0% {
      background-position: 0 0;
      transform: rotate(0deg);
   }

   25% {
      background-position: 0 100%;
      transform: rotate(0deg);
   }

   50% {
      background-position: 0 100%;
      transform: rotate(180deg);
   }

   75% {
      background-position: 0 200%;
      transform: rotate(180deg);
   }

   100% {
      background-position: 0 200%;
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: '5-Star',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   --s: $(size-3.84)px;
   height: calc(var(--s)*0.9);
   width: calc(var(--s)*5);
   --v1: transparent,#000 0.5deg 108deg,#0000 109deg;
   --v2: transparent,#000 0.5deg  36deg,#0000  37deg;
   -webkit-mask: conic-gradient(from 54deg  at calc(var(--s)*0.68) calc(var(--s)*0.57),var(--v1)),
       conic-gradient(from 90deg  at calc(var(--s)*0.02) calc(var(--s)*0.35),var(--v2)),
       conic-gradient(from 126deg at calc(var(--s)*0.5)  calc(var(--s)*0.7) ,var(--v1)),
       conic-gradient(from 162deg at calc(var(--s)*0.5)  0                  ,var(--v2));
   -webkit-mask-size: var(--s) var(--s);
   -webkit-mask-composite: xor,destination-over;
   mask-composite: exclude,add;
   -webkit-mask-repeat: repeat-x;
   background: linear-gradient($primaryColor 0 0) left/0% 100% $secondaryColor no-repeat;
   animation: p10 $(speed-0.2)s infinite linear;
}

@keyframes p10 {
   90%, 100% {
      background-size: 100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Battery',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   width: $(size-12.8)px;
   height: $(size-6.4)px;
   border: 2px solid $primaryColor;
   border-right-color: transparent;
   padding: $(size-0.48)px;
   background: repeating-linear-gradient(90deg,$primaryColor 0 $(size-1.6)px,#0000 0 $(size-2.4)px) left/0% 100% no-repeat content-box content-box;
   position: relative;
   animation: p5 $(speed-0.2)s infinite steps(6);
}

.progress::before {
   content: "";
   position: absolute;
   top: -2px;
   bottom: -2px;
   left: 100%;
   width: $(size-1.6)px;
   background: linear-gradient(
              #0000   calc(50% - $(size-1.4)px),$primaryColor 0 calc(50% - $(size-1)px),
              #0000 0 calc(50% + $(size-1)px),$primaryColor 0 calc(50% + $(size-1.4)px),#0000 0) left /100% 100%,
          linear-gradient($primaryColor calc(50% - $(size-1)px),#0000        0 calc(50% + $(size-1)px),$primaryColor 0) left /2px 100%,
          linear-gradient(#0000        calc(50% - $(size-1)px),$primaryColor 0 calc(50% + $(size-1)px),#0000        0) right/2px 100%;
   background-repeat: no-repeat;
}

@keyframes p5 {
   100% {
      background-size: 120% 100%;
   }
}
</style>`,
    },
    {
        name: 'Thin Line',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        secondaryColor: '#dbdcef',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   height: $(size-0.64)px;
   width: $(size-20.8)px;
   background: linear-gradient($primaryColor 0 0),
       linear-gradient($primaryColor 0 0),
       $secondaryColor;
   background-size: 60% 100%;
   background-repeat: no-repeat;
   animation: progress-7x9cg2 $(speed-0.3)s infinite;
}

@keyframes progress-7x9cg2 {
   0% {
      background-position: -150% 0,-150% 0;
   }

   66% {
      background-position: 250% 0,-150% 0;
   }

   100% {
      background-position: 250% 0, 250% 0;
   }
}
</style>`,
    },
    {
        name: 'Clock',
        category: 'Progress Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="progress"></div>

<style>
.progress {
   position: relative;
   width: $(size-12.8)px;
   height: $(size-12.8)px;
   border-radius: 50%;
   border: $(size-0.64)px solid $primaryColor;
   box-sizing: content-box;
}

.progress:before {
   content: "";
   position: absolute;
   width: $(size-0.64)px;
   height: $(size-5.44)px;
   top: $(size-1.28)px;
   left: $(size-6.08)px;
   background: $primaryColor;
   border-radius: $(size-0.32)px;
   transform-origin: $(size-0.32)px $(size-5.28)px;
   animation: progress-t59zy9 $(speed-0.2)s linear infinite;
}

.progress:after {
   content: "";
   position: absolute;
   width: $(size-0.64)px;
   height: $(size-3.52)px;
   top: $(size-3.2)px;
   left: $(size-6.08)px;
   background: $primaryColor;
   border-radius: $(size-0.32)px;
   transform-origin: $(size-0.32)px $(size-3.36)px;
   animation: progress-t59zy9  $(speed-1.2)s linear infinite;
}

@keyframes progress-t59zy9 {
   0% {
      tranform: rotate(0deg);
   }

   100% {
      transform: rotate(360deg);
   }
}
</style>`,
    },

    // Dot Loaders

    {
        name: 'Dot - Alt. 1',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-1.92)px;
   background: radial-gradient(circle closest-side,$primaryColor 90%,#0000) 0 0/33% 100% space;
   clip-path: inset(0 100% 0 0);
   animation: dots-e3xtdg $(speed-0.15)s steps(4) infinite;
}

@keyframes dots-e3xtdg {
   to {
      clip-path: inset(0 -34% 0 0);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 2',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-1.92)px;
   background: radial-gradient(circle closest-side,$primaryColor 90%,#0000) 0 0/33% 100% no-repeat;
   animation: dots-9e862z $(speed-0.1)s steps(3) infinite;
}

@keyframes dots-9e862z {
   to {
      background-position: 150% 0;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 3',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-3.84)px;
   background: radial-gradient(circle closest-side,$primaryColor 90%,#0000) 0%   50%,
          radial-gradient(circle closest-side,$primaryColor 90%,#0000) 50%  50%,
          radial-gradient(circle closest-side,$primaryColor 90%,#0000) 100% 50%;
   background-size: calc(100%/3) $(size-1.92)px;
   background-repeat: no-repeat;
   animation: dots-7ar3yq $(speed-0.1)s infinite linear;
}

@keyframes dots-7ar3yq {
   20% {
      background-position: 0%   0%, 50%  50%,100%  50%;
   }

   40% {
      background-position: 0% 100%, 50%   0%,100%  50%;
   }

   60% {
      background-position: 0%  50%, 50% 100%,100%   0%;
   }

   80% {
      background-position: 0%  50%, 50%  50%,100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 4',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-1.92)px;
   background: radial-gradient(circle closest-side at left $(size-0.96)px top 50%,$primaryColor 90%,#0000),
        radial-gradient(circle closest-side, $primaryColor 90%,#0000),
        radial-gradient(circle closest-side at right $(size-0.96)px top 50%,$primaryColor 90%,#0000);
   background-size: 100% 100%;
   background-repeat: no-repeat;
   animation: dots-xm0185sm $(speed-0.1)s infinite alternate;
}

@keyframes dots-xm0185sm {
   to {
      width: $(size-3.2)px;
      height: $(size-3.84)px;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 5',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   background: $primaryColor;
   color: $primaryColor;
   border-radius: 50%;
   box-shadow: $(size-3.2)px 0,-$(size-3.2)px 0;
   animation: dots-u8fzftsm $(speed-0.1)s infinite linear alternate;
}

@keyframes dots-u8fzftsm {
   0% {
      box-shadow: $(size-3.2)px 0,-$(size-3.2)px 0;
      background: ;
   }

   33% {
      box-shadow: $(size-3.2)px 0,-$(size-3.2)px 0 $(primaryColorRgb-0.13);
      background: $(primaryColorRgb-0.13);
   }

   66% {
      box-shadow: $(size-3.2)px 0 $(primaryColorRgb-0.13),-$(size-3.2)px 0;
      background: $(primaryColorRgb-0.13);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 6',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   background: $primaryColor;
   color: $primaryColor;
   border-radius: 50%;
   box-shadow: $(size-1.92)px 0,-$(size-3.84)px 0;
   animation: dots-h5boszsm $(speed-0.05)s infinite linear alternate;
}

@keyframes dots-h5boszsm {
   50% {
      box-shadow: $(size-1.92)px 0,-$(size-1.92)px 0;
   }

   100% {
      box-shadow: $(size-3.84)px 0,-$(size-1.92)px 0;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 7',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-1.92)px;
   background: radial-gradient(circle closest-side,$primaryColor 90%,#0000) 0%   50%,
        radial-gradient(circle closest-side,$primaryColor 90%,#0000) 50%  50%,
        radial-gradient(circle closest-side,$primaryColor 90%,#0000) 100% 50%;
   background-size: calc(100%/3) 100%;
   background-repeat: no-repeat;
   animation: dots-zcf63l $(speed-0.1)s infinite linear;
}

@keyframes dots-zcf63l {
   33% {
      background-size: calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%;
   }

   50% {
      background-size: calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%;
   }

   66% {
      background-size: calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 8',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   position: relative;
}

.dots::before,
.dots::after {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: 50%;
   background: $primaryColor;
}

.dots::before {
   box-shadow: -$(size-3.84)px 0 $primaryColor;
   animation: dots-dm1l1csm $(speed-0.06)s infinite linear;
}

.dots::after {
   transform: rotate(0deg) translateX($(size-3.84)px);
   animation: dots-dh1qq5sm $(speed-0.06)s infinite linear;
}

@keyframes dots-dm1l1csm {
   100% {
      transform: translateX($(size-3.84)px);
   }
}

@keyframes dots-dh1qq5sm {
   100% {
      transform: rotate(-180deg) translateX($(size-3.84)px);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 9',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   position: relative;
   animation: dots-08q38psm $(speed-0.1)s infinite steps(2);
}

.dots::before,
.dots::after {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: 50%;
   background: $primaryColor;
}

.dots::before {
   box-shadow: $(size-3.84)px 0 $primaryColor;
   transform: translateX(-$(size-3.84)px);
   animation: dots-9frz8wsm $(speed-0.05)s infinite linear alternate;
}

.dots::after {
   transform: translateX($(size-1.92)px) rotate(0deg) translateX($(size-1.92)px);
   animation: dots-2fnw0ssm $(speed-0.05)s infinite linear alternate;
}

@keyframes dots-08q38psm {
   0%, 49.9% {
      transform: scale(1);
   }

   50%, 100% {
      transform: scale(-1);
   }
}

@keyframes dots-9frz8wsm {
   100% {
      box-shadow: $(size-7.68)px 0 $primaryColor;
   }
}

@keyframes dots-2fnw0ssm {
   100% {
      transform: translateX(9.6px) rotate(-180deg) translateX($(size-1.92)px);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 10',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   position: relative;
}

.dots::before,
.dots::after {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: 50%;
   background: $primaryColor;
}

.dots::before {
   box-shadow: -$(size-3.84)px 0 $primaryColor;
   animation: dots-ouf7u5sm $(speed-0.12)s infinite linear;
}

.dots::after {
   transform: rotate(0deg) translateX($(size-3.84)px);
   animation: dots-qg1062sm $(speed-0.12)s infinite linear;
}

@keyframes dots-ouf7u5sm {
   50% {
      transform: translateX($(size-3.84)px);
   }
}

@keyframes dots-qg1062sm {
   100% {
      transform: rotate(-360deg) translateX($(size-3.84)px);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 11',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-5.12)px;
   height: $(size-5.12)px;
   --c: radial-gradient(circle closest-side,$primaryColor 90%,#0000);
   background: var(--c) 0    0,
        var(--c) 0    100%,
        var(--c) 100% 100%;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   animation: dots-q2rla8 $(speed-0.1)s infinite linear;
}

@keyframes dots-q2rla8 {
   25% {
      background-position: 100% 0   ,0 100%,100% 100%;
   }

   50% {
      background-position: 100% 0   ,0 0   ,100% 100%;
   }

   75% {
      background-position: 100% 0   ,0 0   ,0    100%;
   }

   100% {
      background-position: 100% 100%,0 0   ,0    100%;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 12',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-4.48)px;
   --c: radial-gradient(farthest-side,$primaryColor 90%,#0000);
   background: var(--c) 0    50%,
        var(--c) 50%  50%,
        var(--c) 50%  50%,
        var(--c) 100% 50%;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   animation: dots-c1z5gf $(speed-0.1)s infinite linear;
}

@keyframes dots-c1z5gf {
   33% {
      background-position: 0   0  ,50% 100%,50%  100%,100% 0;
   }

   66% {
      background-position: 50% 0  ,0   100%,100% 100%,50%  0;
   }

   100% {
      background-position: 50% 50%,0   50% ,100% 50% ,50%  50%;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 13',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-4.48)px;
   background: radial-gradient(farthest-side at bottom,$primaryColor 90%,#0000) 0    calc(50% - $(size-0.48)px),
          radial-gradient(farthest-side at top   ,$primaryColor 90%,#0000) 0    calc(50% + $(size-0.48)px),
          radial-gradient(farthest-side at bottom,$primaryColor 90%,#0000) 50%  calc(50% - $(size-0.48)px),
          radial-gradient(farthest-side at top   ,$primaryColor 90%,#0000) 50%  calc(50% + $(size-0.48)px),
          radial-gradient(farthest-side at bottom,$primaryColor 90%,#0000) 100% calc(50% - $(size-0.48)px),
          radial-gradient(farthest-side at top   ,$primaryColor 90%,#0000) 100% calc(50% + $(size-0.48)px);
   background-size: $(size-1.92)px $(size-0.96)px;
   background-repeat: no-repeat;
   animation: dots-ddn41bsm $(speed-0.1)s infinite linear;
}

@keyframes dots-ddn41bsm {
   16.67% {
      background-position: 0 0,0 100%,50% calc(50% - 2.4px),50% calc(50% + 2.4px),100% calc(50% - 2.4px),100% calc(50% + 2.4px);
   }

   33.33% {
      background-position: 0 0,0 100%,50% 0,50% 100%,100% calc(50% - 2.4px),100% calc(50% + 2.4px);
   }

   50% {
      background-position: 0 0,0 100%,50% 0,50% 100%,100% 0,100% 100%;
   }

   66.67% {
      background-position: 0 calc(50% - 2.4px),0 calc(50% + 2.4px),50% 0,50% 100%,100% 0,100% 100%;
   }

   83.33% {
      background-position: 0 calc(50% - 2.4px),0 calc(50% + 2.4px),50% calc(50% - 2.4px),50% calc(50% + 2.4px),100% 0,100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 14',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-4.48)px;
   background: radial-gradient(farthest-side,$primaryColor 90%,#0000) 0   50%/$(size-1.92)px $(size-1.92)px,
          radial-gradient(farthest-side at bottom,$primaryColor 90%,#0000) 50%  calc(50% - 2.4px)/$(size-1.92)px $(size-0.96)px,
          radial-gradient(farthest-side at top   ,$primaryColor 90%,#0000) 50%  calc(50% + 2.4px)/$(size-1.92)px $(size-0.96)px,
          radial-gradient(farthest-side at bottom,$primaryColor 90%,#0000) 100% calc(50% - 2.4px)/$(size-1.92)px $(size-0.96)px,
          radial-gradient(farthest-side at top   ,$primaryColor 90%,#0000) 100% calc(50% + 2.4px)/$(size-1.92)px $(size-0.96)px;
   background-repeat: no-repeat;
   animation: dots-hw4mnxsm $(speed-0.1)s infinite;
}

@keyframes dots-hw4mnxsm {
   25% {
      background-position: 0    50%,50% 0,50% 100%,100% 0,100% 100%;
   }

   50% {
      background-position: 100% 50%,0   0,0   100%,50%  0,50%  100%;
   }

   75%, 100% {
      background-position: 100% 50%,0 calc(50% - $(size-0.48)px),0 calc(50% + $(size-0.48)px),50% calc(50% - $(size-0.48)px),50% calc(50% + $(size-0.48)px);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 15',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height:  $(size-1.92)px;
   background: radial-gradient(farthest-side,$primaryColor 90%,#0000) left,
        radial-gradient(farthest-side,$primaryColor 90%,#0000) right;
   background-size:  $(size-1.92)px  $(size-1.92)px;
   background-repeat: no-repeat;
   position: relative;
   animation: dots-rn62k3 $(speed-0.1)s infinite linear;
}

.dots::before {
   content: "";
   position: absolute;
   background: $primaryColor;
   border-radius: 50%;
   inset: 0 calc(50% - $(size-0.96)px);
   transform-origin: -$(size-2.08)px 50%;
   animation: dots-f5c0i6 $(speed-0.05)s infinite linear;
}

@keyframes dots-rn62k3 {
   0%, 49.99% {
      transform: scale(1);
   }

   50%, 100% {
      transform: scale(-1);
   }
}

@keyframes dots-f5c0i6 {
   80%, 100% {
      transform: rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 16',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-4.8)px;
   height: $(size-4.42)px;
   --c: radial-gradient(farthest-side,$primaryColor 90%,#0000);
   background: var(--c) 50%  0,
        var(--c) 0    100%,
        var(--c) 100% 100%;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   position: relative;
   animation: dots-p4ro8i $(speed-0.1)s infinite;
}

@keyframes dots-p4ro8i {
   50%, 100% {
      background-position: 100% 100%,50% 0,0 100%;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 17',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   clip-path: inset(-$(size-4)px -$(size-16)px);
   color: $primaryColor;
   box-shadow: $(size-3.04)px -$(size-6.4)px,$(size-6.08)px -$(size-6.4)px,$(size-9.12)px -$(size-6.4)px;
   transform: translateX(-$(size-6.08)px);
   animation: dots-y3c9kssm $(speed-0.1)s infinite;
}

@keyframes dots-y3c9kssm {
   16.67% {
      box-shadow: $(size-3.04)px 0px,$(size-6.08)px -$(size-6.4)px,$(size-9.12)px -$(size-6.4)px;
   }

   33.33% {
      box-shadow: $(size-3.04)px  0px,$(size-6.08)px   0px,$(size-9.12)px -$(size-6.4)px;
   }

   45%, 55% {
      box-shadow: $(size-3.04)px  0px,$(size-6.08)px   0px,$(size-9.12)px   0px;
   }

   66.67% {
      box-shadow: $(size-3.04)px $(size-6.4)px,$(size-6.08)px   0px,$(size-9.12)px   0px;
   }

   83.33% {
      box-shadow: $(size-3.04)px $(size-6.4)px,$(size-6.08)px  $(size-6.4)px,$(size-9.12)px   0px;
   }

   100% {
      box-shadow: $(size-3.04)px $(size-6.4)px,$(size-6.08)px  $(size-6.4)px,$(size-9.12)px  $(size-6.4)px;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 18',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   background: $primaryColor;
   color: $primaryColor;
   box-shadow: -$(size-3.04)px 0px,$(size-3.04)px 0px;
   animation: dots-11iejasm $(speed-0.1)s infinite;
}

@keyframes dots-11iejasm {
   25% {
      box-shadow: -$(size-3.04)px -$(size-3.04)px, $(size-3.04)px $(size-3.04)px;
   }

   50% {
      box-shadow: 0px -$(size-3.04)px,  0px $(size-3.04)px;
   }

   75% {
      box-shadow: $(size-3.04)px -$(size-3.04)px,-$(size-3.04)px $(size-3.04)px;
   }

   100% {
      box-shadow: $(size-3.04)px   0px,-$(size-3.04)px  0px;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 19',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   clip-path: inset(-$(size-7.2)px);
   color: $primaryColor;
   box-shadow: -$(size-9.6)px $(size-2.4)px,-$(size-9.6)px $(size-2.4)px,-$(size-9.6)px $(size-2.4)px;
   transform: translateY(-$(size-2.4)px);
   animation: dots-ejq2atsm $(speed-0.1)s infinite linear;
}

@keyframes dots-ejq2atsm {
   16.67% {
      box-shadow: -$(size-9.6)px $(size-2.4)px,-$(size-9.6)px $(size-2.4)px,$(size-3.04)px $(size-2.4)px;
   }

   33.33% {
      box-shadow: -$(size-9.6)px $(size-2.4)px,  0px $(size-2.4)px,$(size-3.04)px $(size-2.4)px;
   }

   40%, 60% {
      box-shadow: -$(size-3.04)px $(size-2.4)px,  0px $(size-2.4)px,$(size-3.04)px $(size-2.4)px;
   }

   66.67% {
      box-shadow: -$(size-3.04)px $(size-2.4)px,  0px $(size-2.4)px,$(size-9.6)px $(size-2.4)px;
   }

   83.33% {
      box-shadow: -$(size-3.04)px $(size-2.4)px, $(size-9.6)px $(size-2.4)px,$(size-9.6)px $(size-2.4)px;
   }

   100% {
      box-shadow: $(size-9.6)px $(size-2.4)px, $(size-9.6)px $(size-2.4)px,$(size-9.6)px $(size-2.4)px;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 20',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-12.16)px;
   height: $(size-1.92)px;
   display: flex;
}

.dots:before,
.dots:after {
   content: "";
   flex: 1;
   background: radial-gradient(farthest-side         ,$primaryColor 90%,#0000) center/$(size-1.92)px 100%,
        radial-gradient(farthest-side at right,$primaryColor 90%,#0000) right /$(size-0.96)px  100%;
   background-repeat: no-repeat;
   transform: scale(var(--s,1)) translate(0px) rotate(0);
   animation: dots-31zaijsm $(speed-0.2)s infinite;
}

.dots:after {
   --s: -1;
}

@keyframes dots-31zaijsm {
   25% {
      transform: scale(var(--s,1)) translate(-$(size-1.6)px) rotate(0);
   }

   50% {
      transform: scale(var(--s,1)) translate(-$(size-1.6)px) rotate(1turn);
   }

   75%, 100% {
      transform: scale(var(--s,1)) translate(0px)   rotate(1turn);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 21',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-0.64)px;
   height: $(size-0.64)px;
   border-radius: 50%;
   color: $primaryColor;
   box-shadow: $(size-3.04)px 0 0 $(size-1.12)px, $(size-6.08)px 0 0 $(size-0.48)px, $(size-9.12)px 0 0 0;
   transform: translateX(-$(size-6.08)px);
   animation: dots-ijr34dsm $(speed-0.05)s infinite alternate linear;
}

@keyframes dots-ijr34dsm {
   50% {
      box-shadow: $(size-3.04)px 0 0 $(size-0.48)px, $(size-6.08)px 0 0 $(size-1.12)px, $(size-9.12)px 0 0 $(size-0.48)px;
   }

   100% {
      box-shadow: $(size-3.04)px 0 0 0, $(size-6.08)px 0 0 $(size-0.48)px, $(size-9.12)px 0 0 $(size-1.12)px;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 22',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   background: $primaryColor;
   color: $primaryColor;
   box-shadow: 0 0 0 $(size-0.48)px;
   position: relative;
   animation: dots-39rdyvsm $(speed-0.2)s infinite linear;
}

.dots:before,
.dots:after {
   content: "";
   position: absolute;
   border-radius: 50%;
   inset: 0;
   background: $primaryColor;
   transform: rotate(0deg) translate($(size-2.88)px);
   animation: dots-c774cgsm $(speed-0.1)s infinite;
}

.dots:after {
   animation-delay: -$(speed-0.05)s;
}

@keyframes dots-39rdyvsm {
   100% {
      transform: rotate(1turn);
   }
}

@keyframes dots-c774cgsm {
   100% {
      transform: rotate(1turn) translate($(size-3.2)px);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 23',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-4.48)px;
   background: radial-gradient(farthest-side,$primaryColor 90%,#0000) 50%  0,
          radial-gradient(farthest-side,$primaryColor 90%,#0000) 100% 0;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   position: relative;
   animation: dots-pr30iysm $(speed-0.15)s linear infinite;
}

.dots:before {
   content: "";
   position: absolute;
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   background: $primaryColor;
   left: 0;
   top: 0;
   animation: dots-q6bpf4sm $(speed-0.15)s linear infinite,
          dots-b39z9ism $(speed-0.05)s cubic-bezier(0,200,.8,200) infinite;
}

@keyframes dots-pr30iysm {
   0%, 31% {
      background-position: 50% 0   ,100% 0;
   }

   33% {
      background-position: 50% 100%,100% 0;
   }

   43%, 64% {
      background-position: 50% 0   ,100% 0;
   }

   66% {
      background-position: 50% 0   ,100% 100%;
   }

   79% {
      background-position: 50% 0   ,100% 0;
   }

   100% {
      transform: translateX(calc(-100%/3));
   }
}

@keyframes dots-q6bpf4sm {
   100% {
      left: calc(100% + $(size-1.12)px);
   }
}

@keyframes dots-b39z9ism {
   100% {
      top: -$(size-0.024)px;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 24',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-14.08)px;
   height: $(size-1.92)px;
   background: radial-gradient(farthest-side,$primaryColor 90%,#0000) 25% 0,
          radial-gradient(farthest-side,$primaryColor 90%,#0000) 75% 0;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   position: relative;
   animation: dots-q4kofwsm $(speed-0.1)s linear infinite;
}

.dots:before {
   content: "";
   position: absolute;
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   background: $primaryColor;
   inset: 0;
   margin: auto;
   animation: dots-svj0l9sm $(speed-0.1)s cubic-bezier(0.5,300,0.5,-300) infinite;
}

@keyframes dots-q4kofwsm {
   0%, 24% {
      background-position: 25% 0,75% 0;
   }

   40% {
      background-position: 25% 0,85% 0;
   }

   50%, 72% {
      background-position: 25% 0,75% 0;
   }

   90% {
      background-position: 15% 0,75% 0;
   }

   100% {
      background-position: 25% 0,75% 0;
   }
}

@keyframes dots-svj0l9sm {
   100% {
      transform: translate($(size-0.016)px);
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 25',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-1.92)px;
   background: radial-gradient(farthest-side,$primaryColor 90%,#0000) left,
          radial-gradient(farthest-side,$primaryColor 90%,#0000) right;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   position: relative;
}

.dots:before {
   content: "";
   position: absolute;
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   background: $primaryColor;
   inset: 0;
   margin: auto;
   animation: dots-1b2bw7sm $(speed-0.1)s, dots-bw5o92sm $(speed-0.05)s;
   animation-timing-function: cubic-bezier(.5,-900,.5,900);
   animation-iteration-count: infinite;
}

@keyframes dots-1b2bw7sm {
   100% {
      transform: translate($(size-0.02)px);
   }
}

@keyframes dots-bw5o92sm {
   100% {
      inset: -$(size-0.024)px 0 0;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 26',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-0.64)px;
   height: $(size-0.64)px;
   border-radius: 50%;
   color: $primaryColor;
   box-shadow: $(size-3.04)px -$(size-3.04)px 0 0px, $(size-6.08)px -$(size-3.04)px 0 0px, $(size-9.12)px -$(size-3.04)px 0 0px,
          $(size-3.04)px 0     0 $(size-0.8)px, $(size-6.08)px 0     0 $(size-0.8)px, $(size-9.12)px 0     0 $(size-0.8)px,
          $(size-3.04)px $(size-3.04)px  0 0px, $(size-6.08)px $(size-3.04)px  0 0px, $(size-9.12)px $(size-3.04)px  0 0px;
   transform: translateX(-$(size-6.08)px);
   animation: dots-i2eob1sm $(speed-0.2)s infinite linear;
}

@keyframes dots-i2eob1sm {
   12.5% {
      box-shadow: $(size-3.04)px -$(size-3.04)px 0 0px, $(size-6.08)px -$(size-3.04)px 0 0px, $(size-9.12)px -$(size-3.04)px 0 $(size-0.8)px,
          $(size-3.04)px 0     0 $(size-0.8)px, $(size-6.08)px 0     0 0px, $(size-9.12)px 0     0 $(size-0.8)px,
          $(size-3.04)px $(size-3.04)px  0 0px, $(size-6.08)px $(size-3.04)px  0 0px, $(size-9.12)px $(size-3.04)px  0 0px;
   }

   25% {
      box-shadow: $(size-3.04)px -$(size-3.04)px 0 $(size-0.8)px, $(size-6.08)px -$(size-3.04)px 0 0px, $(size-9.12)px -$(size-3.04)px 0 $(size-0.8)px,
          $(size-3.04)px 0     0 0px, $(size-6.08)px 0     0 0px, $(size-9.12)px 0     0 0px,
          $(size-3.04)px $(size-3.04)px  0 0px, $(size-6.08)px $(size-3.04)px  0 $(size-0.8)px, $(size-9.12)px $(size-3.04)px  0 0px;
   }

   50% {
      box-shadow: $(size-3.04)px -$(size-3.04)px 0 $(size-0.8)px, $(size-6.08)px -$(size-3.04)px 0 $(size-0.8)px, $(size-9.12)px -$(size-3.04)px 0 0px,
          $(size-3.04)px 0     0 0px, $(size-6.08)px 0     0 0px, $(size-9.12)px 0     0 0px,
          $(size-3.04)px $(size-3.04)px  0 0px, $(size-6.08)px $(size-3.04)px  0 0px, $(size-9.12)px $(size-3.04)px  0 $(size-0.8)px;
   }

   62.5% {
      box-shadow: $(size-3.04)px -$(size-3.04)px 0 0px, $(size-6.08)px -$(size-3.04)px 0 0px, $(size-9.12)px -$(size-3.04)px 0 0px,
          $(size-3.04)px 0     0 $(size-0.8)px, $(size-6.08)px 0     0 0px, $(size-9.12)px 0     0 0px,
          $(size-3.04)px $(size-3.04)px  0 0px, $(size-6.08)px $(size-3.04)px  0 $(size-0.8)px, $(size-9.12)px $(size-3.04)px  0 $(size-0.8)px;
   }

   75% {
      box-shadow: $(size-3.04)px -$(size-3.04)px 0 0px, $(size-6.08)px -$(size-3.04)px 0 $(size-0.8)px, $(size-9.12)px -$(size-3.04)px 0 0px,
          $(size-3.04)px 0     0 0px, $(size-6.08)px 0     0 0px, $(size-9.12)px 0     0 $(size-0.8)px,
          $(size-3.04)px $(size-3.04)px  0 0px, $(size-6.08)px $(size-3.04)px  0 0px, $(size-9.12)px $(size-3.04)px  0 $(size-0.8)px;
   }

   87.5% {
      box-shadow: $(size-3.04)px -$(size-3.04)px 0 0px, $(size-6.08)px -$(size-3.04)px 0 $(size-0.8)px, $(size-9.12)px -$(size-3.04)px 0 0px,
          $(size-3.04)px 0     0 0px, $(size-6.08)px 0     0 $(size-0.8)px, $(size-9.12)px 0     0 0px,
          $(size-3.04)px $(size-3.04)px  0 $(size-0.8)px, $(size-6.08)px $(size-3.04)px  0 0px, $(size-9.12)px $(size-3.04)px  0 0px;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 27',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-8)px;
   height: $(size-1.92)px;
   background: radial-gradient(farthest-side,$primaryColor 90%,#0000) left,
          radial-gradient(farthest-side,$primaryColor 90%,#0000) right;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   position: relative;
}

.dots:before,
.dots:after {
   content: "";
   position: absolute;
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   background: $primaryColor;
   clip-path: inset(0 0 50%);
   inset: 0;
   margin: auto;
   transform-origin: -$(size-2.08)px 50%;
   animation: dots-fry59f $(speed-0.05)s infinite alternate;
}

.dots:after {
   --s: -1;
   transform-origin: calc(100% + $(size-2.08)px) 50%;
}

@keyframes dots-fry59f {
   0%, 40% {
      transform: scaleY(var(--s,1)) rotate(0);
   }

   100% {
      transform: scaleY(var(--s,1)) rotate(calc(var(--s,1)*-90deg));
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 28',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-1.92)px;
   height: $(size-1.92)px;
   border-radius: 50%;
   background: $primaryColor;
   color: $primaryColor;
   clip-path: inset(-$(size-4.16)px);
   animation: dots-izls0vsm $(speed-0.2)s infinite linear;
}

@keyframes dots-izls0vsm {
   0% {
      box-shadow: 0 0 0 0, $(size-6.4)px 0,-$(size-6.4)px 0,0 $(size-6.4)px,0 -$(size-6.4)px;
   }

   10% {
      box-shadow: 0 0 0 0, $(size-1.92)px 0,-$(size-6.4)px 0,0 $(size-6.4)px,0 -$(size-6.4)px;
   }

   20% {
      box-shadow: 0 0 0 $(size-0.64)px, 0 0,-$(size-6.4)px 0,0 $(size-6.4)px,0 -$(size-6.4)px;
   }

   30% {
      box-shadow: 0 0 0 $(size-0.64)px, 0 0,-$(size-1.92)px 0,0 $(size-6.4)px,0 -$(size-6.4)px;
   }

   40% {
      box-shadow: 0 0 0 $(size-1.28)px, 0 0, 0 0,0 $(size-6.4)px,0 -$(size-6.4)px;
   }

   50% {
      box-shadow: 0 0 0 $(size-1.28)px, 0 0, 0 0,0 $(size-1.92)px,0 -$(size-6.4)px;
   }

   60% {
      box-shadow: 0 0 0 $(size-1.92)px, 0 0, 0 0,0 0,0 -$(size-6.4)px;
   }

   70% {
      box-shadow: 0 0 0 $(size-1.92)px, 0 0, 0 0,0 0,0 -$(size-1.92)px;
   }

   80% {
      box-shadow: 0 0 0 $(size-2.56)px, 0 0, 0 0,0 0,0 0;
   }

   90%, 100% {
      box-shadow: 0 0 0 0, $(size-6.4)px 0,-$(size-6.4)px 0,0 $(size-6.4)px,0 -$(size-6.4)px;
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 29',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-4.96)px;
   height: $(size-4.96)px;
   display: flex;
   justify-content: space-between;
   animation: dots-2t435osm $(speed-0.1)s infinite;
}

.dots::before,
.dots::after {
   content: "";
   width: $(size-1.92)px;
   background: radial-gradient(farthest-side,$primaryColor 90%,#0000) top,
          radial-gradient(farthest-side,$primaryColor 90%,#0000) bottom;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   transform-origin: 50% calc(100% - $(size-0.96)px);
   animation: inherit;
   animation-name: dots-aw28xnsm;
}

.dots::after {
   --s: -1;
}

@keyframes dots-2t435osm {
   100% {
      transform: translateY(calc($(size-1.92)px - 100%));
   }
}

@keyframes dots-aw28xnsm {
   100% {
      transform: rotate(calc(var(--s,1)*-180deg));
   }
}
</style>`,
    },
    {
        name: 'Dot - Alt. 30',
        category: 'Dot Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="dots"></div>

<style>
.dots {
   width: $(size-4.96)px;
   height: $(size-4.96)px;
   display: flex;
   justify-content: space-between;
}

.dots::before,
.dots::after {
   content: "";
   width: $(size-1.92)px;
   background: radial-gradient(farthest-side,$primaryColor 90%,#0000) top,
          radial-gradient(farthest-side,$primaryColor 90%,#0000) bottom;
   background-size: $(size-1.92)px $(size-1.92)px;
   background-repeat: no-repeat;
   transform-origin: 50% calc(100% - $(size-0.96)px);
   animation: dots-wila4g $(speed-0.1)s infinite;
}

.dots::after {
   transform-origin: 50% $(size-0.96)px;
}

@keyframes dots-wila4g {
   70%, 100% {
      transform: rotate(-270deg);
   }
}
</style>`,
    },

    // Bar Loaders

    {
        name: 'Bar - Alt. 1',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-6.4)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c) 0%   50%,
          var(--c) 50%  50%,
          var(--c) 100% 50%;
   background-size: $(size-1.44)px 100%;
   background-repeat: no-repeat;
   animation: bars-t0lx83sm $(speed-0.1)s infinite linear;
}

@keyframes bars-t0lx83sm {
   33% {
      background-size: $(size-1.44)px 10% ,$(size-1.44)px 100%,$(size-1.44)px 100%;
   }

   50% {
      background-size: $(size-1.44)px 100%,$(size-1.44)px 10% ,$(size-1.44)px 100%;
   }

   66% {
      background-size: $(size-1.44)px 100%,$(size-1.44)px 100%,$(size-1.44)px 10%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 2',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-6.4)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c) 0% 100%, var(--c) 50% 100%, var(--c) 100% 100%;
   background-size: $(size-1.44)px 100%;
   background-repeat: no-repeat;
   animation: bars-mbi2jdsm $(speed-0.1)s infinite linear;
}

@keyframes bars-mbi2jdsm {
   20% {
      background-size: $(size-1.44)px 60%, $(size-1.44)px 100%, $(size-1.44)px 100%;
   }

   40% {
      background-size: $(size-1.44)px 80%, $(size-1.44)px 60%, $(size-1.44)px 100%;
   }

   60% {
      background-size: $(size-1.44)px 100%, $(size-1.44)px 80%, $(size-1.44)px 60%;
   }

   80% {
      background-size: $(size-1.44)px 100%, $(size-1.44)px 100%, $(size-1.44)px 80%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 3',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-6.4)px;
   background: linear-gradient(#0000 calc(1*100%/6),$primaryColor 0 calc(3*100%/6),#0000 0) left bottom,
        linear-gradient(#0000 calc(2*100%/6),$primaryColor 0 calc(4*100%/6),#0000 0) center bottom,
        linear-gradient(#0000 calc(3*100%/6),$primaryColor 0 calc(5*100%/6),#0000 0) right bottom;
   background-size: $(size-1.44)px 600%;
   background-repeat: no-repeat;
   animation: bars-j7enxv $(speed-0.1)s infinite linear;
}

@keyframes bars-j7enxv {
   100% {
      background-position: left top,center top,right top;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 4',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-6.4)px;
   --c: linear-gradient($primaryColor calc(50% - $(size-1.6)px),#0000 0 calc(50% + $(size-1.6)px),$primaryColor  0);
   background: var(--c) 0%   100%,
        var(--c) 50%  100%,
        var(--c) 100% 100%;
   background-size: $(size-1.44)px calc(200% + $(size-3.2)px);
   background-repeat: no-repeat;
   animation: bars-th2joa $(speed-0.1)s infinite linear;
}

@keyframes bars-th2joa {
   33% {
      background-position: 0% 50%,50% 100%,100% 100%;
   }

   50% {
      background-position: 0%  0%,50%  50%,100% 100%;
   }

   66% {
      background-position: 0%  0%,50%   0%,100%  50%;
   }

   100% {
      background-position: 0%  0%,50%   0%,100%   0%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 5',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-9.6)px;
   --c: linear-gradient($primaryColor  0 0);
   background: var(--c) 0%   100%,
        var(--c) 50%  100%,
        var(--c) 100% 100%;
   background-size: $(size-1.44)px 65%;
   background-repeat: no-repeat;
   animation: bars-1hcj36 $(speed-0.1)s infinite linear;
}

@keyframes bars-1hcj36 {
   20% {
      background-position: 0% 50% ,50% 100%,100% 100%;
   }

   40% {
      background-position: 0% 0%  ,50% 50% ,100% 100%;
   }

   60% {
      background-position: 0% 100%,50% 0%  ,100% 50%;
   }

   80% {
      background-position: 0% 100%,50% 100%,100% 0%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 6',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-9.6)px;
   --c: linear-gradient($primaryColor  0 0);
   background: var(--c) 0%   50%,
        var(--c) 50%  50%,
        var(--c) 100% 50%;
   background-size: $(size-1.44)px 50%;
   background-repeat: no-repeat;
   animation: bars-wk19tf $(speed-0.1)s infinite linear;
}

@keyframes bars-wk19tf {
   20% {
      background-position: 0% 0%  ,50% 50% ,100% 50%;
   }

   40% {
      background-position: 0% 100%,50% 0%  ,100% 50%;
   }

   60% {
      background-position: 0% 50% ,50% 100%,100% 0%;
   }

   80% {
      background-position: 0% 50% ,50% 50% ,100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 7',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-9.6)px;
   --c: linear-gradient($primaryColor  0 0);
   background: var(--c) 0%   50%,
          var(--c) 50%  50%,
          var(--c) 100% 50%;
   background-size: $(size-1.44)px 50%;
   background-repeat: no-repeat;
   animation: bars-7s9ul0sm $(speed-0.1)s infinite linear alternate;
}

@keyframes bars-7s9ul0sm {
   20% {
      background-size: $(size-1.44)px 20% ,$(size-1.44)px 50% ,$(size-1.44)px 50%;
   }

   40% {
      background-size: $(size-1.44)px 100%,$(size-1.44)px 20% ,$(size-1.44)px 50%;
   }

   60% {
      background-size: $(size-1.44)px 50% ,$(size-1.44)px 100%,$(size-1.44)px 20%;
   }

   80% {
      background-size: $(size-1.44)px 50% ,$(size-1.44)px 50% ,$(size-1.44)px 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 8',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-9.6)px;
   --c: linear-gradient($primaryColor  0 0);
   background: var(--c) 0%   100%,
        var(--c) 50%  100%,
        var(--c) 100% 100%;
   background-size: $(size-1.44)px 65%;
   background-repeat: no-repeat;
   animation: bars-2i3cc6 $(speed-0.1)s infinite linear;
}

@keyframes bars-2i3cc6 {
   16.67% {
      background-position: 0% 0%  ,50% 100%,100% 100%;
   }

   33.33% {
      background-position: 0% 0%  ,50% 0%  ,100% 100%;
   }

   50% {
      background-position: 0% 0%  ,50% 0%  ,100% 0%;
   }

   66.67% {
      background-position: 0% 100%,50% 0%  ,100% 0%;
   }

   83.33% {
      background-position: 0% 100%,50% 100%,100% 0%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 9',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-9.6)px;
   --c: linear-gradient($primaryColor  0 0);
   background: var(--c) 0%   50%,
        var(--c) 50%  50%,
        var(--c) 100% 50%;
   background-size: $(size-1.44)px 60%;
   background-repeat: no-repeat;
   animation: bars-piz1q0 $(speed-0.1)s infinite;
}

@keyframes bars-piz1q0 {
   33% {
      background-position: 0% 0%  ,50% 100%,100% 0%;
   }

   66% {
      background-position: 0% 100%,50% 0%  ,100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 10',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-8.64)px;
   height: $(size-7.2)px;
   --c: repeating-linear-gradient(90deg,$primaryColor  0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c) 50% 0,
          var(--c) 50% 100%;
   background-size: $(size-7.2)px 50%;
   background-repeat: no-repeat;
   animation: bars-obuq80 $(speed-0.1)s infinite linear;
}

@keyframes bars-obuq80 {
   33% {
      background-position: 0 0, 100% 100%;
   }

   66% {
      background-position: 0 100%, 100% 0;
   }

   100% {
      background-position: 50% 100%,50% 0;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 11',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c) 0    0,
          var(--c) 0    100%,
          var(--c) 50%  0,
          var(--c) 50%  100%,
          var(--c) 100% 0,
          var(--c) 100% 100%;
   background-size: $(size-1.44)px 50%;
   background-repeat: no-repeat;
   animation: bars-v74j9vsm $(speed-0.1)s infinite linear;
}

@keyframes bars-v74j9vsm {
   80% {
      background-size: $(size-1.44)px 30%;
   }

   90% {
      background-size: $(size-1.44)px 50%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 12',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c) 0    0,
          var(--c) 0    100%,
          var(--c) 50%  0,
          var(--c) 50%  100%,
          var(--c) 100% 0,
          var(--c) 100% 100%;
   background-size: $(size-1.44)px 50%;
   background-repeat: no-repeat;
   animation: bars-p0cx9nsm $(speed-0.1)s infinite;
}

@keyframes bars-p0cx9nsm {
   16.67% {
      background-size: $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 50%, $(size-1.44)px 50%, $(size-1.44)px 50%, $(size-1.44)px 50%;
   }

   33.33% {
      background-size: $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 50%, $(size-1.44)px 50%;
   }

   50% {
      background-size: $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 30%;
   }

   66.67% {
      background-size: $(size-1.44)px 50%, $(size-1.44)px 50%, $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 30%, $(size-1.44)px 30%;
   }

   83.33% {
      background-size: $(size-1.44)px 50%, $(size-1.44)px 50%, $(size-1.44)px 50%, $(size-1.44)px 50%, $(size-1.44)px 30%, $(size-1.44)px 30%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 13',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c) 0    0,
          var(--c) 0    100%,
          var(--c) 50%  50%,
          var(--c) 100% 0,
          var(--c) 100% 100%;
   background-repeat: no-repeat;
   animation: bars-z5aonysm $(speed-0.1)s infinite alternate;
}

@keyframes bars-z5aonysm {
   0%, 10% {
      background-size: $(size-1.44)px 100%;
   }

   50% {
      background-size: $(size-1.44)px  $(size-1.44)px;
   }

   90%, 100% {
      background-size: 100% $(size-1.44)px;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 14',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c);
   background-repeat: no-repeat;
   animation: bars-2694zpsm $(speed-0.05)s infinite alternate,
          bars-dvsnr1sm $(speed-0.2)s infinite;
}

@keyframes bars-2694zpsm {
   0%, 10% {
      background-size: $(size-1.44)px 100%;
   }

   100% {
      background-size: $(size-1.44)px $(size-1.44)px;
   }
}

@keyframes bars-dvsnr1sm {
   0%, 49.9% {
      background-position: 0 0, 0 100%, 50% 50%, 50% 50%, 100% 0, 100% 100%;
   }

   50%, 100% {
      background-position: 0 50%, 0 50%, 50% 0, 50% 100%, 100% 50%, 100% 50%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 15',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c), var(--c), var(--c);
   background-repeat: no-repeat;
   animation: bars-sjt6e1sm $(speed-0.1)s infinite,
        bars-8iehagsm $(speed-0.1)s infinite;
}

@keyframes bars-sjt6e1sm {
   0%, 100% {
      background-size: $(size-1.44)px 100%;
   }

   33%, 66% {
      background-size: $(size-1.44)px 40%;
   }
}

@keyframes bars-8iehagsm {
   0%, 33% {
      background-position: 0    0,50% 100%,100% 100%;
   }

   66%, 100% {
      background-position: 100% 0,0   100%,50%  100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 16',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c), var(--c), var(--c);
   background-repeat: no-repeat;
   animation: bars-gm67spsm $(speed-0.1)s infinite,
        bars-lof3c3sm $(speed-0.1)s infinite;
}

@keyframes bars-gm67spsm {
   0%, 100% {
      background-size: $(size-1.44)px 100%;
   }

   33%, 66% {
      background-size: $(size-1.44)px 40%;
   }
}

@keyframes bars-lof3c3sm {
   0%, 33% {
      background-position: 0 0   ,50% 100%,100% 0;
   }

   66%, 100% {
      background-position: 0 100%,50% 0   ,100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 17',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c) 0    0,
          var(--c) 50%  50%,
          var(--c) 100% 100%;
   background-repeat: no-repeat;
   animation: bars-ed8ugksm $(speed-0.1)s infinite alternate;
}

@keyframes bars-ed8ugksm {
   0%, 10% {
      background-size: $(size-1.44)px  100%;
   }

   50% {
      background-size: $(size-1.44)px  $(size-1.44)px;
   }

   90%, 100% {
      background-size: 100% $(size-1.44)px;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 18',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: linear-gradient($primaryColor 0 0);
   background: var(--c), var(--c), var(--c);
   background-repeat: no-repeat;
   animation: bars-4tzcsosm $(speed-0.1)s infinite,
          bars-d0g8gh $(speed-0.1)s infinite;
}

@keyframes bars-4tzcsosm {
   0%, 100% {
      background-size: $(size-1.44)px 100%;
   }

   33%, 66% {
      background-size: $(size-1.44)px $(size-1.44)px;
   }
}

@keyframes bars-d0g8gh {
   0%, 33% {
      background-position: 0    0,50% 50%,100% 100%;
   }

   66%, 100% {
      background-position: 100% 0,50% 50%,0    100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 19',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: conic-gradient(from -90deg,$primaryColor 90deg,#0000 0);
   background: var(--c), var(--c);
   background-size: $(size-2.88)px $(size-2.88)px;
   animation: bars-4zy12xsm $(speed-0.1)s infinite alternate;
}

@keyframes bars-4zy12xsm {
   0%, 10% {
      background-position: 0 0, 0 $(size-1.44)px;
   }

   50% {
      background-position: 0 0, $(size-1.44)px $(size-1.44)px;
   }

   90%, 100% {
      background-position: 0 0, $(size-1.44)px 0;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 20',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: conic-gradient(from -90deg,$primaryColor 90deg,#0000 0);
   background: var(--c), var(--c);
   background-size: $(size-2.88)px $(size-2.88)px;
   animation: bars-dxe116sm $(speed-0.15)s infinite;
}

@keyframes bars-dxe116sm {
   0%, 20% {
      background-position: 0 0, 0 $(size-1.44)px;
   }

   33% {
      background-position: 0 0, $(size-1.44)px $(size-1.44)px;
   }

   66% {
      background-position: 0 $(size-1.44)px, $(size-1.44)px 0;
   }

   80%, 100% {
      background-position: 0 $(size-1.44)px, 0 0;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 21',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: repeating-linear-gradient(90deg,$primaryColor 0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c),
          var(--c),
          var(--c),
          var(--c);
   background-size: 100% 26%;
   background-repeat: no-repeat;
   animation: bars-o4373fsm $(speed-0.15)s infinite;
}

@keyframes bars-o4373fsm {
   0% {
      background-position: -$(size-8)px 0%,-$(size-8)px 33.33%,-$(size-8)px 66.66%,-$(size-8)px 100%;
   }

   12.5% {
      background-position: 0 0%,-$(size-8)px 33.33%,-$(size-8)px 66.66%,-$(size-8)px 100%;
   }

   25% {
      background-position: 0 0%,0 33.33%,-$(size-8)px 66.66%,-$(size-8)px 100%;
   }

   37.5% {
      background-position: 0 0%,0 33.33%,0 66.66%,-$(size-8)px 100%;
   }

   45%, 55% {
      background-position: 0 0%,0 33.33%,0 66.66%,0 100%;
   }

   62.5% {
      background-position: $(size-8)px  0%,0 33.33%,0 66.66%,0 100%;
   }

   75% {
      background-position: $(size-8)px  0%,$(size-8)px  33.33%,0 66.66%,0 100%;
   }

   87.5% {
      background-position: $(size-8)px  0%,$(size-8)px  33.33%,$(size-8)px  66.66%,0 100%;
   }

   100% {
      background-position: $(size-8)px  0%,$(size-8)px  33.33%,$(size-8)px  66.66%,$(size-8)px  100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 22',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   --c: repeating-linear-gradient(90deg,$primaryColor 0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c),
          var(--c),
          var(--c),
          var(--c);
   background-size: 100% 26%;
   background-repeat: no-repeat;
   animation: bars-8vq416sm $(speed-0.15)s infinite;
}

@keyframes bars-8vq416sm {
   0% {
      background-position: 0 -$(size-3.2)px,0 -$(size-3.2)px,0 -$(size-3.2)px,0 -$(size-3.2)px;
   }

   12.5% {
      background-position: 0 -$(size-3.2)px,0 -$(size-3.2)px,0 -$(size-3.2)px,0 100%;
   }

   25% {
      background-position: 0 -$(size-3.2)px,0 -$(size-3.2)px,0 66.66%,0 100%;
   }

   37.5% {
      background-position: 0 -$(size-3.2)px,0 33.33%,0 66.66%,0 100%;
   }

   45%, 50% {
      background-position: 0 0%,0 33.33%,0 66.66%,0 100%;
   }

   62.5% {
      background-position: 0 0%,0 33.33%,0 66.66%,0 $(size-8)px;
   }

   75% {
      background-position: 0 0%,0 33.33%,0 $(size-8)px,0 $(size-8)px;
   }

   87.5% {
      background-position: 0 0%,0 $(size-8)px,0 $(size-8)px,0 $(size-8)px;
   }

   100% {
      background-position: 0 $(size-8)px,0 $(size-8)px,0 $(size-8)px,0 $(size-8)px;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 23',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-11.52)px;
   height: $(size-7.2)px;
   --c: repeating-linear-gradient(90deg,$primaryColor 0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c),
          var(--c),
          var(--c),
          var(--c);
   background-size: $(size-7.2)px 26%;
   background-repeat: no-repeat;
   animation: bars-ye52zasm $(speed-0.1)s infinite;
}

@keyframes bars-ye52zasm {
   0%, 10% {
      background-position: 50%  0%,50% 33.33%,50% 66.66%,50%  100%;
   }

   33% {
      background-position: 100% 0%,calc(100% - $(size-1.44)px) 33.33%,$(size-1.44)px 66.66%,0 100%;
   }

   66% {
      background-position: 0 0%,$(size-1.44)px 33.33%,calc(100% - $(size-1.44)px) 66.66%,100% 100%;
   }

   90%, 100% {
      background-position: 50% 0%,50% 33.33%,50% 66.66%,50%  100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 24',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-8.64)px;
   --c: repeating-linear-gradient(90deg,$primaryColor 0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c),
          var(--c),
          var(--c),
          var(--c);
   background-size: 100% 21%;
   background-repeat: no-repeat;
   animation: bars-yrfh98 $(speed-0.075)s infinite alternate;
}

@keyframes bars-yrfh98 {
   0%, 10% {
      background-position: 0 0,0 25%,0 50%,0 75%;
   }

   25% {
      background-position: 0 0,0 25%,0 50%,0 100%;
   }

   50% {
      background-position: 0 0,0 25%,0 75%,0 100%;
   }

   75% {
      background-position: 0 0,0 50%,0 75%,0 100%;
   }

   90%, 100% {
      background-position: 0 25%,0 50%,0 75%,0 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 25',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   color: $primaryColor;
   --c: repeating-linear-gradient(90deg,currentColor 0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c),
          var(--c),
          var(--c),
          var(--c);
   background-size: calc(100% + $(size-2.88)px) 26%;
   background-repeat: no-repeat;
   animation: bars-4mmb9b $(speed-0.075)s infinite;
}

@keyframes bars-4mmb9b {
   0% {
      background-position: 0 0, 100% 33.33%, 0 66.66%,100% 100%;
   }

   25% {
      background-position: 100% 0,100% 33.33%,0 66.66%,100% 100%;
   }

   50% {
      background-position: 100% 0,0 33.33%,0 66.66%,100% 100%;
   }

   75% {
      background-position: 100% 0,0 33.33%,100% 66.66%,100% 100%;
   }

   100% {
      background-position: 100% 0,0 33.33%,100% 66.66%,0 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 26',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   color: $primaryColor;
   --c: repeating-linear-gradient(90deg,currentColor 0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c),
          var(--c),
          var(--c),
          var(--c);
   background-size: calc(100% + $(size-2.88)px) 26%;
   background-repeat: no-repeat;
   animation: bars-ry11kw $(speed-0.075)s infinite linear;
}

@keyframes bars-ry11kw {
   0%, 5% {
      background-position: 0 0,0 33.33%,0 66.66%,0 100%;
   }

   20% {
      background-position: 50% 0,0 33.33%,0 66.66%,0 100%;
   }

   40% {
      background-position: 100% 0,50% 33.33%,0 66.66%,0 100%;
   }

   60% {
      background-position: 100% 0,100% 33.33%,50%  66.66%,0 100%;
   }

   80% {
      background-position: 100% 0,100% 33.33%,100% 66.66%,50% 100%;
   }

   95%, 100% {
      background-position: 100% 0,100% 33.33%,100% 66.66%,100% 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 27',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-7.2)px;
   height: $(size-7.2)px;
   color: $primaryColor;
   --c: repeating-linear-gradient(90deg,currentColor 0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c),
          var(--c),
          var(--c),
          var(--c);
   background-size: calc(100% + $(size-2.88)px) 26%;
   background-repeat: no-repeat;
   animation: bars-38i31v $(speed-0.075)s infinite linear;
}

@keyframes bars-38i31v {
   0%, 20% {
      background-position: 0 0,100% 33.33%,0 66.66%,100% 100%;
   }

   80%, 100% {
      background-position: 100% 0,0 33.33%,100% 66.66%,0 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 28',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-10.08)px;
   height: $(size-7.2)px;
   color: $primaryColor;
   --c: repeating-linear-gradient(90deg,currentColor 0 $(size-1.44)px,#0000 0 $(size-2.88)px);
   background: var(--c),
          var(--c),
          var(--c),
          var(--c);
   background-size: $(size-7.2)px 26%;
   background-repeat: no-repeat;
   animation: bars-j2wcu5 $(speed-0.1)s infinite;
}

@keyframes bars-j2wcu5 {
   0%, 20% {
      background-position: 50% 0%,50% 33.33%,50% 66.66%,50% 100%;
   }

   40% {
      background-position: 50% 0%,100% 33.33%,0% 66.66%,50% 100%;
   }

   60% {
      background-position: 50% 0%,0% 33.33%,100% 66.66%,50% 100%;
   }

   80%, 100% {
      background-position: 50% 0%,50% 33.33%,50% 66.66%,50% 100%;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 29',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-1.44)px;
   height: $(size-1.44)px;
   background: $primaryColor;
   color: $primaryColor;
   box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
          -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
          -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
          -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   animation: bars-s9errfsm $(speed-0.2)s infinite;
}

@keyframes bars-s9errfsm {
   10% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px #0000,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px #0000,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   20% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px #0000,
           -$(size-2.88)px $(size-2.88)px #0000,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   30% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px #0000,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0   #0000,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px #0000,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px #0000,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px #0000;
   }

   40% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  #0000,       $(size-2.88)px  0 #0000,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   50% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  #0000,
           -$(size-2.88)px  $(size-1.44)px #0000,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   60% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px #0000,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px #0000,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px #0000,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   70% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px #0000,$(size-2.88)px -$(size-1.44)px #0000,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px #0000,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   80% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px #0000,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px #0000;
   }

   90% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px #0000,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px #0000,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px #0000;
   }
}
</style>`,
    },
    {
        name: 'Bar - Alt. 30',
        category: 'Bar Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="bars"></div>

<style>
.bars {
   width: $(size-1.44)px;
   height: $(size-1.44)px;
   background: $primaryColor;
   color: $primaryColor;
   box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
          -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
          -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
          -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   animation: bars-5175udsm $(speed-0.1)s infinite;
}

@keyframes bars-5175udsm {
   10% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px 0 $(size-0.32)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px 0 $(size-0.32)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   20% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px 0 $(size-0.32)px,
           -$(size-2.88)px $(size-2.88)px 0 $(size-0.32)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   30% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0   0 $(size-0.32)px,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px 0 $(size-0.32)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px 0 $(size-0.32)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px 0 $(size-0.32)px;
   }

   40% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px ,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  0 $(size-0.32)px,       $(size-2.88)px  0 0 $(size-0.32)px,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px  0 $(size-0.32)px;
   }

   50% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  0 $(size-0.32)px,
           -$(size-2.88)px  $(size-1.44)px 0 $(size-0.32)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   60% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px 0 $(size-0.32)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px 0 $(size-0.32)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px 0 $(size-0.32)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   70% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px,0 -$(size-1.44)px 0 $(size-0.32)px,$(size-2.88)px -$(size-1.44)px 0 $(size-0.32)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px 0 $(size-0.32)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px;
   }

   80% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px 0 $(size-0.32)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px 0 $(size-0.32)px;
   }

   90% {
      box-shadow: -$(size-2.88)px -$(size-1.44)px 0 $(size-0.32)px,0 -$(size-1.44)px,$(size-2.88)px -$(size-1.44)px,
           -$(size-2.88)px  0  ,       $(size-2.88)px  0  ,
           -$(size-2.88)px  $(size-1.44)px,0  $(size-1.44)px 0 $(size-0.32)px,$(size-2.88)px  $(size-1.44)px,
           -$(size-2.88)px $(size-2.88)px,0 $(size-2.88)px,$(size-2.88)px $(size-2.88)px 0 $(size-0.32)px;
   }
}
</style>`,
    },

    // Shape Loaders

    {
        name: 'Shape - Alt. 1',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.6)px;
   height: $(size-6.6)px;
   border-radius: 50%;
   background: $primaryColor;
   clip-path: polygon(0 0,100% 0,100% 100%,0 100%);
   animation: shapes-yrjcu9 $(speed-0.2)s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes shapes-yrjcu9 {
   33% {
      border-radius: 0;
      clip-path: polygon(0 0,100% 0,100% 100%,0 100%);
   }

   66% {
      border-radius: 0;
      clip-path: polygon(50% 0,50% 0,100% 100%,0 100%);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 2',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   background: $primaryColor;
   clip-path: polygon(0 0,100% 0,100% 100%);
   animation: shapes-dxp0bh $(speed-0.2)s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes shapes-dxp0bh {
   25% {
      clip-path: polygon(0    0,100% 0   ,0 100%);
   }

   50% {
      clip-path: polygon(0    0,100% 100%,0 100%);
   }

   75% {
      clip-path: polygon(100% 0,100% 100%,0 100%);
   }

   100% {
      clip-path: polygon(100% 0,100% 100%,0 0   );
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 3',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-8)px;
   height: $(size-8)px;
   display: flex;
   transform: rotate(45deg);
   animation: shapes-y2xw5vsm $(speed-0.15)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   width: 50%;
   background: $primaryColor;
   clip-path: polygon(0 50%,100% 0,100% 100%);
   animation: inherit;
   animation-name: shapes-df97qxsm;
}

.shapes:after {
   clip-path: polygon(0 0,100% 50%,0% 100%);
   animation-name: shapes-zlisq2sm;
}

@keyframes shapes-y2xw5vsm {
   25% {
      width: $(size-8)px;
      height: $(size-8)px;
      transform: rotate(0);
   }

   50% {
      width: $(size-8)px;
      height: $(size-8)px;
   }

   75% {
      width: $(size-11.32)px;
      height: $(size-5.66)px;
   }

   100% {
      width: $(size-11.32)px;
      height: $(size-5.66)px;
      transform: rotate(0);
   }
}

@keyframes shapes-df97qxsm {
   0%, 25% {
      clip-path: polygon(0 50% ,100% 0,100% 100%);
      transform: translate($(size-0.04)px);
   }

   50% {
      clip-path: polygon(0 50% ,100% 0,100% 100%);
      transform: translate(-$(size-0.8)px);
   }

   75% {
      clip-path: polygon(0 100%,0    0,100% 100%);
      transform: translate(-$(size-0.8)px);
   }

   100% {
      clip-path: polygon(0 100%,0    0,100% 100%);
      transform: translate($(size-2.84)px);
   }
}

@keyframes shapes-zlisq2sm {
   0%, 25% {
      clip-path: polygon(0 0,100% 50%,0    100%);
      transform: translate(-$(size-0.04)px);
   }

   50% {
      clip-path: polygon(0 0,100% 50%,0    100%);
      transform: translate($(size-0.8)px);
   }

   75% {
      clip-path: polygon(0 0,100% 0  ,100% 100%);
      transform: translate($(size-0.8)px);
   }

   100% {
      clip-path: polygon(0 0,100% 0  ,100% 100%);
      transform: translate(-$(size-2.84)px);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 4',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   background: conic-gradient(from  -45deg at top    $(size-3.2)px left 50% ,#0000 ,currentColor 1deg 90deg,#0000 91deg),
          conic-gradient(from   45deg at right  $(size-3.2)px top  50% ,#0000 ,currentColor 1deg 90deg,#0000 91deg),
          conic-gradient(from  135deg at bottom $(size-3.2)px left 50% ,#0000 ,currentColor 1deg 90deg,#0000 91deg),
          conic-gradient(from -135deg at left   $(size-3.2)px top  50% ,#0000 ,currentColor 1deg 90deg,#0000 91deg);
   animation: shapes-q299i1sm $(speed-0.15)s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes shapes-q299i1sm {
   50% {
      width: $(size-9.6)px;
      height: $(size-9.6)px;
      transform: rotate(180deg);
   }

   100% {
      transform: rotate(360deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 5',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   background: linear-gradient(currentColor 0 0),
          linear-gradient(currentColor 0 0),
          linear-gradient(currentColor 0 0),
          linear-gradient(currentColor 0 0);
   background-size: $(size-3.4)px $(size-3.4)px;
   background-repeat: no-repeat;
   animation: shapes-53h9rpsm $(speed-0.15)s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes shapes-53h9rpsm {
   0% {
      background-position: 0    0,100% 0   ,100% 100%,0 100%;
   }

   33% {
      background-position: 0    0,100% 0   ,100% 100%,0 100%;
      width: $(size-9.6)px;
      height: $(size-9.6)px;
   }

   66% {
      background-position: 100% 0,100% 100%,0    100%,0 0;
      width: $(size-9.6)px;
      height: $(size-9.6)px;
   }

   100% {
      background-position: 100% 0,100% 100%,0    100%,0 0;
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 6',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   display: grid;
   animation: shapes-9tptoo $(speed-0.15)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   grid-area: 1/1;
   background: $primaryColor;
   animation: shapes-q0lle4 $(speed-0.15)s infinite linear,
        shapes-c5rge7 $(speed-0.15)s infinite linear;
}

.shapes:after {
   --s: -1;
   animation-direction: reverse;
}

@keyframes shapes-9tptoo {
   0%, 9%, 91%, 100% {
      background: $primaryColor;
   }

   10%, 90% {
      background: #0000;
   }
}

@keyframes shapes-q0lle4 {
   0%, 33% {
      clip-path: polygon(0   0,50% 100%,100% 0,100% 100%,0 100%);
   }

   66%, 100% {
      clip-path: polygon(50% 0,50% 100%,50%  0,100% 100%,0 100%);
   }
}

@keyframes shapes-c5rge7 {
   0%, 10%, 90%, 100% {
      transform: scale(var(--s,1)) translateY(0);
   }

   33%, 66% {
      transform: scale(var(--s,1)) translateY(50%);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 7',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   position: relative;
   background: conic-gradient(from 134deg at top   ,currentColor 92deg,#0000 0) top,
          conic-gradient(from -46deg at bottom,currentColor 92deg,#0000 0) bottom;
   background-size: 100% 50%;
   background-repeat: no-repeat;
}

.shapes:before {
   content: '';
   position: absolute;
   inset: 0;
   background: conic-gradient(from  -135deg at top 0    left   $(size-3.6)px ,#0000 ,currentColor 1deg 90deg,#0000 0),
          conic-gradient(from  -45deg  at right 0  top    $(size-3.6)px ,#0000 ,currentColor 1deg 90deg,#0000 0),
          conic-gradient(from   45deg  at bottom 0 right  $(size-3.6)px ,#0000 ,currentColor 1deg 90deg,#0000 0),
          conic-gradient(from  135deg  at left  0  bottom $(size-3.6)px ,#0000 ,currentColor 1deg 90deg,#0000 0);
   animation: shapes-et721zsm $(speed-0.15)s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes shapes-et721zsm {
   33% {
      inset: -$(size-1.6)px;
      transform: rotate(0deg);
   }

   66% {
      inset: -$(size-1.6)px;
      transform: rotate(90deg);
   }

   100% {
      inset: 0;
      transform: rotate(90deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 8',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   display: grid;
   animation: shapes-w7o2p3 $(speed-0.15)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   grid-area: 1/1;
   background: $primaryColor;
   clip-path: polygon(0 0%,100% 0,100% 100%);
   animation: inherit;
   animation-name: shapes-8qpnlc;
}

.shapes:after {
   --s: -1;
}

@keyframes shapes-w7o2p3 {
   66% {
      transform: skewX(0deg);
   }

   80%, 100% {
      transform: skewX(-45deg);
   }
}

@keyframes shapes-8qpnlc {
   0% {
      transform: scale(var(--s,1)) translate(-0.5px,0);
   }

   33% {
      transform: scale(var(--s,1)) translate(calc(1px - 50%),calc(1px - 50%));
   }

   66% {
      transform: scale(var(--s,1)) translate(calc(1px - 50%),0%);
   }

   100% {
      transform: scale(var(--s,1)) translate(calc(0.5px - 50%),0%);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 9',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-3.2)px;
   background: $primaryColor;
   position: relative;
   animation: shapes-y7kkf3 $(speed-0.15)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   position: absolute;
   background: inherit;
   bottom: 100%;
   width: 50%;
   height: 100%;
   animation: inherit;
   animation-name: shapes-dh54ub;
}

.shapes:before {
   left: 0;
   transform-origin: bottom left;
   --s: -1;
}

.shapes:after {
   right: 0;
   transform-origin: bottom right;
}

@keyframes shapes-y7kkf3 {
   0%, 10% {
      transform: translateY(0%)    scaleY(1);
   }

   49.99% {
      transform: translateY(-50%)  scaleY(1);
   }

   50% {
      transform: translateY(-50%)  scaleY(-1);
   }

   90%, 100% {
      transform: translateY(-100%) scaleY(-1);
   }
}

@keyframes shapes-dh54ub {
   10%, 90% {
      transform: rotate(0deg);
   }

   50% {
      transform: rotate(calc(var(--s,1)*180deg));
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 10',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-8)px;
   height: $(size-8)px;
   display: flex;
   animation: shapes-14djti $(speed-0.15)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   width: 50%;
   background: $primaryColor;
   clip-path: polygon(0 0,100% 50%,0% 100%);
   animation: inherit;
   animation-name: shapes-2vebjx;
   transform-origin: bottom left;
}

.shapes:before {
   clip-path: polygon(0 50%,100% 0,100% 100%);
   transform-origin: bottom right;
   --s: -1;
}

@keyframes shapes-14djti {
   0%, 34.99% {
      transform: scaley(1);
   }

   35%, 70% {
      transform: scaley(-1);
   }

   90%, 100% {
      transform: scaley(-1) rotate(180deg);
   }
}

@keyframes shapes-2vebjx {
   0%, 10%, 70%, 100% {
      transform: translateY(-100%) rotate(calc(var(--s,1)*135deg));
   }

   35% {
      transform: translateY(0%)    rotate(0deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 11',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   display: grid;
}

.shapes::before,
.shapes::after {
   content: "";
   grid-area: 1/1;
   background: currentColor;
   clip-path: polygon(0 0,50% 50%, 0 100%);
   animation: shapes-gkmo0z $(speed-0.2)s infinite;
}

.shapes::after {
   animation-delay: -$(speed-0.15)s;
   --s: 90deg;
}

@keyframes shapes-gkmo0z {
   0%, 12.5% {
      transform: rotate(var(--s,0deg)) rotate(0deg);
   }

   37.5%, 62.5% {
      transform: rotate(var(--s,0deg)) rotate(-180deg);
   }

   87.5%, 100% {
      transform: rotate(var(--s,0deg)) rotate(-360deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 12',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   background: repeating-conic-gradient(from -47deg,#0000 0deg, currentColor 1deg 91deg,#0000 94deg 180deg);
   display: flex;
   animation: shapes-15ms9x $(speed-0.2)s infinite linear;
}

.shapes::before,
.shapes::after {
   content: "";
   flex: 1;
   background: currentColor;
   clip-path: polygon(0 0,100% 50%, 0 100%);
   animation: shapes-jbr8bo $(speed-0.1)s infinite alternate;
   transform-origin: bottom left;
}

.shapes::after {
   clip-path: polygon(100% 0,100% 100%,0 50%);
   transform-origin: top right;
}

@keyframes shapes-15ms9x {
   0%, 49.9% {
      transform: scaleX( 1);
   }

   50%, 100% {
      transform: scaleX(-1);
   }
}

@keyframes shapes-jbr8bo {
   0%, 20% {
      transform: rotate(0deg);
   }

   80%, 100% {
      transform: rotate(-270deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 13',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   display: grid;
}

.shapes::before,
.shapes::after {
   content: "";
   grid-area: 1/1;
   background: currentColor;
   clip-path: polygon(0 0,101% 0, 0 100%);
   animation: shapes-t3dtsmsm $(speed-0.2)s infinite;
}

.shapes::after {
   --s: -1,-1;
}

@keyframes shapes-t3dtsmsm {
   0%, 10% {
      transform: scale(var(--s,1)) translate(0,0)        rotate(0deg);
   }

   33% {
      transform: scale(var(--s,1)) translate($(size-3.2)px,-$(size-3.2)px) rotate(0deg);
   }

   66% {
      transform: scale(var(--s,1)) translate($(size-3.2)px,-$(size-3.2)px) rotate(180deg);
   }

   90%, 100% {
      transform: scale(var(--s,1)) translate(0px,0px)    rotate(180deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 14',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   background: conic-gradient(currentColor 0 270deg,#0000 0);
   border-radius: 50%;
   animation: shapes-c03ehysm $(speed-0.4)s infinite linear;
}

.shapes::before {
   content: "";
   display: block;
   height: 50%;
   width: 50%;
   border-top-left-radius: $(size-16)px;
   background: currentColor;
   animation: shapes-cskup3sm $(speed-0.05)s infinite alternate;
}

@keyframes shapes-c03ehysm {
   0%, 24.99% {
      transform: rotate(0deg);
   }

   25%, 49.99% {
      transform: rotate(90deg);
   }

   50%, 74.99% {
      transform: rotate(180deg);
   }

   75%, 100% {
      transform: rotate(270deg);
   }
}

@keyframes shapes-cskup3sm {
   100% {
      transform: translate(-$(size-1.6)px,-$(size-1.6)px);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 15',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   display: flex;
   transform-origin: 50% 125%;
   animation: shapes-zacm6c $(speed-0.15)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   flex: 1;
   background: $primaryColor;
   animation: inherit;
   transform-origin: bottom left;
   animation-name: shapes-9intnl;
}

.shapes:before {
   transform-origin: bottom right;
   --s: -1;
}

@keyframes shapes-zacm6c {
   0%, 10% {
      transform: translateY(0)     scaleY(1);
   }

   49.99% {
      transform: translateY(-75%)  scaleY(1);
   }

   50% {
      transform: translateY(-75%)  scaleY(-1);
   }

   90%, 100% {
      transform: translateY(-150%) scaleY(-1);
   }
}

@keyframes shapes-9intnl {
   10%, 90% {
      transform: rotate(0deg);
   }

   50% {
      transform: rotate(calc(var(--s,1)*90deg));
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 16',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   position: relative;
   background: linear-gradient(currentColor 0 0) center/100% $(size-1.6)px,
          linear-gradient(currentColor 0 0) center/$(size-1.6)px 100%;
   background-repeat: no-repeat;
}

.shapes:before {
   content: '';
   position: absolute;
   inset: 0;
   background: linear-gradient(currentColor 0 0) 0    0,
          linear-gradient(currentColor 0 0) 100% 0,
          linear-gradient(currentColor 0 0) 0    100%,
          linear-gradient(currentColor 0 0) 100% 100%;
   background-size: $(size-2.4)px $(size-2.4)px;
   background-repeat: no-repeat;
   animation: shapes-9a9hjfsm $(speed-0.15)s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes shapes-9a9hjfsm {
   33% {
      inset: -$(size-1.6)px;
      transform: rotate(0deg);
   }

   66% {
      inset: -$(size-1.6)px;
      transform: rotate(90deg);
   }

   100% {
      inset: 0;
      transform: rotate(90deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 17',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-9.6)px;
   color: $primaryColor;
   position: relative;
}

.shapes::before,
.shapes::after {
   content: "";
   position: absolute;
   inset: 0;
   background: currentColor;
   clip-path: polygon(0 0,100% 0, 100% 67%,50% 67%,50% 34%,0 34%);
   animation: shapes-ukq0pism $(speed-0.2)s infinite;
}

.shapes::after {
   --s: -1,-1;
}

@keyframes shapes-ukq0pism {
   0%, 10% {
      transform: scale(var(--s,1)) translate(0,0)        rotate(0deg);
   }

   33% {
      transform: scale(var(--s,1)) translate(0,-$(size-3.2)px)    rotate(0deg);
   }

   66% {
      transform: scale(var(--s,1)) translate($(size-1.6)px,-$(size-3.2)px) rotate(-90deg);
   }

   90%, 100% {
      transform: scale(var(--s,1)) translate($(size-1.6)px,-$(size-1.6)px) rotate(-90deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 18',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   position: relative;
   background: radial-gradient($(size-1.6)px,currentColor 94%,#0000);
}

.shapes:before {
   content: '';
   position: absolute;
   inset: 0;
   border-radius: 50%;
   background: radial-gradient($(size-1.44)px at bottom right,#0000 94%,currentColor) top    left,
          radial-gradient($(size-1.44)px at bottom left ,#0000 94%,currentColor) top    right,
          radial-gradient($(size-1.44)px at top    right,#0000 94%,currentColor) bottom left,
          radial-gradient($(size-1.44)px at top    left ,#0000 94%,currentColor) bottom right;
   background-size: $(size-3.2)px $(size-3.2)px;
   background-repeat: no-repeat;
   animation: shapes-77ngqcsm $(speed-0.15)s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes shapes-77ngqcsm {
   33% {
      inset: -$(size-1.6)px;
      transform: rotate(0deg);
   }

   66% {
      inset: -$(size-1.6)px;
      transform: rotate(90deg);
   }

   100% {
      inset: 0;
      transform: rotate(90deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 19',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-3.2)px;
   background: $primaryColor;
   position: relative;
   animation: shapes-9nkw4osm $(speed-0.15)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   position: absolute;
   background: inherit;
   bottom: 100%;
   width: 50%;
   height: 100%;
   animation: inherit;
   animation-name: shapes-r89hlosm;
}

.shapes:before {
   left: 0;
   --s: -1,1;
}

.shapes:after {
   right: 0;
}

@keyframes shapes-9nkw4osm {
   0%, 30% {
      transform: translateY(0)     scaleY(1);
   }

   49.99% {
      transform: translateY(-50%)  scaleY(1);
   }

   50% {
      transform: translateY(-50%)  scaleY(-1);
   }

   70%, 100% {
      transform: translateY(-100%) scaleY(-1);
   }
}

@keyframes shapes-r89hlosm {
   0%, 10%, 90%, 100% {
      transform: scale(var(--s,1)) translate(0);
   }

   30%, 70% {
      transform: scale(var(--s,1)) translate($(size-3.2)px);
   }

   50% {
      transform: scale(var(--s,1)) translate($(size-3.2)px,$(size-3.2)px);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 20',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   display: flex;
   transform-origin: 0% 150%;
   animation: shapes-krck4xsm $(speed-0.2)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   flex: 1;
   background: $primaryColor;
   animation: shapes-oxo66nsm $(speed-0.1)s infinite linear alternate;
   border-radius: $(size-16)px 0 0 $(size-16)px;
   transform-origin: 100% 100%;
}

.shapes:after {
   border-radius: 0 $(size-16)px $(size-16)px 0;
   transform-origin: 0% 100%;
   --s: -1;
}

@keyframes shapes-krck4xsm {
   0%, 10% {
      transform: translateY(0)     scaleY(1);
   }

   49.99% {
      transform: translateY(-100%) scaleY(1);
   }

   50% {
      transform: translateY(-100%) scaleY(-1);
   }

   90%, 100% {
      transform: translateY(-200%) scaleY(-1);
   }
}

@keyframes shapes-oxo66nsm {
   0%, 20% {
      transform: rotate(0deg)                    translate(0,0)     rotate(0deg);
   }

   50% {
      transform: rotate(calc(var(--s,1)*-90deg)) translate(0,0)     rotate(0deg);
   }

   100% {
      transform: rotate(calc(var(--s,1)*-90deg)) translate(0,-$(size-3.2)px) rotate(calc(var(--s,1)*-90deg));
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 21',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   display: flex;
}

.shapes:before,
.shapes:after {
   content: "";
   flex: 1;
   background: $primaryColor;
   animation: shapes-xlm69v $(speed-0.2)s infinite;
   border-radius: $(size-16)px 0 0 $(size-16)px;
   transform-origin: top right;
   transform: translateY(calc(var(--s,1)*0%)) rotate(0);
}

.shapes:after {
   transform-origin: bottom left;
   border-radius: 0 $(size-16)px $(size-16)px 0;
   --s: -1;
}

@keyframes shapes-xlm69v {
   33% {
      transform: translate(0,calc(var(--s,1)*50%)) rotate(0);
   }

   66% {
      transform: translate(0,calc(var(--s,1)*50%)) rotate(-90deg);
   }

   90%, 100% {
      transform: translate(calc(var(--s,1)*-100%),calc(var(--s,1)*50%))  rotate(-90deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 22',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-5.76)px;
   height: $(size-5.76)px;
   color: $primaryColor;
   background: conic-gradient( from 134deg at top,currentColor  92deg,#0000 0);
   position: relative;
   animation: shapes-h7131o $(speed-0.2)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   position: absolute;
   width: 50%;
   height: 50%;
   background: currentColor;
   transform-origin: top right;
   clip-path: polygon(100% 0,100% 100%,0 100%);
   inset: auto 100% 0 auto;
   animation: shapes-fac481 $(speed-0.1)s infinite linear alternate;
}

.shapes:after {
   inset: auto auto 0 100%;
   transform-origin: top left;
   --s: -1;
   clip-path: polygon(0 0,100% 100%,0 100%);
}

@keyframes shapes-h7131o {
   0%, 49.99% {
      transform: scaleY(1);
   }

   50%, 90% {
      transform: scaleY(-1);
   }

   100% {
      transform: scaleY(-1) rotate(180deg);
   }
}

@keyframes shapes-fac481 {
   0%, 30% {
      transform: rotate(calc(var(--s,1)*0));
   }

   70%, 100% {
      transform: rotate(calc(var(--s,1)*180deg));
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 23',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-5.76)px;
   height: $(size-5.76)px;
   color: $primaryColor;
   background: linear-gradient(45deg,#0000 24%,currentColor 0 76%,#0000 0);
   position: relative;
   animation: shapes-zlsf6xsm $(speed-0.15)s infinite;
}

.shapes:before,
.shapes:after {
   content: "";
   position: absolute;
   width: 50%;
   height: 50%;
   background: currentColor;
   transform-origin: top left;
   clip-path: polygon(-$(size-0.32)px 0,0 -$(size-0.16)px,100% 100%,-$(size-0.32)px 100%);
   inset: auto auto 0 0;
   animation: shapes-8ket80sm $(speed-0.15)s infinite;
}

.shapes:after {
   inset: 0 0 auto auto;
   transform-origin: bottom right;
   clip-path: polygon(0 0,calc(100% + $(size-0.32)px) 0,calc(100% + $(size-0.32)px) 100%,100% calc(100% + $(size-0.16)px));
}

@keyframes shapes-zlsf6xsm {
   0%, 50% {
      transform: skewX(0);
   }

   90%, 100% {
      transform: skewX(-45deg);
   }
}

@keyframes shapes-8ket80sm {
   40%, 100% {
      transform: rotate(180deg);
      box-shadow: 0 0 0 $(size-0.48)px;
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 24',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   display: grid;
}

.shapes:before,
.shapes:after {
   content: "";
   background: $primaryColor;
   transform-origin: left;
   animation: shapes-0fdvou $(speed-0.2)s infinite;
}

.shapes:before {
   transform-origin: right;
   --s: -1;
}

@keyframes shapes-0fdvou {
   0%, 10% {
      transform: translate(0,0)  scale(1);
   }

   33% {
      transform: translate(calc(var(--s,1)*50%),0)  scale(1);
   }

   66% {
      transform: translate(calc(var(--s,1)*50%),calc(var(--s,1)*-50%))  scale(1);
   }

   90%, 100% {
      transform: translate(calc(var(--s,1)*50%),calc(var(--s,1)*-50%))  scale(0.5,2);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 25',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   color: $primaryColor;
   position: relative;
}

.shapes:before {
   content: '';
   position: absolute;
   inset: 0;
   border-radius: 50%;
   background: conic-gradient(from 0deg,  #0000, currentColor 1deg 120deg,#0000 121deg) top right,
          conic-gradient(from 120deg,#0000, currentColor 1deg 120deg,#0000 121deg) bottom,
          conic-gradient(from 240deg,#0000, currentColor 1deg 120deg,#0000 121deg) top left;
   background-size: $(size-6.4)px $(size-6.4)px;
   background-repeat: no-repeat;
   animation: shapes-r0t0iosm $(speed-0.2)s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes shapes-r0t0iosm {
   33% {
      inset: -$(size-1.28)px;
      transform: rotate(0deg);
   }

   66% {
      inset: -$(size-1.28)px;
      transform: rotate(180deg);
   }

   100% {
      inset: 0;
      transform: rotate(180deg);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 26',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-8.96)px;
   height: $(size-8.96)px;
   color: $primaryColor;
   position: relative;
}

.shapes::before,
.shapes::after {
   content: "";
   position: absolute;
   inset: 0;
   background: linear-gradient(currentColor 0 0) 0 calc(var(--s,0)*-100%)/100% calc(100%/3),
          repeating-linear-gradient(90deg,currentColor 0 25%,#0000 0 50%) calc(var(--s,0)*100%) 50%/calc(4*100%/3) calc(100%/3);
   background-repeat: no-repeat;
   animation: shapes-g8wz24 $(speed-0.2)s infinite;
}

.shapes::after {
   --s: -1;
}

@keyframes shapes-g8wz24 {
   0%, 10% {
      transform: translateY(calc(var(--s,1)*0));
      background-position: 0 calc(var(--s,0)*-100%),calc(var(--s,0)*100%) 50%;
   }

   33% {
      transform: translateY(calc(var(--s,1)*-20%));
      background-position: 0 calc(var(--s,0)*-100%),calc(var(--s,0)*100%) 50%;
   }

   66% {
      transform: translateY(calc(var(--s,1)*-20%));
      background-position: 0 calc(var(--s,0)*-100%),calc(var(--s,0)*100% + 100%) 50%;
   }

   90%, 100% {
      transform: translateY(calc(var(--s,1)*0));
      background-position: 0 calc(var(--s,0)*-100%),calc(var(--s,0)*100% + 100%) 50%;
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 27',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-8)px;
   height: $(size-6.92800)px;
   position: relative;
   background: conic-gradient(from 120deg at 50% 64%,#0000, $primaryColor 1deg 120deg,#0000 121deg);
   transform-origin: 50% 50%;
   animation: shapes-b3u1dgsm $(speed-0.15)s infinite cubic-bezier(0.3,1,0,1);
}

.shapes:before,
.shapes:after {
   content: '';
   position: absolute;
   inset: 0;
   background: inherit;
   transform-origin: 50% 66%;
   animation: shapes-ki907osm $(speed-0.15)s infinite;
}

.shapes:after {
   --s: -1;
}

@keyframes shapes-b3u1dgsm {
   0%, 30% {
      transform: rotate(0);
   }

   70% {
      transform: rotate(120deg);
   }

   70.01%, 100% {
      transform: rotate(360deg);
   }
}

@keyframes shapes-ki907osm {
   0% {
      transform: rotate(calc(var(--s,1)*120deg)) translate(0);
   }

   30%, 70% {
      transform: rotate(calc(var(--s,1)*120deg)) translate(calc(var(--s,1)*-$(size-0.8)px),$(size-1.6)px);
   }

   100% {
      transform: rotate(calc(var(--s,1)*120deg)) translate(0);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 28',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-3.2)px;
   height: $(size-3.2)px;
   color: $primaryColor;
   background: currentColor;
   position: relative;
   transform-origin: top right;
   animation: shapes-6e8qzb $(speed-0.2)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   position: absolute;
   width: 100%;
   height: 100%;
   background: currentColor;
   transform-origin: bottom right;
   clip-path: polygon(0 0,100% 100%,0 100%);
   inset: auto auto 100% 0;
   animation: shapes-sn7tli $(speed-0.1)s infinite linear alternate;
}

.shapes:after {
   inset: auto auto 0 100%;
   transform-origin: top left;
   --s: -1;
}

@keyframes shapes-6e8qzb {
   0%, 49.99% {
      transform: scale(1);
   }

   50%, 90% {
      transform: scale(-1);
   }

   100% {
      transform: scale(-1) rotate(180deg);
   }
}

@keyframes shapes-sn7tli {
   0%, 30% {
      transform: rotate(calc(var(--s,1)*0));
   }

   70%, 100% {
      transform: rotate(calc(var(--s,1)*90deg));
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 29',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-9.6)px;
   height: $(size-9.6)px;
   color: $primaryColor;
   background: linear-gradient(currentColor 0 0) left   $(size-3.2)px top    0,
          linear-gradient(currentColor 0 0) top    $(size-3.2)px right  0,
          linear-gradient(currentColor 0 0) right  $(size-3.2)px bottom 0,
          linear-gradient(currentColor 0 0) bottom $(size-3.2)px left   0;
   background-size: calc(100%/3) calc(100%/3);
   background-repeat: no-repeat;
   animation: shapes-dqf486 $(speed-0.075)s infinite alternate linear,
          shapes-g0d60l $(speed-0.15)s infinite;
}

@keyframes shapes-dqf486 {
   90%, 100% {
      background-size: calc(2*100%/3) calc(100%/3),calc(100%/3) calc(2*100%/3);
   }
}

@keyframes shapes-g0d60l {
   0%, 49.99% {
      transform: scaleX(1);
   }

   50%, 100% {
      transform: scaleX(-1);
   }
}
</style>`,
    },
    {
        name: 'Shape - Alt. 30',
        category: 'Shape Loaders',
        primaryColor: '#008080',
        size: 'Medium',
        speed: 'Average',
        code: `<div class="shapes"></div>

<style>
.shapes {
   width: $(size-6.4)px;
   height: $(size-6.4)px;
   display: grid;
   animation: shapes-vr4j7x $(speed-0.15)s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   grid-area: 1/1;
   background: $primaryColor;
   animation: inherit;
   animation-name: shapes-davbv3;
}

.shapes:after {
   transform-origin: bottom right;
   --s: 1;
}

@keyframes shapes-vr4j7x {
   0%, 66% {
      transform: scaleY(1);
   }

   66.01%, 100% {
      transform: scaleY(-1);
   }
}

@keyframes shapes-davbv3 {
   0%, 10% {
      transform: scaleX(calc(var(--s,-1)*-1)) rotate(calc(var(--s,0)*90deg));
      clip-path: polygon(0 0,0 100%,100% 100%);
   }

   33% {
      transform: scaleX(calc(var(--s,-1)*-1)) rotate(calc(var(--s,0)*0deg));
      clip-path: polygon(0 0,0 100%,100% 100%);
   }

   66% {
      transform: scaleX(calc(var(--s,-1)*-1)) rotate(calc(var(--s,0)*0deg));
      clip-path: polygon(0 0,0 100%,100% 0);
   }

   66.01% {
      transform: scaleX(calc(var(--s,-1)*-1)) rotate(calc(var(--s,0)*0deg));
      clip-path: polygon(0 0,0 100%,100% 100%);
   }

   90%, 100% {
      transform: scaleX(calc(var(--s,-1)*-1)) rotate(calc(var(--s,0)*90deg));
      clip-path: polygon(0 0,0 100%,100% 100%);
   }
}
</style>`,
    },
]

export const filterCSS = (
    text: string,
    css: {
        size?: string
        speed?: string
        primaryColor?: string
        secondaryColor?: string
    },
) => {
    if (!text) return ''
    return text
        .replaceAll(/\$\(\s*size-([\d.]+)\s*\)/g, (match, size) => {
            let result =
                Number(size) *
                sizeOptions.find((option) => option.value === css.size)
                    ?.calculation!
            return result.toString()
        })
        .replaceAll(/\$\(\s*speed-([\d.]+)\s*\)/g, (match, size) => {
            let result =
                Number(size) *
                speedOptions.find((option) => option.value === css.speed)
                    ?.calculation!
            return result.toString()
        })
        .replaceAll(
            /\$\(\s*primaryColorRgb-([\d.]+)\s*\)/g,
            (match, opacity) => {
                return `${customHexToRgbOpacity(css?.primaryColor! || '#000000')},${opacity})`
            },
        )
        ?.replaceAll('$primaryColor', css?.primaryColor!)
        ?.replaceAll('$secondaryColor', css?.secondaryColor!)
}

const CSSLoaderGeneratorForm = () => {
    const form = useForm<ILoaderForm>({
        defaultValues: {
            category: categories[4].value,
            loaders: loaders,
        },
    })

    const {
        register,
        control,
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = form

    const { fields } = useFieldArray({
        control,
        name: 'loaders',
    })

    return (
        <div className="container">
            <div className="mx-auto my-5 w-full max-w-6xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form className="space-y-8">
                    <div className="grid gap-10">
                        <div className="grid gap-2 sm:gap-5 lg:grid-cols-3">
                            <div>
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Loader categories
                                </label>
                                <Select
                                    value={watch('category')}
                                    onValueChange={(val) => {
                                        setValue('category', val)
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select clip path shape" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category, key) => {
                                            return (
                                                <SelectItem
                                                    key={key}
                                                    value={category.value}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span>
                                                            {category.label}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <p className="lg:col-start-3 lg:mt-auto lg:text-end">
                                Total CSS loader count:{' '}
                                <span className="font-bold">
                                    {fields.length}
                                </span>
                            </p>
                        </div>
                        <div className="grid gap-2 sm:gap-5 lg:grid-cols-3">
                            {fields.map((field, index) => {
                                if (field.category === watch('category'))
                                    return (
                                        <LoaderCard
                                            key={field.id}
                                            field={field}
                                            index={index}
                                            form={form}
                                        />
                                    )
                            })}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CSSLoaderGeneratorForm
