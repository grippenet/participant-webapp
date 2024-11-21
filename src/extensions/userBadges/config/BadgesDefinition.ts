
export interface BadgesDefinition {
    code: string;
    seasonal: boolean;
    fileName: string;
}


export const badgesDefinition2024: Record<string, BadgesDefinition> = {
    bg1: {
        code: 'beginner',
        seasonal: false,
        fileName: 'beginner.svg', // OK
    },
    bg2: {
        code: 'starting',
        seasonal: true,
        fileName: 'starting.svg' // OK
    },
    bg3: {
        code: 'loyalty',
        seasonal: false,
        fileName: 'loyalty.svg' // OK
    },
    bg4: {
        code: 'regularity',
        seasonal: false,
        fileName: 'regularity.svg' // OK
    },
    bg5: {
        code: 'seasonBronze',
        seasonal: false,
        fileName: 'seasonBronze.svg' // OK
    },
    bg6: {
        code: 'seasonArgent',
        seasonal: false,
        fileName: 'seasonArgent.svg' // OK
    },
    bg7: {
        code: 'seasonGold',
        seasonal: false,
        fileName: 'seasonGold.svg' // OK
    },
    bg8: {
        code: 'external',
        seasonal: false,
        fileName: 'external.svg' // diversité 1
    },
    bg9: {
        code: 'stop_tobacco',
        seasonal: false,
        fileName: 'stop_tobacco.svg' // OK
    },
    bg10: {
        code: 'influenza_prev',
        seasonal: false,
        fileName: 'influenza_prev.svg' // OK j'ai pris le premier
    },
    bg11: {
        code: 'precision',
        seasonal: false,
        fileName: 'precision.svg'  // OK
    },
    bg12: {
        code: 'return',
        seasonal: false,
        fileName: 'return.svg' // OK
    },
    bg13: {
        code: 'pionneer',
        seasonal: false,
        fileName: 'pionneer.svg' // OK
    },
    bgs5: {
        code: 'step5',
        seasonal: false,
        fileName: 'step5.svg' // OK
    },
    bgs10: {
        code: 'step10',
        seasonal: false,
        fileName: 'step10.svg' // OK
    },
    bgs25: {
        code: 'step25',
        seasonal: false,
        fileName: 'step25.svg' // OK
    },
    bgs50: {
        code: 'step50',
        seasonal: false,
        fileName: 'step50.svg' // OK
    },
    bgs100: {
        code: 'step100',
        seasonal: false,
        fileName: 'step100.svg' // OK
    }
}
