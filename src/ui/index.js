export function SmartDiv({ container, offsetX = 0, offsetY = 0 }) {
    const element = document.createElement('div')
    const style = element.style
    style.position = 'absolute'
    // style.pointerEvents = 'auto'
    // style.background = 'red'
    container.appendChild(element)
    return {
        element,
        move: ({ x, y }) => {
            // console.log(element.offsetHeight, element.style.transform)
            const X = x - element.offsetWidth / 2 + offsetX
            const Y = y - element.offsetHeight / 2 + offsetY
            style.left = `${X}px`
            style.top = `${Y}px`
        },
        scale: value => {
            style.transform = `scale(${value})`
        },
        destroy: () => {
            container.removeChild(element)
        }
    }
}

export function OwnerUiElement() {
    const element = document.createElement('div')
    const textElement = document.createElement('div')
    const unitsElement = document.createElement('div')
    element.appendChild(textElement)
    element.appendChild(unitsElement)
    return {
        element,
        changeName: name => {
            textElement.innerHTML = name
        },
        changeUnits: units => {
            if (units > 0) {
                unitsElement.innerHTML = units
                unitsElement.style.display = 'block'
            } else {
                unitsElement.style.display = 'none'
            }
        },
        changeOwner: className => {
            element.className = className
        }
    }
}

export function RecruitmentPowerUiElement({ className }) {
    const element = document.createElement('div')
    const textElement = document.createElement('div')
    element.appendChild(textElement)
    element.className = className
    return {
        element,
        changePower: power => {
            textElement.innerHTML = power
        }
    }
}

export function TroopsUnitsUiElement({ className }) {
    const element = document.createElement('div')
    const textElement = document.createElement('div')
    element.appendChild(textElement)
    element.className = className
    return {
        element,
        changeUnits: units => {
            textElement.innerHTML = units
        }
    }
}
