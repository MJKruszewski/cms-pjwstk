export function getPagination(req) {
    let { range } = req.query;
    range = Array.isArray(range) ? range.pop() : range;
    range = range.replace('[', '').replace(']', '').split(',');

    return {skip: Number.parseInt(range[0].trim()), limit: Number.parseInt(range[1].trim()) };
}