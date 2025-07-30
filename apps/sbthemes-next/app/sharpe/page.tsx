import Image from 'next/image'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

import ImageForm from '@/app/sharpe/_image-form'
import ImageShow from '@/app/sharpe/_image-show'

path.resolve(process.cwd(), 'fonts', 'fonts.conf')
path.resolve(process.cwd(), 'fonts', 'Arial.ttf')
path.resolve(process.cwd(), 'fonts', 'Georgia.ttf')
path.resolve(process.cwd(), 'fonts', 'Helvetica.ttf')
path.resolve(process.cwd(), 'fonts', 'Tahoma.ttf')
path.resolve(process.cwd(), 'fonts', 'TimesNewRoman.ttf')
path.resolve(process.cwd(), 'fonts', 'Verdana.ttf')

export default async function sharpe({ searchParams }: any) {
    const changeColor = (svgContent: string, newColor: string) => {
        const fillStrokeRegex = /(fill|stroke)="(?!none)([^"]*)"/gi
        const styleRegex = /style="([^"]*)"/gi

        // Replace existing fill/stroke attributes
        svgContent = svgContent.replace(fillStrokeRegex, `$1="${newColor}"`)

        // Replace inline styles that include fill/stroke
        svgContent = svgContent.replace(styleRegex, (match, p1) => {
            const newStyle = p1.replace(
                /(fill|stroke):\s*[^;]+/gi,
                `$1: ${newColor}`,
            )
            return `style="${newStyle}"`
        })

        // Handle elements that should get the fill attribute
        const elementsToColor = [
            'path',
            'circle',
            'rect',
            'ellipse',
            'line',
            'polyline',
            'polygon',
        ]

        elementsToColor.forEach((element) => {
            const elementRegex = new RegExp(`<${element}([^>]*)\/?>`, 'gi')
            svgContent = svgContent.replace(elementRegex, (match, p1) => {
                // Check if the tag is self-closing
                const isSelfClosing = /\/>$/.test(match)

                // If no fill, stroke, or style attribute exists, add fill before the closing character
                if (!/(?:fill|stroke|style)=/i.test(p1)) {
                    if (isSelfClosing) {
                        // Remove the '/' and add it back after the fill attribute
                        const modifiedTag = `<${element}${p1.replace(
                            '/',
                            '',
                        )} fill="${newColor}" />`
                        return modifiedTag
                    } else {
                        // For non-self-closing tags, just insert `fill` normally
                        return `<${element}${p1} fill="${newColor}">`
                    }
                }
                return match // If fill/stroke already exists, return unchanged
            })
        })
        return svgContent
    }

    const addOverlaysToImage = async (
        inputImagePath: string,
        // outputImagePath: string,
        options: any,
    ) => {
        try {
            const image = sharp(inputImagePath)
            const metadata = await image.metadata()

            const {
                text,
                fontSize = 40,
                fontColor = 'white',
                fontFamily = 'Arial',
                bold = false,
                italic = false,
                underline = false,
                position = 'center-center',
                xPosition = false,
                yPosition = false,
                logos = [],
                waterMarkVersion = 'light',
            } = options

            const fontWeight = bold ? 'bold' : 'normal'
            const fontStyle = italic ? 'italic' : 'normal'
            const textDecoration = underline ? 'underline' : 'none'

            // Calculate text position
            let [verticalAlign, horizontalAlign] = position.split('-')
            let x: any = ''
            let y: any = ''

            switch (horizontalAlign) {
                case 'left':
                    x = '10%'
                    break
                case 'center':
                    x = '50%'
                    break
                case 'right':
                    x = '90%'
                    break
            }

            switch (verticalAlign) {
                case 'top':
                    y = '10%'
                    break
                case 'center':
                    y = '50%'
                    break
                case 'bottom':
                    y = '90%'
                    break
            }

            if (!!xPosition) {
                x = xPosition
            }

            if (!!xPosition) {
                y = yPosition
            }

            const processedText = text.replace(/<br\s*\/?>/gi, '\n')
            const lines = processedText.split('\n')

            const svgTspanText = lines
                .map((line: any, index: number) => {
                    return `<tspan x="${x}" dy="${
                        index === 0 ? 0 : fontSize * 1.2
                    }" text-anchor="${
                        horizontalAlign === 'center'
                            ? 'middle'
                            : horizontalAlign
                    }">${line.trim()}</tspan>`
                })
                .join('')

            const svgText = `
          <svg width="${metadata.width}" height="${metadata.height}">
            <style>
                @font-face {
                    font-family: Arial;
                    src: './fonts/Arial.ttf'';
                },
                @font-face {
                    font-family: Georgia;
                    src: './fonts/Georgia.ttf'';
                }
                @font-face {
                    font-family: Helvetica;
                    src: './fonts/Helvetica.ttf'';
                }
                @font-face {
                    font-family: Tahoma;
                    src: './fonts/Tahoma.ttf'';
                }
                @font-face {
                    font-family: TimesNewRoman;
                    src: './fonts/TimesNewRoman.ttf'';
                }
                @font-face {
                    font-family: Verdana;
                    src: './fonts/Verdana.ttf'';
                }
              .title {
                fill: ${fontColor};
                font-size: ${fontSize}px;
                font-family: ${fontFamily};
                font-weight: ${fontWeight};
                font-style: ${fontStyle};
                text-decoration: ${textDecoration};
              }
            </style>
            <text
              x="${x}" y="${y}"
              text-anchor="${
                  horizontalAlign === 'center' ? 'middle' : horizontalAlign
              }"
              dominant-baseline="${
                  verticalAlign === 'center' ? 'middle' : verticalAlign
              }"
              class="title"
            >${svgTspanText}</text>
          </svg>
        `

            const compositeArray = [
                {
                    input: Buffer.from(svgText),
                    top: 0,
                    left: 0,
                },
            ]

            // Add logos to the composite array
            for (const logo of logos) {
                try {
                    const axiosData = await axios(logo.path)

                    let svgContent = axiosData.data
                    svgContent = changeColor(svgContent, logo.color)
                    const svgBuffer = Buffer.from(svgContent)

                    const logoImage = sharp(svgBuffer)

                    const logoMetadata = await logoImage.metadata()

                    // Calculate the new height based on the desired width, maintaining aspect ratio
                    const aspectRatio = logoMetadata
                        ? (logoMetadata?.width || 1) /
                          (logoMetadata?.height || 1)
                        : 1
                    const newHeight = Math.round(logo.width / aspectRatio)

                    // Resize the logo
                    const resizedLogo = await logoImage
                        .resize(logo.width, newHeight)
                        .toBuffer()

                    compositeArray.push({
                        input: resizedLogo,
                        top: logo.top,
                        left: logo.left,
                    })
                } catch (logoError) {
                    console.error(
                        `Error processing logo ${logo.path}:`,
                        logoError,
                    )
                }
            }

            const watermarkImage = sharp(
                Buffer.from(
                    await fs.readFileSync(
                        path.join(
                            process.cwd() + '/app/sharpe/assets/',
                            waterMarkVersion === 'light'
                                ? 'watermark-light.png'
                                : 'watermark-dark.png',
                        ),
                    ),
                ),
            )

            const watermarkMetadata = await watermarkImage.metadata()
            const watermarkWidth = 300
            // Calculate the new height based on the desired width, maintaining aspect ratio
            const aspectRatio = watermarkMetadata
                ? (watermarkMetadata?.width || 1) /
                  (watermarkMetadata?.height || 1)
                : 1
            const newHeight = Math.round(watermarkWidth / aspectRatio)

            compositeArray.push({
                input: await watermarkImage
                    .resize(watermarkWidth, newHeight)
                    .toBuffer(),
                top: 50,
                left: 50,
            })

            return (
                (
                    await image
                        .composite(compositeArray)
                        .withMetadata()
                        // .webp({ quality: 90 })
                        .toBuffer()
                ).toString('base64')
            )
        } catch (error) {
            console.error('An error occurred:', error)
            return ''
        }
    }

    const configJson = {
        text: 'Lorem impsum',
        fontSize: 40,
        fontColor: '#000000',
        fontFamily: 'Arial',
        bold: false,
        italic: false,
        underline: false,
        position: 'center-center',
        xPosition: '',
        yPosition: '',
        waterMarkVersion: 'dark',
        logos: [],
        ...searchParams,
    }

    const inputDir = path.join(process.cwd(), `/app/sharpe/bg-images`)
    const generatedImage = await {
        src: await addOverlaysToImage(
            `${inputDir}/${searchParams.image || '1-min.jpg'}`,
            configJson,
        ),
    }

    const allImageFiles = await fs.readdirSync(inputDir)
    const imagesBase64: any = []
    for (const imgFile of allImageFiles) {
        imagesBase64.push({
            fileName: imgFile,
            src: (await fs.readFileSync(`${inputDir}/${imgFile}`)).toString(
                'base64',
            ),
        })
    }

    return (
        <div className="p-5">
            <div className="relative grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-9">
                <div className="col-span-4 w-full">
                    <ImageShow
                        searchQueryValue={searchParams}
                        imgData={generatedImage}
                        className="sticky top-0"
                    />
                </div>
                <div className="col-span-5">
                    <ImageForm
                        searchQueryValue={searchParams}
                        files={imagesBase64}
                    />
                </div>
            </div>
        </div>
    )
}
