
const formatText = (text) => {
    if(text !== ""){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
}

export default formatText;

