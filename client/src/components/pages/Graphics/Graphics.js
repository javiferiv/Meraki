import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const MyResponsivePie = ({ adventures, fiction, children, romantic, other, misterious, dark, terror }) => (

    <ResponsivePie
        data={[
            {
                "id": "Aventuras",
                "value": `${adventures}`,
                "color": "hsl(20, 70%, 50%)"
            },
            {
                "id": "Infantiles",
                "value": `${children}`,
                "color": "hsl(163, 67%, 86%)"
            },
            {
                "id": "Ciencia-ficción",
                "value": `${fiction}`,
                "color": "hsl(133, 39%, 71%)"
            },
            {
                "id": "Novela negra",
                "value": `${dark}`,
                "color": "hsl(326, 39%, 71%)"
            },
            {
                "id": "Misterio",
                "value": `${misterious}`,
                "color": "hsl(247, 67%, 86%)"
            },
            {
                "id": "Romántico",
                "value": `${romantic}`,
                "color": "hsl(156, 39%, 71%)"
            },
            {
                "id": "Terror",
                "value": `${terror}`,
                "color": "hsl(156, 39%, 71%)"
            },
            {
                "id": "Otro",
                "value": `${other}`,
                "color": "hsl(20, 70%, 50%)"
            }
        ]}

        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'pastel1' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}

        fill={[
            {
                match: {
                    id: 'Aventuras'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Misterio'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Ciencia-ficción'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Terror'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default MyResponsivePie