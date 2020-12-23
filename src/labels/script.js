
const getParams = () => {
    const params = {};
    window.location.search.substring(1).split('&').forEach(el => {
        const param = el.split('=');
        params[param[0]] = decodeURIComponent(param[1]).replaceAll('+', ' ')
    })
    return params
}

const bottle = () => {
    let params = getParams()
    const labelString = `#${params.batchNumber} ${params.name} `.repeat(30)
    params = JSON.parse(JSON.stringify(params));
    params.quantity = Math.ceil(parseFloat(params.quantity) / 2.0)
    generateLabels(params, labelString, 'pre')
}

const cap = () => {
    const params = getParams()
    generateLabels(params, `#${params.batchNumber}`, 'code')
}

const fillParams = () => {
    const params = getParams()
    for (const k in params) {
        if (params.hasOwnProperty(k)) {
            document.getElementById(k).value = params[k]
        }
    }
}

const printAll = () => {
    fillParams()
    bottle()
    cap()
}

const generateLabels = (params, labelString, elementName='pre') => {
    let pre = document.createElement(elementName)
    pre.innerText = labelString
    pre.style.backgroundColor = params.color
    const initialQuantity = parseInt(params.quantity)
    let quantity = parseInt(params.quantity)
    params.quantity = quantity && quantity > 0 ? quantity : 0
    let c = quantity
    while (c > 0) {
        c = c - 1
        document.body.appendChild(pre.cloneNode(true))
    }
    params.quantity = initialQuantity
}
