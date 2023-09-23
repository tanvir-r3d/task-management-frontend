
export const generateSL = (current_page = 1, per_page = 1, idx) => {
    return ((((current_page - 1) * per_page) + idx + 1));
}