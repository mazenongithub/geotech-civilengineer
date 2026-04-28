export function formatDate(date) {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);

    return d.toLocaleDateString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

export function milestoneformatdatestring(dateIn) {
    if (!dateIn) return "";

    const parts = dateIn.split('-');
    if (parts.length !== 3) return dateIn;

    const [year, month, day] = parts;
    return `${month}/${day}/${year}`;
}

export function netwgt_1(wetwgt_2, wetwgt, tarewgt, drywgt) {
    let netwgt_1 = 0
    if (Number(wetwgt_2) > 0) {
        netwgt_1 = (Number(wetwgt) - Number(tarewgt)) / (1 + moist(drywgt, tarewgt, wetwgt, wetwgt_2))

    }
    return netwgt_1;
}
export function netwgt(drywgt, tarewgt) {
    if (Number(drywgt) && Number(tarewgt) > 0) {
        return (Number(drywgt) - Number(tarewgt));
    } else {
        return 0;
    }
}

export function moist(drywgt, tarewgt, wetwgt, wetwgt_2) {
    let wgtwater = 0;
    let netweight = Number(drywgt) - Number(tarewgt)

    if (Number(wetwgt_2) > 0) {
        wgtwater = Number(wetwgt_2) - Number(drywgt)

    } else {
        wgtwater = Number(wetwgt) - Number(drywgt);

    }
    if ((wgtwater / netweight) > 0) {
        return (wgtwater / netweight)
    } else {
        return 0;
    }

}

export function calcdryden(wetwgt_2, wetwgt, tarewgt, drywgt, diameter, samplelength) {
    let netweight = 0;
    if (Number(wetwgt_2) > 0) {
        netweight = netwgt_1(wetwgt_2, wetwgt, tarewgt, drywgt)
    } else {
        netweight = netwgt(drywgt, tarewgt);
    }
    if (netweight > 0 && diameter > 0 && samplelength > 0) {
        return Math.round(Number((netweight / (.25 * Math.pow(Number(diameter), 2) * Math.PI * Number(samplelength))) * (1 / 453.592) * (144 * 12)))
    } else {
        return 0;
    }
}

export function formatDateReport(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}