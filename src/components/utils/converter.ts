export default function converter(num: number): string {
    let str = ''+num;
    if(!/e/i.test(str)) {return str}
    return (num).toFixed(18).replace(/\.?0+$/, "")
}