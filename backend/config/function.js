export function humanize(str) {
    var i,
        frags = str.split("%20");
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].slice(0);
    }
    return frags.join(" ");
}