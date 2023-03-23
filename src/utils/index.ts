
export function abbreviatenumber({ number, maxPlaces = 2, forcePlaces = 2, forceLetter }: { number: number, maxPlaces?: number, forcePlaces?: number, forceLetter?: string }) {

    if ((forceLetter?.length ?? 0) > 0) {
        return annotate({ number, maxPlaces, forcePlaces, forceLetter })
    }

    if (number >= 1e12) {
        forceLetter = 'T'
    }
    else if (number >= 1e9) {
        forceLetter = 'B'
    }
    else if (number >= 1e6) {
        forceLetter = 'M'
    }
    else if (number >= 1e3) {
        forceLetter = 'K'
    }
    else {
        forceLetter = ''
    }
    return annotate({ number, maxPlaces, forcePlaces, forceLetter })
}

function annotate({ number, maxPlaces, forcePlaces, forceLetter }:
    { number: number, maxPlaces?: number, forcePlaces?: number, forceLetter?: string }) {
    var rounded = 0

    switch (forceLetter) {
        case 'T':
            rounded = number / 1e12
            break
        case 'B':
            rounded = number / 1e9
            break
        case 'M':
            rounded = number / 1e6
            break
        case 'K':
            rounded = number / 1e3
            break
        case '':
            rounded = number
            break
    }
    if (maxPlaces !== undefined) {
        var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$')
        if (test.test(('' + rounded))) {
            rounded = Number.parseInt(rounded.toFixed(maxPlaces))
        }
    }
    if (forcePlaces) {
        rounded = Number.parseInt(Number(rounded).toFixed(forcePlaces))
    }
    return rounded + (forceLetter as string)
}



